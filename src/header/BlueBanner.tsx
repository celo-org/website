import * as React from 'react'
import { useAsync } from 'react-async-hook'
import { StyleSheet, Text, View } from 'react-native'
import Chevron from 'src/icons/chevron'
import { useScreenSize } from 'src/layout/ScreenSize'
import { colors, fonts, textStyles } from 'src/styles'
interface Props {
  link: string
  children: React.ReactNode
  isVisible: boolean
  getRealHeight: (n: number) => void
}

export class BlueBanner extends React.PureComponent<Props> {
  ref = React.createRef<View>()
  componentDidUpdate = () => {
    this.ref.current.measure((_x, _y, _w, height) => {
      this.props.getRealHeight(height)
    })
  }
  render() {
    return (
      <View
        testID={'banner'}
        ref={this.ref}
        style={[styles.container, this.props.isVisible && styles.isVisible]}
      >
        <View style={styles.insideContainer}>
          <Text
            accessibilityRole="link"
            target="_blank"
            href={this.props.link}
            style={[fonts.navigation, textStyles.medium, styles.text]}
          >
            {this.props.children}
            <Text style={styles.icon}>
              <Chevron color={colors.white} opacity={1} />
            </Text>
          </Text>
        </View>
      </View>
    )
  }
}

export const BANNER_HEIGHT = 50

export const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    top: 0,
    backgroundColor: colors.navyBlue,
    width: '100%',
    maxWidth: '100vw',
    height: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  slideDown: {
    transitionProperty: 'top',
    transitionDuration: '300ms',
  },
  isVisible: {
    minHeight: BANNER_HEIGHT,
    height: 'contents',
  },
  insideContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  text: {
    color: colors.white,
    lineHeight: 20,
  },
  icon: {
    paddingLeft: 5,
    position: 'relative',
    top: 3,
  },
})

interface State {
  live: boolean
  text: string
  link: string
}

interface AnnouncementProps {
  onVisibilityChange: (visible: boolean) => void
}

async function getAnnouncement(onVisibilityChange: (visible: boolean) => void) {
  let visible = false
  let announcement = {text: "", link: "", live: false}
  const response = await fetch('/announcement')
  const announcements = await response.json() as State[]
  visible = announcements.length > 0
  announcement =  announcements[0]
  onVisibilityChange(visible)
  return {visible, text: announcement.text, link: announcement.text, live: announcement.live}
}

export default function Announcement(props: AnnouncementProps) {

  const state = useAsync(() => getAnnouncement(props.onVisibilityChange), [])
  const {setBannerHeight} = useScreenSize()

  if (state.status === "success") {
    return (
      <BlueBanner
        isVisible={state.result.live}
        link={state.result.link}
        getRealHeight={setBannerHeight}
      >
        {state.result.text}
      </BlueBanner>
    )
  }
  return null
}