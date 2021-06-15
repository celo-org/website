import * as React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { useScreenSize } from 'src/layout/ScreenSize'
import Button, { BTN } from 'src/shared/Button.3'
import { fonts, standardStyles, textStyles } from 'src/styles'

export interface LinkType {
  name: string
  link: string
  icon?: React.ReactNode
}

interface Props {
  heading: string
  links: LinkType[]
  style?: ViewStyle | ViewStyle[]
  darkMode?: boolean
}

export default React.memo(function FooterColumn({ heading, links, style ,darkMode}: Props) {
  const { isMobile } = useScreenSize()
  return (
    <View style={[isMobile ? styles.rootMobile : styles.root, style]}>
      <Text style={[fonts.h6, standardStyles.elementalMarginBottom, textStyles.invert]}>{heading}</Text>
      {links.map(({ name, link, icon }) => (
        <View style={styles.linkContainer} key={link}>
          <Button
            target="_blank"
            iconLeft={icon}
            kind={BTN.INLINE}
            text={name}
            href={link}
            style={[styles.link, fonts.legal, darkMode && textStyles.invert]}
          />
        </View>
      ))}
    </View>
  )
})

const styles = StyleSheet.create({
  rootMobile: {
    marginTop: 35,
    width: "50%",
    paddingHorizontal: 10,
  },
  root: {
    paddingHorizontal: 25,
  },
  link: {
    textDecorationLine: "none",
    display: "inline-flex",
    alignItems: "center",
  },
  linkContainer: {
    marginVertical: 8,
  },
})
