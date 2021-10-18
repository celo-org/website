import { useRouter } from "next/router"
import * as React from "react"
import useSWR from "swr"
import { StyleSheet, Text, View } from "react-native"
import Chevron from "src/icons/chevron"
import { useScreenSize } from "src/layout/ScreenSize"
import { fonts, textStyles } from "src/styles"
import { colors } from "src/colors"
interface Props {
  link: string
  children: React.ReactNode
  isVisible: boolean
  getRealHeight: (n: number) => void
}

export function BlueBanner(props: Props) {
  const ref = React.useRef<View>()
  const router = useRouter()

  const { getRealHeight } = props

  React.useLayoutEffect(() => {
    ref.current.measure((_x, _y, _w, height) => {
      getRealHeight(height)
    })
  }, [router.pathname, router.locale, getRealHeight, ref])

  return (
    <View
      testID={"banner"}
      ref={ref}
      style={[styles.container, props.isVisible && styles.isVisible]}
    >
      <View style={styles.insideContainer}>
        <Text
          accessibilityRole="link"
          hrefAttrs={hrefAttrs}
          href={props.link}
          style={[fonts.navigation, textStyles.medium, styles.text]}
        >
          {props.children}
          <Text style={styles.icon}>
            <Chevron color={colors.white} opacity={1} />
          </Text>
        </Text>
      </View>
    </View>
  )
}
const hrefAttrs = { target: "blank", rel: "noopenner" }

export const BANNER_HEIGHT = 50

export const styles = StyleSheet.create({
  container: {
    position: "fixed",
    top: 0,
    backgroundColor: colors.navyBlue,
    width: "100%",
    maxWidth: "100vw",
    height: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  slideDown: {
    transitionProperty: "top",
    transitionDuration: "300ms",
  },
  isVisible: {
    minHeight: BANNER_HEIGHT,
    height: "contents",
  },
  insideContainer: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  text: {
    color: colors.white,
    lineHeight: 20,
  },
  icon: {
    paddingLeft: 5,
    position: "relative",
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
  let announcement = { text: "", link: "", live: false }
  const response = await fetch("/announcement")
  const announcements = (await response.json()) as State[]
  visible = announcements.length > 0
  announcement = announcements[0]
  onVisibilityChange(visible)
  return { visible, text: announcement.text, link: announcement.link, live: announcement.live }
}

export default function Announcement(props: AnnouncementProps) {
  const state = useSWR(["/announcement", props.onVisibilityChange], () =>
    getAnnouncement(props.onVisibilityChange)
  )
  const { setBannerHeight } = useScreenSize()

  if (!state.error && state.data) {
    return (
      <BlueBanner
        isVisible={state.data?.live}
        link={state.data?.link}
        getRealHeight={setBannerHeight}
      >
        {state.data?.text}
      </BlueBanner>
    )
  }
  return null
}
