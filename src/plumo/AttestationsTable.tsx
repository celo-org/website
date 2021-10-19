import { css } from "@emotion/react"
import * as React from "react"
import { jost, WHEN_MOBILE, WHEN_SMALL_MOBILE, WHEN_TABLET, WHEN_TABLET_AND_UP } from "src/estyles"
import { NameSpaces, useTranslation } from "src/i18n"
import { colors } from "src/colors"
import Octocat from "src/icons/Octocat"
import Keybase from "src/icons/Keybase"
import { TweetLogo } from "src/icons/TwitterLogo"
import { Progress } from "./Progress"
import { useScreenSize } from "src/layout/ScreenSize"

export interface Row {
  name: string
  address: string
  count: number
  max: number
  twitter?: string
  github?: string
  keybase?: string
}

interface Props {
  loading: boolean
  showProgress: boolean
  rows: Row[]
}

export default function AttestationsTable(props: Props) {
  const { isMobile } = useScreenSize()
  const { t } = useTranslation(NameSpaces.plumo)
  return (
    <div css={container}>
      <table css={rootCss}>
        <thead>
          <tr css={borderStyle}>
            <th css={tableHeadingCss}>{t("table.publicKey")}</th>
            <th css={tableHeadingCss}>{t("table.name")}</th>
            <th css={tableHeadingCss}>{t("table.attestations")}</th>
          </tr>
        </thead>
        <tbody css={borderStyle}>
          {props.rows?.map((row) => {
            return (
              <TRow
                loading={props.loading}
                showProgress={props.showProgress}
                isMobile={isMobile}
                key={row.address}
                max={row.max}
                name={row.name}
                address={row.address}
                count={row.count}
                twitter={row.twitter}
                github={row.github}
                keybase={row.keybase}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const TRow = React.memo(
  (props: Row & { isMobile: boolean; loading: boolean; showProgress: boolean }) => {
    return (
      <tr>
        <td>
          <span css={addressStyle}>
            {props.isMobile ? firstAndLast4(props.address) : props.address}
          </span>
          {props.showProgress && (
            <Progress count={props.count} max={props.max} loading={props.loading} />
          )}
        </td>
        <td>{props.name}</td>
        <td>
          {props.twitter && (
            <a css={twitterCss} target="_blank" rel="noopener" href={props.twitter}>
              <TweetLogo color={colors.white} height={20} />
            </a>
          )}
          {props.github && (
            <a css={twitterCss} target="_blank" rel="noopener" href={props.github}>
              <Octocat color={colors.white} size={20} />
            </a>
          )}
          {props.keybase && (
            <a css={twitterCss} target="_blank" rel="noopener" href={props.keybase}>
              <Keybase color={colors.white} size={20} />
            </a>
          )}
        </td>
      </tr>
    )
  }
)

function firstAndLast4(address: string) {
  return `${address.substr(0, 4)}...${address.substr(address.length - 4, 4)}`
}

const twitterCss = css({
  margin: 4,
})

const addressStyle = css({
  fontSize: 14,
  lineHeight: "16px",
  [WHEN_SMALL_MOBILE]: {
    fontSize: 12,
  },
  [WHEN_TABLET]: {
    lineBreak: "anywhere",
  },
})

const borderStyle = css({
  border: `1px solid ${colors.secondary}`,
})

const container = css({
  [WHEN_TABLET_AND_UP]: {
    minHeight: 360,
  },
})

const rootCss = css(jost, borderStyle, {
  width: "100%",
  color: colors.white,
  backgroundColor: colors.dark,
  borderCollapse: "collapse",
  th: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  td: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  "tr:first-of-type": {
    td: {
      paddingTop: 40,
    },
  },
  "tr:last-of-type": {
    td: {
      paddingBottom: 40,
    },
  },
  "td, th": {
    paddingLeft: 18,
    paddingRight: 18,
    "&:first-of-type": {
      paddingLeft: 40,
    },
    "&:last-of-type": {
      paddingRight: 40,
    },
  },
  [WHEN_TABLET]: {
    paddingLeft: 16,
    paddingRight: 16,
    "td, th": {
      "&:first-of-type": {
        paddingLeft: 32,
      },
      "&:last-of-type": {
        paddingRight: 24,
      },
    },
  },
  [WHEN_MOBILE]: {
    "td, th": {
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
      paddingBottom: 8,
      "&:first-of-type": {
        paddingLeft: 8,
      },
      "&:last-of-type": {
        paddingRight: 8,
      },
    },
    "tr:first-of-type": {
      td: {
        paddingTop: 12,
      },
    },
    "tr:last-of-type": {
      td: {
        paddingBottom: 12,
      },
    },
  },
})

const tableHeadingCss = css(jost, {
  textAlign: "left",
  color: colors.white,
  fontSize: 16,
  lineHeight: "16px",
  fontWeight: 500,
})
