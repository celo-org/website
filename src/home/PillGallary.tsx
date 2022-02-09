import { css, CSSObject, keyframes } from "@emotion/react"
import { Entry } from "contentful"
import { colors } from "src/colors"
import { Heading } from "src/contentful/grid2-cells/Heading"
import {
  flex,
  flexRow,
  jost,
  WHEN_DESKTOP,
  WHEN_MOBILE,
  WHEN_TABLET,
  WHEN_TABLET_AND_UP,
} from "src/estyles"
import { GalleryItem, HeadingContentType } from "src/utils/contentful"
import BackgroundImage from "src/home/eco-background.svg"
import BackgroundImageMobile from "src/home/mobile-bubbles.svg"
import { useScreenSize } from "src/layout/ScreenSize"

interface Props {
  list: Entry<GalleryItem | HeadingContentType>[]
  cssStyle?: CSSObject
  formation: "TwoFourTwoRepeat" | "ThreeByFour"
}

export default function PillGallery(props: Props) {
  const { isMobile } = useScreenSize()

  if (props.formation === "TwoFourTwoRepeat") {
    if (isMobile) {
      const heading = props.list.find((item) => item.sys.contentType.sys.id === "heading")
      const logos = props.list.filter((item) => item.sys.contentType.sys.id === "logoGalleryItem")
      const halfPoint = logos.length / 2
      return (
        <div css={rootCss}>
          <div css={css(center2Css, { marginBottom: 36 })}>
            {logos.slice(0, halfPoint).map(renderLogo)}
          </div>
          <div css={headingAreaCss}>{renderLogo(heading)}</div>
          <div css={css(center2Css, { marginBottom: 36 })}>
            {logos.slice(halfPoint, logos.length - 1).map(renderLogo)}
          </div>
        </div>
      )
    }
    return (
      <div css={rootCss}>
        <div css={css(center2Css, { marginBottom: 36 })}>
          {props.list.slice(0, 2).map(renderLogo)}
        </div>
        <div css={css(aroundSpace, { marginBottom: 18 })}>
          <div css={center2Css}>{props.list.slice(2, 4).map(renderLogo)}</div>
          <div css={center2Css}>{props.list.slice(4, 6).map(renderLogo)}</div>
        </div>
        <div css={css(evenlySpace, { marginBottom: 24 })}>
          {props.list.slice(6, 9).map(renderLogo)}
        </div>
        <div css={css(evenlySpace, { marginBottom: 24 })}>
          <div css={center2Css}>{props.list.slice(9, 11).map(renderLogo)}</div>
          <div css={center2Css}>{props.list.slice(11, 13).map(renderLogo)}</div>
        </div>
        <div css={css(center2Css, { marginBottom: 36 })}>
          {props.list.slice(13, 16).map(renderLogo)}
        </div>
      </div>
    )
  }

  if (props.formation === "ThreeByFour") {
    if (isMobile) {
      return (
        <div css={trippleRootCss}>
          <div css={triple}>{props.list.map(renderLogo)}</div>
        </div>
      )
    }
    return (
      <div css={trippleRootCss}>
        <div css={triple}>{props.list.slice(0, 3).map(renderLogo)}</div>
        <div css={shiftLeft}>{props.list.slice(3, 6).map(renderLogo)}</div>
        <div css={shiftRight}>{props.list.slice(6, 9).map(renderLogo)}</div>
        {props.list.length > 9 && (
          <div css={shiftLeft}>{props.list.slice(9, 12).map(renderLogo)}</div>
        )}
      </div>
    )
  }

  return null
}

function renderLogo(item: Entry<GalleryItem | HeadingContentType>) {
  switch (item.sys.contentType.sys.id) {
    case "heading":
      const heading = item.fields as HeadingContentType
      return (
        <Heading
          key={item.sys.id}
          image={heading.image}
          title={heading.title}
          subTitle={heading.subTitle}
          cssStyle={heading.cssStyle}
          darkMode={true}
        />
      )
    case "logoGalleryItem":
      const logo = item.fields as GalleryItem
      return <Pill logo={logo} key={item.sys.id} />
    default:
      return null
  }
}

const rootCss = css(flex, {
  alignContent: "center",
  alignItems: "center",
  flex: 1,
  backgroundColor: colors.dark,
  backgroundImage: `url(${BackgroundImage.src})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "contain",
  paddingTop: 56,
  paddingBottom: 56,
  [WHEN_TABLET]: {
    backgroundSize: "cover",
  },
  [WHEN_MOBILE]: {
    backgroundImage: `url(${BackgroundImageMobile.src})`,
  },
})

const pillRowCommon = css(flexRow, {
  maxWidth: 1000,
  width: "100%",
  alignItems: "center",
  [WHEN_MOBILE]: {
    flexWrap: "wrap",
  },
})

const headingAreaCss = css({
  marginBottom: 36,
})

const center2Css = css(pillRowCommon, {
  justifyContent: "center",
})

const aroundSpace = css(pillRowCommon, {
  justifyContent: "space-around",
})

const evenlySpace = css(pillRowCommon, {
  justifyContent: "space-evenly",
})

const triple = css(evenlySpace, {
  width: "100%",
  [WHEN_TABLET_AND_UP]: {
    padding: "20px 40px",
    maxWidth: 820,
  },
})

const shiftLeft = css(triple, {
  [WHEN_DESKTOP]: {
    transform: "translateX(-10%)",
  },
  [WHEN_TABLET]: {
    transform: "translateX(-5%)",
  },
})

const shiftRight = css(triple, {
  [WHEN_DESKTOP]: {
    transform: "translateX(10%)",
  },
  [WHEN_TABLET]: {
    transform: "translateX(5%)",
  },
})

const trippleRootCss = css(rootCss, {
  alignContent: "center",
  alignItems: "center",
})

function Pill({ logo }: { logo: GalleryItem }) {
  const image = logo.image.fields
  const isSVG = image.file.contentType === "image/svg+xml"
  const width = isSVG ? image.file.details.image.width : image.file.details.image.width / 2
  const height = isSVG ? image.file.details.image.height : image.file.details.image.height / 2
  return (
    <a
      title={logo.image.fields.description}
      css={pillCss}
      key={logo.image.sys.id}
      href={logo.url}
      target={"_blank"}
      rel="nofollow noopener"
    >
      <picture>
        <source srcSet={`${image.file.url} 2x`} />
        <img
          loading="lazy"
          width={width}
          height={height}
          alt={image.description}
          src={isSVG ? image.file.url : `${image.file.url}?w=${width}`}
        />
      </picture>
      {logo.title && (
        <span css={css(labelCss, getColor(logo.title))}>
          <span css={textCss}>{logo.title}</span>
        </span>
      )}
    </a>
  )
}

function getColor(word: string): { backgroundColor: string; color: string } {
  const cleaned = word?.toLowerCase().replace(" ", "-")
  switch (cleaned) {
    case "defi":
    case "crowd-funding":
      return Rainbow.blue
    case "telco":
      return Rainbow.violet
    case "custody":
    case "infra":
      return Rainbow.red
    case "bridge":
      return Rainbow.orange
    case "exchange":
      return Rainbow.yellow
    case "ubi":
    case "eco":
      return Rainbow.green
    default:
      return colorHash(cleaned)
  }
}

const X = 0
const Y = 0
const BLUR = 12
const SHADOW = "rgba(26, 232, 255, 0.85)"

function shadowCss({ x, y, blur, shadow }) {
  return css({
    filter: `drop-shadow(${x}px ${y}px ${blur}px ${SHADOW}) drop-shadow(0px 0px ${
      blur / 2
    }px ${shadow})`,
    boxShadow: `0px 0px 4px 1px rgba(26, 232, 255, 0.6)`,
    transitionProperty: "filter transform",
    transitionDuration: "0.85s",
    willChange: "transform",
    "&:hover": {
      transform: "translateY(-2px)",
      filter: `drop-shadow(${x}px ${y + 2}px ${blur * 0.85}px ${shadow}) drop-shadow(0px 2px ${
        blur / 2
      }px ${shadow})`,
    },
  })
}

// If not explicit find a color wit charCode
function colorHash(str: string) {
  const index = str.charCodeAt(1) % 5
  return Hues[index]
}

const Rainbow = {
  red: { backgroundColor: "rgba(251, 124, 109, 1)", color: "#6D0D01" },
  orange: { backgroundColor: "rgba(255, 183, 101, 1)", color: "#A74600" },
  yellow: { backgroundColor: "rgba(251, 204, 92, 1)", color: "#856002" },
  green: { backgroundColor: "rgba(53, 208, 127, 1)", color: "#007035" },
  blue: { backgroundColor: "rgba(115, 221, 255, 1)", color: "#006384" },
  violet: { backgroundColor: "rgba(191, 151, 255, 1)", color: "#2C0072" },
}
const Hues = [
  Rainbow.red,
  Rainbow.orange,
  Rainbow.yellow,
  Rainbow.green,
  Rainbow.blue,
  Rainbow.violet,
]

const focusFrames = keyframes`

  0% {
    opacity: 0.5;
    filter: blur(12px) drop-shadow(${X}px ${Y}px ${BLUR}px ${SHADOW}) drop-shadow(0px 0px ${
  BLUR / 2
}px ${SHADOW});
  }

  100% {
    opacity: 1;
    filter: blur(0px) drop-shadow(${X}px ${Y}px ${BLUR}px ${SHADOW}) drop-shadow(0px 0px ${
  BLUR / 2
}px ${SHADOW});
  }
`

const pillCss = css(flexRow, shadowCss({ x: X, y: Y, blur: BLUR, shadow: SHADOW }), {
  animation: focusFrames,
  animationDuration: "1.5s",
  animationPlayState: "running",
  animationFillMode: "backwards",
  animationIterationCount: 1,
  animationDelay: "1s",
  margin: "8px 12px",
  padding: "4px 16px",
  minHeight: 64,
  width: "fit-content",
  minWidth: 80,
  backgroundColor: colors.white,
  borderRadius: 50,
  alignItems: "center",
  justifyContent: "space-evenly",
  textDecoration: "none",
  [WHEN_MOBILE]: {
    filter: `drop-shadow(${X}px ${Y}px ${BLUR * 0.67}px ${SHADOW}) drop-shadow(0px 0px ${
      BLUR * 0.33
    }px ${SHADOW})`,
    boxShadow: `0px 0px 2px 1px rgba(26, 232, 255, 0.5)`,
    minHeight: 56,
    margin: "12px 8px",
  },
  "&:visited": {
    textDecoration: "none",
    color: "inherit",
  },
  img: {
    maxHeight: "calc(100% - 4px)",
    objectFit: "contain",
    [WHEN_MOBILE]: {
      height: 48,
    },
  },
})

const labelCss = css({
  marginLeft: 10,
  padding: "3px 8px",
  borderRadius: 24,
})

const textCss = css(jost, {
  display: "inline-block",
  fontSize: 12,
  fontWeight: 500,
})
