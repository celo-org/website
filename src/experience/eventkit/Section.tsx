import * as React from "react"
import { View } from "react-native"
import { brandStyles } from "src/experience/common/constants"
import Markdown from "src/experience/Markdown"
import { standardStyles } from "src/styles"

interface Props {
  content: string
}

export default function Section({ content }: Props) {
  return (
    <View style={[brandStyles.gap, standardStyles.elementalMarginBottom]}>
      <Markdown source={content} />
    </View>
  )
}
