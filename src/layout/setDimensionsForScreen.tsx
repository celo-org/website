import MobileDetect from "mobile-detect"
import { Dimensions } from "react-native"
import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from "src/shared/Styles"

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
