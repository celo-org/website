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
import Button, { SIZE } from "src/shared/Button.4"
import { useScreenSize } from "src/layout/ScreenSize"
import { BLOCKS } from "@contentful/rich-text-types"
import { RenderNode } from "@contentful/rich-text-react-renderer"
import { Asset } from "contentful"
import { colors } from "src/colors"

const OPTIONS = {
  renderNode: {
    ...renderers,
    [BLOCKS.HEADING_1]: (_, children: string) => {
      return <h2 css={rH1}>{children}</h2>
    },
  } as RenderNode,
}

export default function ReskinCover(props: CoverContentType) {
  const { isMobile } = useScreenSize()
  const resolution = props.resolution || 2

  const coverImages = props.imagesDesktop.map((image) => {
    return image.fields
  })

  const links = isMobile ? [props.links[0]] : props.links
  return (
    <GridRow
      columns={2}
      darkMode={props.darkMode}
      wrapperCss={wrapperCss}
      css={props.illoFirst ? imageFirstRootCss : rootCss}
    >
      <div css={contentCss}>
        <picture>
          <>
            <source
              media={`(min-width: ${TABLET_BREAKPOINT}px)`}
              srcSet={`${coverImages[2].file.url} 2x`}
            />
            <source
              media={`(max-width: ${TABLET_BREAKPOINT}px)`}
              srcSet={`${props.imageMobile?.fields.file.url} 2x`}
            />
          </>
          <img
            css={css(props.illoFirst ? imageFirstCss : imageCss)}
            src={trueWidth(props.imageMobile?.fields.file, resolution)}
            width={viewSize(coverImages[2].file.details?.image?.width, resolution)}
            height={viewSize(coverImages[2].file.details?.image?.height, resolution)}
            alt={coverImages[2].description}
          />
        </picture>
        <span css={css(subTextCss, props.darkMode && subtitleDarkMode)}>
          {documentToReactComponents(props.subTitle, OPTIONS)}
        </span>
        <div css={linkAreaCss}>
          {links.map((link, index) => (
            <Button
              align={"center"}
              key={link.sys.id}
              size={SIZE.normal}
              kind={link.fields.kind}
              text={link.fields.words}
              href={link.fields.href}
              cssStyle={index === 1 && css(newNakedButtonStyles)}
            />
          ))}
        </div>
      </div>
      <div css={css({ position: "relative" })}>
        {props.title && (
          <h1 css={css(props.superSize ? titleCss : rH1, props.darkMode && whiteText)}>
            {props.title}
          </h1>
        )}
        <img
          css={coverImage1}
          src={trueWidth(coverImages[0].file, resolution)}
          width={viewSize(coverImages[0].file.details?.image?.width, resolution)}
          height={viewSize(coverImages[0].file.details?.image?.height, resolution)}
          alt={coverImages[0].description}
        />
        <img
          css={coverImage2}
          src={trueWidth(coverImages[1].file, resolution)}
          width={viewSize(coverImages[1].file.details?.image?.width, resolution)}
          height={viewSize(coverImages[1].file.details?.image?.height, resolution)}
          alt={coverImages[1].description}
        />
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
    minHeight: 900,
    height: "fit-content",
  },
  [WHEN_DESKTOP]: {
    height: 900,
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
  [WHEN_TABLET_AND_UP]: {
    marginTop: "252px",
    marginLeft: "224px",
  },
  [WHEN_MOBILE]: {
    textAlign: "center",
    fontSize: 46,
    lineHeight: "38px",
    marginTop: 109,
    marginBottom: 20,
    paddingLeft: 32,
    maxWidth: 100,
  },
})

const subTextCss = css({
  marginTop: 16,
  zIndex: 1,
  a: {
    textDecoration: "none",
    color: colors.white,
  },
  "h2:nth-of-type(2)": {
    marginTop: 30,
  },
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
    minWidth: 320,
  },
  [WHEN_MOBILE]: {
    padding: 16,
    textAlign: "center",
    alignSelf: "center",
  },
})

const linkAreaCss = css(flexRow, {
  zIndex: 1,
  [WHEN_MOBILE]: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 32,
    "& > div": {
      marginBottom: 24,
    },
  },
  [WHEN_TABLET_AND_UP]: {
    paddingBottom: 181,
    "& > div": {
      marginRight: 24,
      justifyContent: "center",
    },
  },
})

const imageCss = css({
  overflow: "visible",
  [WHEN_MOBILE]: {
    maxWidth: "100%",
    height: "100%",
    overflow: "inherit",
  },
})

const imageFirstCss = css(imageCss, {
  right: 0,
})

const rH1 = css(fonts.h1, {
  [WHEN_MOBILE]: fonts.h1Mobile,
})

const coverImage1 = css({
  display: "block",
  position: "absolute",
  top: 329,
  right: 377,
  [WHEN_MOBILE]: {
    display: "none",
  },
})

const coverImage2 = css({
  display: "block",
  position: "absolute",
  top: 533,
  right: 0,
  [WHEN_TABLET]: {},
  [WHEN_MOBILE]: {
    display: "none",
  },
})

const newNakedButtonStyles = css({})
