import * as React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import scrollToHash from "src/experience/common/scrollToHash"
import Sidebar, { Page } from "src/experience/common/Sidebar"
import Triangle, { Direction } from "src/shared/Triangle"
import { fonts, standardStyles } from "src/styles"
import { colors } from "src/colors"
import { css } from "@emotion/react"
import { WHEN_MOBILE } from "src/estyles"
interface Props {
  pages: Page[]
  pathname: string
  routeHash: string
}

interface State {
  isOpen: boolean
}

export default class MobileMenu extends React.PureComponent<Props, State> {
  state = { isOpen: false }

  componentDidMount = () => {
    window.addEventListener("hashchange", this.closeMenu, false)
  }

  closeMenu = () => {
    this.setState({ isOpen: false })
  }

  componentWillUnmount = () => {
    window.removeEventListener("hashchange", this.closeMenu)
  }

  toggleMenu = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }))
  }

  goToSubSection = () => {
    scrollToHash(50)
    this.closeMenu()
  }

  render() {
    const { pages, pathname } = this.props
    return (
      <div css={containerCss}>
        <TouchableOpacity testID="toggle" onPress={this.toggleMenu}>
          <View style={[standardStyles.row, styles.bar]}>
            <Title pages={pages} pathname={pathname} />
            <Triangle direction={this.state.isOpen ? Direction.up : Direction.down} />
          </View>
        </TouchableOpacity>
        <View style={[styles.menu, this.state.isOpen && styles.open]}>
          <View style={styles.sideBar}>
            <Sidebar
              pages={pages}
              currentPathName={pathname}
              routeHash={this.props.routeHash}
              onChangeRoute={this.goToSubSection}
            />
          </View>
        </View>
      </div>
    )
  }
}

function Title({ pages, pathname }: Omit<Props, "routeHash">) {
  const pageTitle = React.useMemo(() => {
    const index = pathname.indexOf("#")
    const pathnameSansHash = index === -1 ? pathname : pathname.slice(0, index)
    const page = pages.find((p) => pathnameSansHash === p.href)
    return page && page.title
  }, [pathname, pages])

  return <Text style={fonts.h6}>{pageTitle}</Text>
}

const containerCss = css({
  display: "none",
  width: "100%",
  [WHEN_MOBILE]: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: colors.white,
    zIndex: -1,
  },
})

const styles = StyleSheet.create({
  sideBar: {
    position: "absolute",
    backgroundColor: colors.light,
    height: "100vh",
    overflow: "scroll",
    width: "100%",
    padding: 15,
  },
  bar: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  menu: {
    height: "100%",
    transform: [{ scaleY: 0 }],
    transitionDuration: "250ms",
    transitionProperty: "transform",
    transformOrigin: "top",
  },
  open: {
    transform: [{ scaleY: 1 }],
  },
})
