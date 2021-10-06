import * as React from "react"
import { css } from "@emotion/react"
import { flexRow, fonts } from "src/estyles"
interface Props {
  isShowing: boolean
  children: React.ReactNode
  className?: string
}

export default React.memo(({ children, isShowing, className }: Props) => {
  return (
    <div
      css={css(containerCss, !isShowing && collapsedCss)}
      aria-hidden={!isShowing}
      aria-live={"polite"}
    >
      <p className={className} css={css(textCSS, isShowing ? showingCss : hidingCss)}>
        {children}
      </p>
    </div>
  )
})

const containerCss = css(flexRow, {
  margin: "5px 0",
  height: "auto",
  maxHeight: 80,
  transitionProperty: "max-height",
  transitionDuration: "600ms",
})

const collapsedCss = css({
  maxHeight: 0,
})

const textCSS = css(fonts.h6, {
  transitionProperty: "opacity",
  transitionDuration: "700ms",
})

const showingCss = {
  opacity: 100,
}

const hidingCss = {
  opacity: 0,
}
