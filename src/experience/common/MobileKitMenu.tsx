import * as React from "react"
import scrollToHash from "src/experience/common/scrollToHash"
import Sidebar, { Page } from "src/experience/common/Sidebar"
import Triangle, { Direction } from "src/shared/Triangle"
import { colors } from "src/colors"
import { css } from "@emotion/react"
import { WHEN_MOBILE, fonts, flexRow } from "src/estyles"
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
        <div css={barCss} onClick={this.toggleMenu} tabIndex={0} data-testid="toggle">
          <Title pages={pages} pathname={pathname} />
          <Triangle direction={this.state.isOpen ? Direction.up : Direction.down} />
        </div>
        <div css={[menuCss, this.state.isOpen && openCss]}>
          <div css={sideBarCss}>
            <Sidebar
              pages={pages}
              currentPathName={pathname}
              routeHash={this.props.routeHash}
              onChangeRoute={this.goToSubSection}
            />
          </div>
        </div>
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

  return <h6 css={fonts.h6}>{pageTitle}</h6>
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

const sideBarCss = css({
  position: "absolute",
  backgroundColor: colors.light,
  height: "100vh",
  overflow: "scroll",
  width: "100%",
  padding: 15,
})

const barCss = css(flexRow, {
  padding: "15px 20px",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottomColor: colors.gray,
  borderBottomWidth: 1,
  touchAction: "manipulation",
  transitionProperty: "opacity",
  transitionDuration: "250ms",
  "&:active, &:focus": {
    opacity: 0.8,
  },
})

const menuCss = css({
  height: "100%",
  transform: "scaleY(0)",
  transitionDuration: "250ms",
  transitionProperty: "transform",
  transformOrigin: "top",
})
const openCss = css({
  transform: "scaleY(1)",
})
