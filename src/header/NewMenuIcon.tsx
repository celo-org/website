import { css, CSSObject } from "@emotion/react"
import * as React from "react"
import Hamburger from "src/header/Hamburger"
import { colors } from "src/colors"

interface Props {
  onPress: () => void
  isOpen: boolean
  menuFaded: boolean
}

export default React.memo(function NewMenuIcon(props: Props) {
  return (
    <div css={[menuContainerCss, props.menuFaded && hideMenuIconCss]} onClick={props.onPress}>
      {!props.isOpen ? (
        <>
          <p>Menu</p>
          <svg
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 2H11.3333V11.3333H2V2ZM30.0005 2H20.6672V11.3333H30.0005V2ZM30.0005 20.6667H20.6672V30H30.0005V20.6667ZM11.3333 20.6666H2V29.9999H11.3333V20.6666Z"
              fill="black"
            />
          </svg>
        </>
      ) : (
        <Hamburger onPress={props.onPress} isOpen={true} color={colors.dark} />
      )}
    </div>
  )
})

function flexCss(cssStyle: CSSObject) {
  return css(
    {
      display: "flex",
    },
    cssStyle
  )
}

const menuContainerCss = flexCss({
  position: "fixed",
  top: 0,
  right: 30,
  alignItems: "center",
  fontWeight: "bold",
  gap: "18px",
  fontFamily: "Jost,futura-pt,futura,sans-serif",
  cursor: "pointer",
})

const hideMenuIconCss = css({
  transitionProperty: "opacity",
  transitionDuration: "200ms",
  opacity: 0,
})
