import * as React from "react"
import { useTranslation } from "react-i18next"
import { Image, StyleSheet, Text, View } from "react-native"
import Button, { BTN, SIZE } from "src/shared/Button.3"
import { fonts, standardStyles } from "src/styles"

export interface Props {
  imgSource: string
  href: string
  title: string
  text: string
  onLoad?: () => void
}


export default function Card({ imgSource, href, title, text, onLoad }: Props) {
  const {t} = useTranslation("common")
  return (
    <View style={styles.structure}>
      <Image
        source={{ uri: imgSource }}
        style={styles.image}
        resizeMode={"cover"}
        onLoad={onLoad}
      />
      <View style={styles.inside}>
        <View style={styles.stayTop}>
          <Text style={[fonts.h6, standardStyles.elementalMarginBottom, styles.title]}>
            {title}
          </Text>
          <Text style={fonts.p}>{text}</Text>
        </View>
        <View style={standardStyles.elementalMargin}>
          <Button
            text={t("readArticle")}
            kind={BTN.NAKED}
            size={SIZE.normal}
            href={href}
            target={"_medium"}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  structure: {
    width: "100%",
    flex: 1,
  },
  stayTop: {
    justifyContent: "flex-start",
  },
  inside: {
    paddingTop: 15,
    paddingHorizontal: 0,
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    minHeight: 40,
  },
  image: {
    width: "100%",
    height: 222,
  },
})

