import * as React from "react"
import { StyleSheet } from "react-native"
import { Path } from "src/shared/svg"
import { colors } from "src/styles"

export default React.memo(function Transceive() {
  const phase1 = VALIDATOR_PATHS.length
  return (
    <svg width="100%" height="100%" viewBox="0 0 550 360" fill="none">
      <g style={{ mixBlendMode: "screen" }} opacity="0.8">
        <path
          d={
            "M17.2856 166.012C11.003 166.012 4.23449 171.89 1.57066 179.71C0.0293159 184.231 0.263867 188.551 2.2408 191.582C3.59785 193.692 5.72557 194.965 8.22187 195.199C8.48993 195.233 8.75799 195.233 9.02605 195.233C11.9747 195.233 15.1411 193.776 17.939 191.331C20.7369 188.903 23.1494 185.47 24.6405 181.535C26.3829 176.913 26.1818 172.509 24.0876 169.462C22.5295 167.235 20.117 166.012 17.2856 166.012Z"
          }
          key={"validator"}
          fill="#FCBA27"
        />
        {VALIDATOR_PATHS.map((d, index) => {
          return (
            <Path
              d={d}
              key={d.substr(16)}
              fill="#FCBA27"
              style={[styles.animate, styles.ripple, { animationDelay: `${decelerate(index)}ms` }]}
            />
          )
        })}
        <Path
          style={[styles.animate, styles.ripple, { animationDelay: `${decelerate(phase1)}ms` }]}
          key={"middle"}
          fill="#FDEE90"
          d="M314.141 2.57935C348.308 2.57935 377.263 17.3074 395.689 44.0811C421.108 80.8884 423.508 134.255 402.27 190.485C384.67 236.862 355.586 279.344 320.308 310.064C285.392 340.629 247.018 357.446 212.283 357.446C208.567 357.446 205.521 357.317 202.605 357.008C172.592 354.248 147.121 338.875 130.889 313.649C107.121 277.074 104.231 224.558 122.941 169.567C155.405 74.3627 237.599 2.57935 314.141 2.57935ZM314.141 0C236.67 0 153.315 72.4798 120.489 168.741C101.547 224.429 104.463 277.744 128.721 315.042C145.418 340.964 171.586 356.75 202.373 359.561C205.65 359.897 208.902 360 212.308 360C248.747 360 287.637 342.073 322.037 311.972C356.437 282.026 386.321 239.88 404.695 191.388C426.244 134.358 423.766 80.1404 397.805 42.5851C378.863 15.115 349.108 0 314.141 0Z"
        />
        {PAYMENT_PATHS.map((d, index) => {
          return (
            <Path
              style={[
                styles.animate,
                styles.ripple,
                { animationDelay: `${accelerate(phase1 + index - 1, decelerate(phase1 - 2))}ms` },
              ]}
              key={d.substr(16)}
              d={d}
              fill={colors.greenScreen}
            />
          )
        })}
        <Path
          d="M534.523 166.012C528.24 166.012 521.471 171.89 518.808 179.71C517.266 184.231 517.501 188.551 519.478 191.582C520.835 193.692 522.963 194.965 525.459 195.199C525.727 195.233 525.995 195.233 526.263 195.233C529.212 195.233 532.378 193.776 535.176 191.331C537.974 188.903 540.386 185.47 541.877 181.535C543.62 176.913 543.419 172.509 541.325 169.462C539.766 167.235 537.354 166.012 534.523 166.012Z"
          stroke={colors.greenScreen}
          strokeWidth="2"
          style={[
            styles.animate,
            styles.solidify,
            {
              animationDelay: `${accelerate(
                phase1 + PAYMENT_PATHS.length - 1,
                decelerate(phase1 - 2)
              )}ms`,
            },
          ]}
        />
      </g>
    </svg>
  )
})

const SPEED = 100
const OVERLAP_MULTLIER = 8
const DURATION = SPEED * OVERLAP_MULTLIER

const styles = StyleSheet.create({
  animate: {
    animationDuration: `${DURATION}ms`,
    animationFillMode: "both",
    animationIterationCount: 1,
    animationTimingFunction: "linear",
  },
  solidify: {
    animationKeyframes: [
      {
        from: { fill: "transparent" },
        to: { fill: colors.greenScreen },
      },
    ],
  },
  ripple: {
    opacity: 0,
    animationKeyframes: [
      {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    ],
  },
})

const BASE_DELAY = 2000

function accelerate(index: number, starting: number) {
  return starting + index * SPEED * 1.5 ** 2
}

function decelerate(index: number) {
  return BASE_DELAY + Math.round(SPEED * (index + 1) ** 1.33)
}

const PAYMENT_PATHS = [
  "M345.847 25.0715C375.628 25.0715 400.867 37.9167 416.944 61.234C439.138 93.3469 441.228 139.93 422.673 189.041C407.293 229.588 381.873 266.679 351.06 293.556C320.557 320.227 287.06 334.929 256.738 334.929C253.512 334.929 250.828 334.8 248.299 334.542C222.131 332.143 199.938 318.731 185.796 296.755C165.048 264.848 162.519 218.987 178.88 170.96C207.215 87.8271 279.035 25.0715 345.847 25.0715ZM345.847 22.4922C278.054 22.4922 205.125 85.9184 176.402 170.134C159.835 218.858 162.389 265.519 183.602 298.147C198.209 320.82 221.099 334.645 248.041 337.096C250.906 337.379 253.77 337.482 256.712 337.482C288.583 337.482 322.622 321.8 352.738 295.465C382.828 269.233 408.996 232.348 425.073 189.918C443.912 140.007 441.744 92.5731 419.06 59.738C402.493 35.7243 376.428 22.4922 345.847 22.4922Z",
  "M377.589 47.5891C402.983 47.5891 424.531 58.5514 438.234 78.4382C457.176 105.857 458.957 145.682 443.112 187.648C429.951 222.34 408.196 254.092 381.822 277.074C355.757 299.875 327.112 312.437 301.228 312.437C298.493 312.437 296.196 312.334 294.028 312.102C271.731 310.064 252.789 298.612 240.712 279.86C222.983 252.596 220.841 213.416 234.828 172.352C259.035 101.291 320.48 47.5891 377.589 47.5891ZM377.589 45.0098C319.473 45.0098 256.97 99.3567 232.351 171.579C218.131 213.338 220.351 253.318 238.518 281.304C251.035 300.752 270.647 312.592 293.744 314.707C296.196 314.965 298.647 315.042 301.176 315.042C328.505 315.042 357.667 301.604 383.473 279.034C409.28 256.542 431.68 224.92 445.46 188.576C461.615 145.811 459.757 105.134 440.299 76.9937C426.131 56.3331 403.809 45.0098 377.589 45.0098Z",
  "M409.306 70.0806C430.338 70.0806 448.144 79.1341 459.473 95.5904C475.189 118.314 476.634 151.356 463.473 186.203C452.531 215.04 434.441 241.453 412.531 260.566C390.88 279.498 367.138 289.944 345.641 289.944C343.37 289.944 341.486 289.867 339.68 289.661C321.228 287.984 305.564 278.518 295.577 262.99C280.893 240.395 279.112 207.869 290.699 173.77C310.854 114.755 361.925 70.0806 409.306 70.0806ZM409.306 67.5012C360.893 67.5012 308.79 112.795 288.273 172.971C276.428 207.766 278.261 241.092 293.409 264.409C303.835 280.607 320.196 290.486 339.448 292.24C341.486 292.446 343.525 292.524 345.641 292.524C368.402 292.524 392.738 281.329 414.235 262.5C435.731 243.748 454.415 217.413 465.899 187.106C479.37 151.459 477.822 117.566 461.589 94.1201C449.77 76.9416 431.164 67.5012 409.306 67.5012Z",
  "M441.047 92.5986C457.693 92.5986 471.783 99.7692 480.764 112.795C493.228 130.85 494.389 157.082 483.912 184.81C475.189 207.818 460.764 228.866 443.293 244.084C426.08 259.147 407.189 267.453 390.131 267.453C388.351 267.453 386.854 267.375 385.409 267.246C370.802 265.905 358.415 258.425 350.519 246.147C338.854 228.195 337.46 202.35 346.673 175.241C362.699 128.219 403.396 92.5986 441.047 92.5986ZM441.047 90.0193C402.312 90.0193 360.635 126.259 344.222 174.39C334.751 202.221 336.222 228.892 348.325 247.54C356.66 260.514 369.744 268.381 385.151 269.8C386.777 269.981 388.428 270.032 390.106 270.032C408.325 270.032 427.783 261.082 444.97 246.018C462.157 231.032 477.099 209.959 486.312 185.713C497.073 157.186 495.835 130.077 482.88 111.325C473.409 97.551 458.518 90.0193 441.047 90.0193Z",
  "M472.789 115.091C485.047 115.091 495.447 120.378 502.054 129.948C511.292 143.309 512.118 162.783 504.35 183.366C497.847 200.519 487.086 216.201 474.054 227.576C461.254 238.77 447.241 244.935 434.596 244.935C433.305 244.935 432.196 244.884 431.112 244.78C420.35 243.8 411.241 238.28 405.434 229.253C396.789 215.943 395.757 196.779 402.622 176.634C414.518 141.658 444.841 115.091 472.789 115.091ZM472.789 112.511C443.731 112.511 412.48 139.698 400.17 175.783C393.073 196.675 394.157 216.665 403.267 230.646C409.538 240.37 419.344 246.276 430.88 247.334C432.118 247.463 433.331 247.514 434.596 247.514C448.247 247.514 462.854 240.782 475.757 229.511C488.66 218.265 499.86 202.453 506.75 184.269C514.828 162.886 513.899 142.561 504.17 128.477C497.047 118.186 485.899 112.511 472.789 112.511Z",
  "M504.505 137.583C512.402 137.583 519.06 140.961 523.292 147.126C529.279 155.793 529.796 168.483 524.712 181.947C520.428 193.245 513.331 203.588 504.763 211.068C496.376 218.394 487.241 222.443 479.034 222.443C478.208 222.443 477.512 222.417 476.789 222.34C469.899 221.721 464.041 218.161 460.299 212.384C454.673 203.743 454.028 191.233 458.518 178.053C466.363 155.122 486.286 137.583 504.505 137.583ZM504.505 135.003C485.125 135.003 464.299 153.136 456.092 177.201C451.344 191.13 452.092 204.439 458.157 213.777C462.338 220.251 468.867 224.197 476.557 224.919C477.383 224.997 478.183 225.023 479.034 225.023C488.144 225.023 497.873 220.534 506.466 213.029C515.06 205.523 522.544 194.999 527.137 182.876C532.531 168.612 531.912 155.071 525.408 145.682C520.686 138.795 513.254 135.003 504.505 135.003Z",
]

const VALIDATOR_PATHS = [
  "M64.3343 137.583C72.2311 137.583 78.8892 140.961 83.1214 147.126C89.1085 155.793 89.6246 168.483 84.5408 181.947C80.2569 193.245 73.1601 203.588 64.5924 211.068C56.2053 218.394 47.0698 222.443 38.8634 222.443C38.0634 222.443 37.315 222.417 36.644 222.34C29.7279 221.669 23.8699 218.136 20.1537 212.384C14.5537 203.717 13.8828 191.181 18.3731 178.027C26.2182 154.967 45.986 137.583 64.3343 137.583ZM64.3343 135.003C44.9537 135.003 24.1279 153.11 15.9215 177.201C11.1731 191.13 11.9473 204.439 17.986 213.777C22.1666 220.251 28.6957 224.146 36.386 224.919C37.2118 224.997 38.0118 225.023 38.8634 225.023C47.9731 225.023 57.7021 220.534 66.2956 213.029C74.8892 205.523 82.373 194.999 86.9666 182.876C92.3601 168.612 91.7408 155.071 85.2375 145.682C80.515 138.795 73.0827 135.003 64.3343 135.003Z",
  "M105.96 115.091C118.218 115.091 128.618 120.378 135.225 129.948C144.463 143.309 145.289 162.783 137.521 183.366C131.018 200.519 120.257 216.201 107.225 227.576C94.4247 238.77 80.4118 244.935 67.7666 244.935C66.5279 244.935 65.3924 244.884 64.2828 244.78C53.4957 243.723 44.386 238.203 38.5796 229.253C29.9602 215.917 28.928 196.727 35.7667 176.608C47.7667 141.529 77.9344 115.091 105.96 115.091ZM105.96 112.511C76.9021 112.511 45.6505 139.698 33.3409 175.783C26.2441 196.675 27.3538 216.64 36.4376 230.646C42.7086 240.344 52.515 246.225 64.0505 247.334C65.2892 247.463 66.5021 247.514 67.7666 247.514C81.4182 247.514 96.0247 240.782 108.928 229.511C121.831 218.265 133.031 202.453 139.921 184.269C147.999 162.886 147.07 142.561 137.341 128.477C130.244 118.186 119.07 112.511 105.96 112.511Z",
  "M147.612 92.5986C164.257 92.5986 178.347 99.7692 187.328 112.795C199.792 130.85 200.954 157.082 190.476 184.81C181.754 207.818 167.328 228.866 149.857 244.084C132.644 259.147 113.754 267.453 96.6956 267.453C94.9924 267.453 93.444 267.375 91.973 267.246C77.3408 265.828 64.9537 258.322 57.0569 246.147C45.4182 228.144 43.9989 202.298 53.2118 175.215C69.2892 128.116 109.857 92.5986 147.612 92.5986ZM147.612 90.0193C108.876 90.0193 67.1989 126.259 50.786 174.39C41.315 202.221 42.8118 228.866 54.8892 247.54C63.2505 260.489 76.3343 268.304 91.715 269.8C93.3408 269.955 94.9924 270.032 96.6698 270.032C114.889 270.032 134.347 261.082 151.534 246.018C168.747 231.032 183.689 209.933 192.876 185.713C203.637 157.186 202.399 130.077 189.444 111.325C179.973 97.551 165.083 90.0193 147.612 90.0193Z",
  "M189.237 70.0808C210.27 70.0808 228.076 79.1343 239.405 95.5906C255.121 118.315 256.566 151.356 243.405 186.203C232.463 215.04 214.373 241.453 192.463 260.566C170.812 279.498 147.07 289.945 125.573 289.945C123.431 289.945 121.496 289.867 119.612 289.687C101.134 287.881 85.444 278.415 75.5085 263.016C60.8505 240.344 59.0698 207.818 70.6311 173.797C90.8117 114.678 141.805 70.0808 189.237 70.0808ZM189.237 67.5015C140.825 67.5015 88.7214 112.795 68.2053 172.971C56.3602 207.767 58.244 241.066 73.3408 264.409C83.8182 280.582 100.128 290.357 119.379 292.24C121.418 292.447 123.457 292.524 125.573 292.524C148.334 292.524 172.67 281.33 194.166 262.5C215.663 243.748 234.347 217.413 245.831 187.106C259.302 151.459 257.753 117.567 241.521 94.1204C229.702 76.9419 211.095 67.5015 189.237 67.5015Z",
  "M230.863 47.5891C256.257 47.5891 277.805 58.5514 291.508 78.4382C310.45 105.857 312.231 145.656 296.386 187.648C283.224 222.34 261.47 254.092 235.095 277.074C209.031 299.875 180.386 312.437 154.502 312.437C151.921 312.437 149.573 312.334 147.302 312.102C124.954 309.935 106.012 298.483 93.986 279.885C76.3086 252.544 74.1408 213.364 88.0763 172.378C112.334 101.24 173.728 47.5891 230.863 47.5891ZM230.863 45.0098C172.747 45.0098 110.244 99.3825 85.6247 171.579C71.4053 213.338 73.6763 253.292 91.7924 281.304C104.36 300.727 123.947 312.437 147.018 314.707C149.47 314.939 151.921 315.042 154.45 315.042C181.779 315.042 210.941 301.604 236.747 279.034C262.554 256.542 284.954 224.92 298.734 188.576C314.889 145.811 313.031 105.134 293.573 76.9937C279.431 56.3331 257.083 45.0098 230.863 45.0098Z",
  "M272.515 25.0715C302.296 25.0715 327.534 37.9167 343.612 61.234C365.805 93.3469 367.895 139.93 349.341 189.041C333.96 229.588 308.541 266.679 277.728 293.556C247.225 320.227 213.728 334.929 183.405 334.929C180.36 334.929 177.625 334.8 174.967 334.542C148.747 331.988 126.554 318.576 112.438 296.755C91.7409 264.745 89.2119 218.884 105.522 170.96C133.883 87.8013 205.65 25.0715 272.515 25.0715ZM272.515 22.4922C204.721 22.4922 131.792 85.9184 103.07 170.134C86.5022 218.858 89.1344 265.467 110.27 298.147C124.928 320.794 147.792 334.49 174.709 337.096C177.573 337.379 180.438 337.482 183.38 337.482C215.25 337.482 249.289 321.8 279.405 295.465C309.496 269.233 335.663 232.348 351.741 189.918C370.579 140.007 368.412 92.5731 345.728 59.738C329.134 35.7243 303.096 22.4922 272.515 22.4922Z",
]
