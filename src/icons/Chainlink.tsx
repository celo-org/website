import * as React from 'react'
import { colors } from 'src/styles'


interface Props {
  color: colors
  size: number
}

export default React.memo(function Chainlink({ color, size }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.6842 8.00113C8.94985 8.73548 7.75924 8.73548 7.0249 8.00114L6.97665 7.95289C6.78139 7.75762 6.4648 7.75762 6.26954 7.95289C6.07428 8.14815 6.07428 8.46473 6.26954 8.65999L6.31779 8.70824C7.44266 9.83311 9.26644 9.83311 10.3913 8.70824L12.6356 6.46397C13.7604 5.3391 13.7604 3.51533 12.6356 2.39046C11.5107 1.26559 9.68693 1.26559 8.56206 2.39046L7.15838 3.79414C6.96312 3.9894 6.96312 4.30598 7.15838 4.50125C7.35364 4.69651 7.67022 4.69651 7.86549 4.50125L9.26917 3.09756C10.0035 2.36322 11.1941 2.36322 11.9285 3.09757C12.6628 3.83191 12.6628 5.02252 11.9285 5.75687L9.6842 8.00113ZM5.3416 7.02476C6.07595 6.29042 7.26656 6.29042 8.0009 7.02476L8.04915 7.07301C8.24441 7.26827 8.561 7.26827 8.75626 7.07301C8.95152 6.87775 8.95152 6.56117 8.75626 6.3659L8.70801 6.31765C7.58314 5.19278 5.75936 5.19279 4.63449 6.31765L2.39022 8.56193C1.26535 9.68679 1.26535 11.5106 2.39022 12.6354C3.51509 13.7603 5.33887 13.7603 6.46374 12.6354L7.86742 11.2318C8.06268 11.0365 8.06268 10.7199 7.86742 10.5246C7.67216 10.3294 7.35557 10.3294 7.16031 10.5246L5.75663 11.9283C5.02228 12.6627 3.83168 12.6627 3.09733 11.9283C2.36299 11.194 2.36299 10.0034 3.09733 9.26903L5.3416 7.02476Z"
      />
    </svg>
  )
})
