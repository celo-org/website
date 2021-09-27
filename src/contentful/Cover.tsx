import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { css } from "@emotion/react"
import {
  flex,
  flexRow,
  fonts,
  WHEN_DESKTOP,
  WHEN_MOBILE,
  WHEN_TABLET,
  WHEN_TABLET_AND_UP,
  whiteText,
} from "src/estyles"
import { GridRow } from "src/layout/Grid2"
import { TABLET_BREAKPOINT } from "src/shared/Styles"
import { CoverContentType } from "src/utils/contentful"
import renderers from "src/contentful/nodes/enodes"
import Button, { SIZE } from "src/shared/Button.3"
import { useScreenSize } from "src/layout/ScreenSize"
import { BLOCKS } from "@contentful/rich-text-types"
import { RenderNode } from "@contentful/rich-text-react-renderer"
import { Asset } from "contentful"
import { colors } from "src/styles"

const OPTIONS = {
  renderNode: {
    ...renderers,
    [BLOCKS.HEADING_1]: (_, children: string) => {
      return <h2 css={rH1}>{children}</h2>
    },
  } as RenderNode,
}

export default function Cover(props: CoverContentType) {
  console.log(props.subTitle, "<---- this is the subTitle")
  const { isMobile } = useScreenSize()
  const resolution = props.resolution || 2

  const size = isMobile
    ? props.imageMobile?.fields?.file?.details.image
    : props.imageDesktop?.fields?.file?.details.image

  return (
    <GridRow
      columns={2}
      darkMode={props.darkMode}
      wrapperCss={wrapperCss}
      css={props.illoFirst ? imageFirstRootCss : rootCss}
    >
      <div css={contentCss}>
        {props.title &&(
        <h1
          css={css(props.superSize ? titleCss : rH1, centerMobileCss, props.darkMode && whiteText)}
        >
          {props.title}
        </h1>
        )
        }
        <span css={css(subTextCss, props.darkMode ? subtitleDarkMode : centerMobileCss)}>
          {documentToReactComponents(props.subTitle, OPTIONS)}
        </span>
        <div css={linkAreaCss}>
          {props.links?.map((link) => (
            <Button
              align={"center"}
              key={link.sys.id}
              size={isMobile ? SIZE.fullWidth : SIZE.normal}
              kind={link.fields.kind}
              text={link.fields.words}
              href={link.fields.href}
            />
          ))}
        </div>
      </div>
      <div
        css={
          props.imageFit === "contain"
            ? css(illoContain, {
                [WHEN_TABLET]: {
                  paddingTop: `${((size?.height || 1) / (size?.width || 1)) * 100}%`,
                },
              })
            : illoCss
        }
      >
        <picture>
          {resolution === 2 && (
            <>
              <source
                media={`(min-width: ${TABLET_BREAKPOINT}px)`}
                srcSet={`${props.imageDesktop?.fields.file.url} 2x`}
              />
              <source
                media={`(max-width: ${TABLET_BREAKPOINT}px)`}
                srcSet={`${props.imageMobile?.fields.file.url} 2x`}
              />
            </>
          )}
          <source
            media={`(min-width: ${TABLET_BREAKPOINT}px)`}
            srcSet={trueWidth(props.imageDesktop?.fields.file, resolution)}
          />
          <img
            width={viewSize(size?.width, resolution)}
            height={viewSize(size?.height, resolution)}
            css={css(
              props.illoFirst ? imageFirstCss : imageCss,
              props.verticalPosition === "flushBottomText" && flushBottomCss,
              props.imageFit === "contain" && imageContain
            )}
            src={trueWidth(props.imageMobile?.fields.file, resolution)}
            alt={props.imageDesktop?.fields.description}
          />
        </picture>
      </div>
    </GridRow>
  )
}

function viewSize(number: number, res: number) {
  return Math.round(number / res)
}

function trueWidth(file: Asset["fields"]["file"], res: number) {
  if (res === 1) {
    return file?.url
  } else {
    return `${file?.url}?w=${viewSize(file?.details?.image?.width, res)}`
  }
}

const wrapperCss = css(flex, {
  alignItems: "center",
  justifyContent: "center",
  [WHEN_MOBILE]: {
    alignContent: "center",
    minHeight: "100vh",
  },
  [WHEN_TABLET]: {
    minHeight: "100vh",
    height: "fit-content",
  },
  [WHEN_DESKTOP]: {
    height: "100vh",
    minHeight: "fit-content",
    maxHeight: "80vw",
  },
})

const rootCss = css({
  gridTemplateAreas: `"content illo"`,
  overflow: "visible",
  [WHEN_MOBILE]: {
    alignContent: "center",
    flexDirection: "column-reverse",
  },
})

const imageFirstRootCss = css(rootCss, {
  gridTemplateAreas: `"illo content"`,
})

const titleCss = css(fonts.h1, {
  [WHEN_DESKTOP]: {
    fontSize: 68,
    lineHeight: "68px",
  },
  [WHEN_MOBILE]: {
    textAlign: "center",
    fontSize: 36,
    lineHeight: "38px",
  },
})

const subTextCss = css({
  marginTop: 16,
  "a":{
    textDecoration: "none",
    color: colors.white
  }
})

const centerMobileCss = css({
  [WHEN_MOBILE]: {
    textAlign: "center",
  },
})

const subtitleDarkMode = css(whiteText, centerMobileCss, {
  "h1, h2, h3, h4, p": whiteText,
})

const contentCss = css(flex, {
  justifySelf: "center",
  justifyContent: "center",
  flex: 1,
  gridArea: "content",
  [WHEN_TABLET_AND_UP]: {
    paddingTop: 56,
    paddingBottom: 48,
    minWidth: 320,
  },
  [WHEN_MOBILE]: {
    padding: 16,
    maxWidth: 450,
    alignSelf: "center",
  },
})

const linkAreaCss = css(flexRow, {
  [WHEN_MOBILE]: {
    flexDirection: "column",
    "& > div": {
      marginBottom: 24,
    },
  },
  [WHEN_TABLET_AND_UP]: {
    "& > div": {
      marginRight: 24,
      justifyContent: "center",
    },
  },
})

const illoCss = css({
  display: "flex",
  gridArea: "illo",
  position: "relative",
  [WHEN_MOBILE]: {
    marginTop: 56,
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
  },
})

const illoContain = css(illoCss, {
  [WHEN_TABLET]: {
    height: 0,
    overflow: "hidden",
  },
})

const imageCss = css({
  overflow: "visible",
  [WHEN_MOBILE]: {
    overflow: "inherit",
  },
})

const imageContain = css({
  [WHEN_TABLET]: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
})

const flushBottomCss = css({
  [WHEN_TABLET_AND_UP]: {
    bottom: 0,
    position: "absolute",
  },
})

const imageFirstCss = css(imageCss, {
  right: 0,
})

const rH1 = css(fonts.h1, {
  [WHEN_MOBILE]: fonts.h1Mobile,
})
