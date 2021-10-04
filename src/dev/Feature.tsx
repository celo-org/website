import * as React from "react"
import FadeIn from "react-lazyload-fadein"
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native"
import { fonts, standardStyles, textStyles } from "src/styles"
interface Props {
  title: string
  text?: string
  graphic: StaticImageData
}

type func = () => void

const GRAPHIC_SIZE = 48

const FeatureComponent = React.memo(function Feature({ title, graphic, text }: Props) {
  return (
    <View style={[standardStyles.elementalMargin, styles.container]}>
      <FadeIn placeholder={<View style={styles.graphic} />}>
        {(load: func) => (
          <Image
            resizeMode="contain"
            onLoad={load}
            source={{ uri: graphic.src }}
            style={styles.graphic}
          />
        )}
      </FadeIn>
      <View style={styles.textArea}>
        <Text style={[fonts.h5, textStyles.invert, styles.title]}>{title}</Text>
        <Text style={[fonts.p, textStyles.readingOnDark]}>{text}</Text>
      </View>
    </View>
  )
})
export default FeatureComponent

const styles = StyleSheet.create({
  graphic: {
    height: GRAPHIC_SIZE,
    width: GRAPHIC_SIZE,
    marginBottom: 40,
    marginTop: 40,
  },
  title: {
    marginVertical: 10,
  },
  container: {
    marginRight: 20,
    flexDirection: "column",
    flex: 0,
  },
  textArea: { width: "100%", flex: 1 },
})
