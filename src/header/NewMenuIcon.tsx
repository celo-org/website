import { css, CSSObject } from "@emotion/react"
import * as React from "react"
import { inter } from "../estyles"

interface Props {
  onPress: () => void
  isOpen: boolean
  menuFaded: boolean
}

export default React.memo(function NewMenuIcon(props: Props) {
  return (
    <div css={[menuContainerCss, props.menuFaded && hideMenuIconCss]} onClick={props.onPress}>
      <p css={css(menuText, props.isOpen && { opacity: 0 })}>Menu</p>
      <p css={css(menuText, { opacity: props.isOpen ? 1 : 0, top: props.isOpen ? -9 : 0 })}>
        Close
      </p>
      <svg
        css={css(menuIcon, props.isOpen && { transform: "rotateZ(-90deg)", opacity: 0 })}
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 2H11.3333V11.3333H2V2ZM30.0005 2H20.6672V11.3333H30.0005V2ZM30.0005 20.6667H20.6672V30H30.0005V20.6667ZM11.3333 20.6666H2V29.9999H11.3333V20.6666Z"
          fill="black"
        />
      </svg>
      <svg
        css={css(menuIcon, !props.isOpen && { transform: "rotateZ(90deg)", opacity: 0 })}
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="32"
        fill="none"
        viewBox="0 0 33 32"
      >
        <path
          fill="#000"
          fillRule="evenodd"
          d="M2.436 30v-9.333h9.333V30H2.436zm0-18.667V2h9.333v9h9v9.333h-9.333v-9h-9zm18.666 0V2h9.334v9.333h-9.334zm0 9.334V30h9.333v-9.333h-9.333z"
          clipRule="evenodd"
        ></path>
      </svg>
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
  alignItems: "center",
  fontWeight: "bold",
  gap: "18px",
  fontFamily: "Jost,futura-pt,futura,sans-serif",
  cursor: "pointer",
  marginTop: "1em",
  zIndex: 99,
  position: "absolute",
  top: 0,
  right: 30,
})

const hideMenuIconCss = css({
  transitionProperty: "opacity",
  transitionDuration: "200ms",
  opacity: 0,
})

const menuText = css(inter, {
  fontWeight: 700,
  position: "absolute",
  top: -9,
  right: 40,
  marginRight: 13,
  transitionProperty: "all",
  transitionDuration: "200ms",
})

const menuIcon = css({
  position: "absolute",
  top: 0,
  right: 0,
  transitionProperty: "all",
  transitionDuration: "200ms",
})
