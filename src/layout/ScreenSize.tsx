import throttle from 'lodash.throttle'
import MobileDetect from 'mobile-detect'
import * as React from 'react'
import { Dimensions } from 'react-native'
import { BANNER_HEIGHT } from 'src/header/BlueBanner'
import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from 'src/shared/Styles'

export enum ScreenSizes {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  DESKTOP = 'DESKTOP',
}

interface State {
  screen: ScreenSizes
  bannerHeight: number
}

type ContextProps = State & {setBannerHeight: (h: number) => void}

const defaultContext = { screen: null, bannerHeight: BANNER_HEIGHT, setBannerHeight: () => null }

export const ScreenSizeContext = React.createContext<ContextProps>(defaultContext)

export class ScreenSizeProvider extends React.PureComponent<{}, State> {
  state = defaultContext

  windowResize = throttle(({ window: { width } }) => {
    const newScreen = widthToScreenType(width)
    if (newScreen !== this.state.screen) {
      this.setState({ screen: newScreen })
    }
  }, 50)

  setBannerHeight = (height: number) => {
    this.setState({bannerHeight: height})
  }

  componentDidMount() {
    this.windowResize({ window: Dimensions.get('window') })
    Dimensions.addEventListener('change', this.windowResize)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.windowResize)
    this.windowResize.cancel()
  }

  // when rendered on the server the Dimensions are set by guessing device size.
  screen = () => {
    return this.state.screen || widthToScreenType(Dimensions.get('screen').width)
  }

  render() {
    return (
      <ScreenSizeContext.Provider value={{ screen: this.screen(), bannerHeight: this.state.bannerHeight, setBannerHeight: this.setBannerHeight }}>
        {this.props.children}
      </ScreenSizeContext.Provider>
    )
  }
}

function widthToScreenType(width: number) {
  if (width >= DESKTOP_BREAKPOINT) {
    return ScreenSizes.DESKTOP
  } else if (width >= TABLET_BREAKPOINT) {
    return ScreenSizes.TABLET
  } else {
    return ScreenSizes.MOBILE
  }
}

export interface ScreenProps {
  screen: ScreenSizes
  bannerHeight: number
  setBannerHeight: (n: number) => void
}

export function withScreenSize<T>(
  Component: React.ComponentType<T>
): React.ComponentType<Omit<T, keyof ScreenProps>> {
  return function ScreenSizeContainer(props: T) {
    return (
      <ScreenSizeContext.Consumer>
        {({ screen, bannerHeight, setBannerHeight }) => {
          return <Component screen={screen} bannerHeight={bannerHeight} setBannerHeight={setBannerHeight} {...props} />
        }}
      </ScreenSizeContext.Consumer>
    )
  }
}

export function useScreenSize() {
  const { screen, bannerHeight, setBannerHeight } = React.useContext(ScreenSizeContext)
  return {
    bannerHeight,
    screen,
    setBannerHeight,
    isMobile: screen === ScreenSizes.MOBILE,
    isDesktop: screen === ScreenSizes.DESKTOP,
    isTablet: screen === ScreenSizes.TABLET,
  }
}

// by guessing device type we can have our server rendered content likely be the right size
// if not it will be fixed on the client after first rendeer.
// note this is intended to be used serverside and only as a guess
export function setDimensionsForScreen(userAgent: string) {
  const md = new MobileDetect(userAgent)

  if (md.mobile()) {
    Dimensions.set({
      window: { width: TABLET_BREAKPOINT - 1 },
      screen: { width: TABLET_BREAKPOINT - 1 },
    })
  } else if (md.tablet()) {
    Dimensions.set({
      window: { width: DESKTOP_BREAKPOINT - 1 },
      screen: { width: DESKTOP_BREAKPOINT - 1 },
    })
  } else {
    Dimensions.set({
      window: { width: DESKTOP_BREAKPOINT + 1 },
      screen: { width: DESKTOP_BREAKPOINT + 1 },
    })
  }
}
