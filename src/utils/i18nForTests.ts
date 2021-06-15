import { NameSpaces } from "src/i18n"
import i18next from "i18next"

i18next.init({
  load: "all",
  fallbackLng: "en",
  resources: {
    en: {
      [NameSpaces.about]: require("public/locales/en/about.json"),
      [NameSpaces.alliance]: require("public/locales/en/alliance.json"),
      [NameSpaces.audits]: require("public/locales/en/audits.json"),
      [NameSpaces.brand]: require("public/locales/en/brand.json"),
      [NameSpaces.celoRewards]: require("public/locales/en/celoRewards.json"),
      [NameSpaces.community]: require("public/locales/en/community.json"),
      [NameSpaces.common]: require("public/locales/en/common.json"),
      [NameSpaces.cbe]: require("public/locales/en/cbe.json"),
      [NameSpaces.dev]: require("public/locales/en/dev.json"),
      [NameSpaces.download]: require("public/locales/en/download.json"),
      [NameSpaces.faucet]: require("public/locales/en/faucet.json"),
      [NameSpaces.home]: require("public/locales/en/home.json"),
      [NameSpaces.jobs]: require("public/locales/en/jobs.json"),
      [NameSpaces.papers]: require("public/locales/en/papers.json"),
      [NameSpaces.press]: require("public/locales/en/press.json"),
      [NameSpaces.terms]: require("public/locales/en/terms.json"),
    },
  },
  // have a common namespace used around the full app
  ns: Object.keys(NameSpaces),
  defaultNS: NameSpaces.common,
  debug: false,
})

i18next.languages = ["en"]

export default i18next
