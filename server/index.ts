import bodyParser from "body-parser"
import compression from "compression"
import slashes from "connect-slashes"
import express from "express"
import expressEnforcesSsl from "express-enforces-ssl"
import helmet from "helmet"
import next from "next"
import path from "path"
import addToCRM, { ListID } from "./addToCRM"
import latestAnnouncements from "./Announcement"
import rateLimit from "./rateLimit"
import respondError from "./respondError"

const NO_CONTENT = 204
const MOVED_PERMANENTLY = 301

const port = parseInt(process.env.PORT, 10) || 3000

const dev = process.env.NEXT_DEV === "true"
const app = next({ dev })
const handle = app.getRequestHandler()

// Strip the leading "www." prefix from the domain
function wwwRedirect(req: express.Request, res: express.Response, nextAction: () => unknown) {
  if (req.headers.host.startsWith("www.")) {
    const newHost = req.headers.host.slice(4)
    return res.redirect(MOVED_PERMANENTLY, req.protocol + "://" + newHost + req.originalUrl)
  }
  nextAction()
}

;(async () => {
  await app.prepare()
  const server = express()
  server.use(
    helmet({
      contentSecurityPolicy: false,
    })
  )
  server.use(wwwRedirect)
  server.enable("trust proxy")
  server.use(compression())
  server.use(slashes(false))

  if (!dev) {
    server.use(expressEnforcesSsl())
  }
  // page redirects
  ;["/careers", "/join"].forEach((route) => {
    server.get(route, (_, res) => {
      res.redirect("/jobs")
    })
  })
  ;["/about-us", "/faq"].forEach((route) => {
    server.get(route, (_, res) => {
      res.redirect("/about")
    })
  })
  ;["/arg_tos", "/arg_privacy", "/argentina"].forEach((route) => {
    server.get(route, (_, res) => {
      res.redirect("/terms")
    })
  })
  ;["/technology", "/dev", "/devs", "/develop", "/developer", "/build"].forEach((route) => {
    server.get(route, (_, res) => {
      res.redirect("/developers")
    })
  })
  ;["/build/validators"].forEach((route) => {
    server.get(route, (_, res) => {
      res.redirect("/validators/explore")
    })
  })
  ;["/test-wallet", "build/download"].forEach((route) => {
    server.get(route, (_, res) => {
      res.redirect("/developers/wallet")
    })
  })

  server.get("/build/*", (req, res) => {
    res.redirect(`/developers/${req.params[0]}`)
  })
  ;["/apps", "/applications"].forEach((route) => {
    server.get(route, (_, res) => {
      // Note this is from contentful
      res.redirect("/dapps")
    })
  })

  server.get("/papers/stability", (_, res) => {
    res.redirect("/papers/Celo_Stability_Analysis.pdf")
  })

  server.get("/papers/cbdc-velocity", (_, res) => {
    res.redirect("/papers/cLabs_CBDC_Velocity_v3.pdf")
  })

  server.get("/papers/cbdc-velocity/spanish", (_, res) => {
    res.redirect("/papers/cLabs_CBDC_Velocity_Spanish.pdf")
  })

  server.get("/papers/future-proof-aid", (_, res) => {
    res.redirect("https://drive.google.com/file/d/1Sf_jqhE8buy0qtIQiUI9IcfB4IiHGuBG/view")
  })

  server.get("/papers/future-proof-exec", (_, res) => {
    res.redirect("https://drive.google.com/file/d/195h3oyR2LRwKOSIg_H2uwIHE1YVn9W0Z/view")
  })

  server.get("/papers/future-of-digital-currencies", (_, res) => {
    res.redirect("/papers/shaping-future-of-digital-currencies.pdf")
  })

  server.get("/papers/covid-aid", (_, res) => {
    res.download("public/papers/humanitarian-COVID-aid-on-celo.pdf")
  })

  server.get("/papers/whitepaper", (_, res) => {
    res.redirect(
      "/papers/Celo__A_Multi_Asset_Cryptographic_Protocol_for_Decentralized_Social_Payments.pdf"
    )
  })

  server.get("/papers/plumo", (_, res) => {
    res.redirect("https://eprint.iacr.org/2021/1361.pdf")
  })

  server.get("/papers/whitepaper/chinese", (_, res) => {
    res.redirect("/papers/celo-wp-simplified-chinese.pdf")
  })

  server.get("/papers/annual-reports/2020", (_, res) => {
    res.redirect("/papers/celo-foundation-2020-report.pdf")
  })

  server.get("/papers/annual-reports/2021", (_, res) => {
    res.redirect("/papers/Celo_Foundation_Annual_Report_2021.pdf")
  })
  ;["/brand", "/grants"].forEach((slug) => {
    server.get(slug, (_, res) => {
      res.redirect(`/experience${slug}`)
    })
  })

  server.get("/papers/voluntary-carbon-credits", (_, res) => {
    res.redirect(
      "/papers/Scaling_Voluntary_Carbon_Markets_Through_Open_Blockchain_Platforms_Whitepaper.pdf"
    )
  })

  server.get("/connect", (_, res) => {
    res.redirect("/community")
  })

  server.get("/code-of-conduct", (_, res) => {
    res.redirect("https://github.com/celo-org/website/blob/master/src/content/code-of-conduct.md")
  })

  server.get("/tos", (_, res) => {
    res.redirect("/user-agreement")
  })

  server.get("/celo-rewards-education", (_, res) => {
    res.redirect("https://valoraapp.com/supercharge-terms-and-conditions")
  })

  server.get("/celo-rewards", (_, res) => {
    res.redirect("https://valoraapp.com/supercharge-terms-and-conditions")
  })

  server.get("/save-terms-and-conditions", (_, res) => {
    res.redirect("https://valoraapp.com/supercharge-terms-and-conditions")
  })

  server.get("/stake-off", (_, res) => {
    res.redirect("https://forum.celo.org/t/the-great-celo-stake-off-the-details/136")
  })

  server.get("/celo-connect2022", (_, res) => {
    res.redirect("https://celoconnect.com/")
  })

  server.get("/papers/africa-pilot-2022-report-1", (_, res) => {
    res.redirect(
      "https://www.mercycorps.org/research-resources/potential-cryptocurrency-kenya-youth"
    )
  })

  server.get("/papers/africa-pilot-2022-report-2", (_, res) => {
    res.redirect("PAH_Pilot_Preliminary_Report.pdf")
  })

  // File serving for OpenPGP WKD https://gnupg.org/blog/20161027-hosting-a-web-key-directory.html
  // Content must be served on multiple paths, and cannot use a redirect.
  ;["/.well-known/openpgpkey/hu/:userId", "/.well-known/openpgpkey/:host/hu/:userId"].forEach(
    (route) => {
      server.get(route, (req, res) => {
        const host = req.params.host ?? req.hostname
        if (!req.hostname.includes(host)) {
          res.sendStatus(400)
          return
        }
        const userId = req.params.userId ?? ""
        if (!/\w+/.test(userId)) {
          res.sendStatus(400)
          return
        }
        res.sendFile(
          path.join(host, "hu", userId),
          { root: path.join(process.cwd(), "openpgpkey") },
          (err) => {
            if (err) {
              res.sendStatus(404)
            }
          }
        )
      })
    }
  )
  ;["/.well-known/openpgpkey/policy", "/.well-known/openpgpkey/:host/policy"].forEach((route) => {
    server.get(route, (req, res) => {
      const host = req.params.host ?? req.hostname
      if (!req.hostname.includes(host)) {
        res.sendStatus(400)
        return
      }
      res.sendFile(
        path.join(host, "policy"),
        { root: path.join(process.cwd(), "openpgpkey") },
        (err) => {
          if (err) {
            res.sendStatus(404)
          }
        }
      )
    })
  })

  server.use(bodyParser.json())

  server.post("/contacts", rateLimit, async (req, res) => {
    try {
      if (!req.body.mielpoto) {
        await addToCRM(req.body, ListID.Newsletter)
        res.status(NO_CONTENT).send("ok")
      } else {
        console.info("possible bot", req.body)
        res.status(NO_CONTENT).send("ok")
      }
    } catch (e) {
      respondError(res, e)
    }
  })

  server.post("/celo-connect2022", rateLimit, async (req, res) => {
    try {
      if (!req.body.mielpoto) {
        await addToCRM(req.body, ListID.CeloConnect)
        res.status(NO_CONTENT).send("ok")
      } else {
        console.info("possible bot", req.body)
        res.status(NO_CONTENT).send("ok")
      }
    } catch (e) {
      respondError(res, e)
    }
  })

  server.get("/announcement", async (req, res) => {
    try {
      const annoucements = await latestAnnouncements(req.header["X-Appengine-Country"])
      res.json(annoucements)
    } catch (e) {
      respondError(res, e)
    }
  })
  server.use((req, res) => handle(req, res))

  await server.listen(port)

  // tslint:disable-next-line
  console.log(`> Ready on http://localhost:${port}`)
})()
