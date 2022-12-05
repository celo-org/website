import { displayedImageSize } from "../contentful/nodes/displayRetinaImage"
import { useEffect, useState } from "react"
import { css } from "@emotion/react"
import { GalleryItem } from "../utils/contentful"
import { flexRow, jost, WHEN_DESKTOP, WHEN_MOBILE, WHEN_TABLET } from "../estyles"
import { colors } from "../colors"

type Item = GalleryItem

interface Props {
  fields: any
}

const generateRandomNumber = (maxNum) => {
  return Math.floor(Math.random() * maxNum)
}
export default function AnimatedCubes(props: Props) {
  const { fields } = props
  const [randomIndex, setRandomIndex] = useState(generateRandomNumber(fields.items.length - 1))

  fields.items = fields.items.slice(0, 8)
  useEffect(() => {
    const interval = setInterval(() => {
      let randomNumber = randomIndex
      while (randomNumber === randomIndex) {
        randomNumber = generateRandomNumber(fields.items.length)
      }
      setRandomIndex(randomNumber)
    }, 3000)

    return () => clearInterval(interval)
  }, [setRandomIndex, randomIndex, fields.items.length])
  return (
    <div css={containerCss}>
      {fields.items.map((entry, index) => {
        const item = entry.fields as Item
        const imageFields = item?.image?.fields
        const imageSideFields = item?.imageSide?.fields
        const size = displayedImageSize(item.image, fields.retina)
        const sizeSide = displayedImageSize(item?.imageSide, fields.retina)
        let angle = "0deg"
        let translate = "-1900px"

        if (index === randomIndex) {
          angle = angle === "0deg" ? "-90deg" : "0deg"
        }
        translate = "0"

        const rendered = (
          <div key={entry.sys.id} css={logoContainer}>
            <div css={css(box, { transform: `translateX(${translate}) rotateY(${angle})` })}>
              <div css={css(face, front)}>
                <img
                  css={logoCss}
                  alt={imageFields?.description}
                  src={imageFields?.file?.url}
                  width={size.width}
                  height={size.height}
                />
                {item.title ? <p css={logoTitle}>{item.title}</p> : null}
              </div>
              <div css={css(face, side)}>
                {imageSideFields ? (
                  <img
                    css={logoCss}
                    alt={imageSideFields?.description}
                    src={imageSideFields?.file?.url}
                    width={sizeSide.width}
                    height={sizeSide.height}
                  />
                ) : (
                  <img
                    css={logoCss}
                    alt={imageFields?.description}
                    src={imageFields?.file?.url}
                    width={size.width}
                    height={size.height}
                  />
                )}
              </div>
            </div>
          </div>
        )

        if (item.url) {
          return (
            <a href={item.url} rel="noreferrer">
              {rendered}
            </a>
          )
        }
        return rendered
      })}
    </div>
  )
}

const containerCss = css(flexRow, {
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
})
const logoContainer = css({
  perspective: 700,
  alignItems: "center",
  justifyContent: "center",
})

const box = css({
  width: 136,
  height: 136,
  transformOrigin: "68px 68px -68px",
  position: "relative",
  transition: "all 0.4s ease-out",
  transformStyle: "preserve-3d",
  [WHEN_DESKTOP]: {
    width: 300,
    height: 300,
    transformOrigin: "150px 150px -150px",
  },
})

const face = css(flexRow, {
  padding: 12,
  border: `1px solid ${colors.black}`,
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  width: "100%",
  height: "100%",
  [WHEN_DESKTOP]: {
    padding: 0,
  },
})

const front = css({
  backgroundColor: colors.baseTan,
})

const side = css({
  left: 68,
  transform: "rotateY(90deg) translateX(68px)",
  zIndex: 1,
  backgroundColor: colors.baseTan,
  [WHEN_DESKTOP]: {
    left: 150,
    transform: "rotateY(90deg) translateX(150px)",
  },
})

const logoTitle = css(jost, {
  fontSize: 16,
  fontWeight: 500,
  marginRight: 24,
})

const logoCss = css({
  [WHEN_TABLET]: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
  [WHEN_MOBILE]: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
})
