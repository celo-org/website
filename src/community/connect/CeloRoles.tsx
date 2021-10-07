import { css } from "@emotion/react"
import * as React from "react"
import LottieBase from "src/animate/LottieBase"
import profiles from "src/community/lottie/all.json"

export default React.memo(function CeloContributors() {
  return (
    <div css={rootCss}>
      <LottieBase loop={false} data={profiles} autoPlay={true} />
    </div>
  )
})

const rootCss = css({
  width: "100%",
  maxWidth: 850,
})
