import * as React from "react"
import { ImageBackground, StyleSheet } from "react-native"
import { standardStyles } from "src/styles"
import { colors } from "src/colors"
import * as eStyles from "src/estyles"
import { css } from "@emotion/react"

interface Props {
  imgSource: StaticImageData
  quote: React.ReactNode
  citation: React.ReactNode
  color?: colors
}

export default React.memo(function BeautifulQuote(props: Props) {
  return (
    <ImageBackground
      source={{ uri: props.imgSource.src }}
      style={[styles.image, standardStyles.centered]}
      resizeMode={"cover"}
    >
      <blockquote css={css(quoteCss, props.color && { color: props.color })}>
        “{props.quote}”
      </blockquote>
      <figcaption css={css(citeCss, props.color && { color: props.color })}>
        {props.citation}
      </figcaption>
    </ImageBackground>
  )
})

const quoteCss = css(eStyles.fonts.h1, eStyles.textStyles.center, {
  fontSize: 65,
  lineHeight: "72px",
  fontStyle: "italic",
  maxWidth: 1200,
  [eStyles.WHEN_MOBILE]: {
    fontSize: 42,
    lineHeight: "50px",
    fontStyle: "italic",
  },
})

const citeCss = css(eStyles.fonts.h1, eStyles.textStyles.center, {
  marginTop: 40,
  fontSize: 36,
  [eStyles.WHEN_MOBILE]: eStyles.fonts.h1Mobile,
})

const styles = StyleSheet.create({
  image: { width: "100%", minHeight: 510, paddingVertical: 15, paddingHorizontal: 30 },
})
