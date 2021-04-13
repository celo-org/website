import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import {css} from "@emotion/react"
import { flex, flexRow, fonts, WHEN_DESKTOP, WHEN_MOBILE, WHEN_TABLET, WHEN_TABLET_AND_UP, whiteText } from "src/estyles"
import { GridRow } from "src/layout/Grid2"
import { TABLET_BREAKPOINT } from "src/shared/Styles"
import {CoverContentType} from 'src/utils/contentful'
import renderNode from 'src/contentful/nodes/paragraph'
import Button, { SIZE } from "src/shared/Button.3"
import { useScreenSize } from "src/layout/ScreenSize"


export default function Cover(props: CoverContentType) {
  const {isMobile} = useScreenSize()
  return <GridRow columns={2} darkMode={props.darkMode} css={props.illoFirst? imageFirstRootCss : rootCss}>
    <div css={contentCss}>
      <h1 css={css(titleCss, props.darkMode && whiteText)}>
        {props.title}
      </h1>
      <span css={props.darkMode && subtitleDarkMode}>{documentToReactComponents(props.subTitle, {renderNode})}</span>
      <div css={linkAreaCss}>
        {props.links?.map(link => <Button align={'center'} key={link.sys.id} size={isMobile? SIZE.fullWidth : SIZE.normal} kind={link.fields.kind} text={link.fields.words} href={link.fields.href} />)}
      </div>
    </div>
    <div css={illoCss}>
      <picture>
        <source media={`(max-width: ${TABLET_BREAKPOINT}px)`} srcSet={props.imageMobile?.fields.file.url}/>
        <img css={props.illoFirst? imageFirstCss: imageCss} src={props.imageDesktop?.fields.file.url} alt={props.imageDesktop.fields.description} />
      </picture>
    </div>
  </GridRow>
}

const rootCss = css({
  gridTemplateAreas: `"content illo"`,
  overflow: 'visible',
  [WHEN_MOBILE]: {
    alignContent: 'center',
    minHeight: '100vh',
    flexDirection: 'column-reverse'
  },
  [WHEN_TABLET]: {
    minHeight: '100vh',
    height: 'fit-content',
  },
  [WHEN_DESKTOP]: {
    height: '100vh',
    minHeight: 'fit-content',
    maxHeight: "80vw"
  }
})

const imageFirstRootCss = css(rootCss,{
  gridTemplateAreas: `"illo content"`,
})

const titleCss = css(fonts.h1, {
  [WHEN_DESKTOP]: {
    fontSize: 68,
    lineHeight: '68px'

  },
  [WHEN_MOBILE]: {
    textAlign: 'center',
    fontSize: 36,
    lineHeight: '38px'
  }
})

const subtitleDarkMode = css (whiteText, {
    p: whiteText
})

const contentCss = css(flex,{
  justifySelf: 'center',
  justifyContent: 'center',
  flex: 1,
  gridArea: 'content',
  [WHEN_TABLET_AND_UP]: {
    paddingTop: 56,
    paddingBottom: 48,
  },
  [WHEN_MOBILE]: {
    padding: 16
  }
})

const linkAreaCss = css(flexRow,{
  [WHEN_MOBILE]: {
    flexDirection: 'column',
    "& > div": {
      marginBottom: 24,
    }
  },
  [WHEN_TABLET_AND_UP]: {
    "& > div": {
      marginRight: 24,
      justifyContent: 'center'
    }
  }
})

const illoCss = css ({
  display: 'flex',
  gridArea: 'illo',
  position: 'relative',
  [WHEN_MOBILE]: {
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const imageCss = css({
  position: 'absolute',
  overflow: 'visible',
  [WHEN_MOBILE]: {
    position: 'static',
    overflow: 'inherit'
  },
  [WHEN_TABLET_AND_UP]: {
    bottom: "25%",
    transform: 'translateY(0px)'
  }
})

const imageFirstCss = css(imageCss,{
  right: 0
})
