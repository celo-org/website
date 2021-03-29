
import {css} from "@emotion/react"
import * as React from 'react'
import { jost, WHEN_MOBILE, WHEN_SMALL_MOBILE } from "src/estyles"
import { NameSpaces, useTranslation } from "src/i18n"
import { colors } from "src/styles"
import Octocat from "src/icons/Octocat"
import {TweetLogo} from "src/icons/TwitterLogo"
import { Progress } from "./Progress"
import { useScreenSize } from "src/layout/ScreenSize"

interface Row {
  name: string
  address: string
  count: number
  twitter: string
  github: string
}

interface Props {
  rows: Row[]
}


export default function AttestationsTable(props: Props) {
  const {isMobile} = useScreenSize()
  const {t} = useTranslation(NameSpaces.plumo)
  return <table css={rootCss}>
    <thead>
      <tr css={borderStyle}>
        <th css={tableHeadingCss}>
          {t("table.publicKey")}
        </th>
        <th css={tableHeadingCss}>
          {t("table.name")}
        </th>
        <th css={tableHeadingCss}>
          {t("table.attestations")}
        </th>
      </tr>
    </thead>
    <tbody css={borderStyle}>
      {props.rows.map(row => {
        return <TRow isMobile={isMobile} key={row.address}  name={row.name} address={row.address} count={row.count} twitter={row.twitter} github={row.github}  />
      })}
    </tbody>
  </table>
}

const TRow = React.memo((props: Row & {isMobile: boolean}) => {

  return <tr>
    <td>
      <span css={addressStyle}>{props.isMobile ? firstAndLast4(props.address): props.address}</span>
      <Progress count={props.count} />
    </td>
    <td>
      {props.name}
    </td>
    <td>
      {props.twitter  && <a css={twitterCss} target="_blank" rel="noopener" href={props.twitter}><TweetLogo color={colors.white} height={20}  /></a>}
      {props.github && <a target="_blank" rel="noopener" href={props.github}><Octocat color={colors.white} size={20} /></a>}
    </td>
  </tr>
})

function firstAndLast4(address: string) {
  return `${address.substr(0, 4)}...${address.substr(address.length - 4, 4)}`
}

const twitterCss = css({
  marginRight: 8
})

const addressStyle = css({
  fontSize: 12,
  lineHeight: "16px",
  [WHEN_SMALL_MOBILE]: {
    lineBreak: "anywhere"
  }
})

const borderStyle = css({
  border: `1px solid ${colors.secondary}`
})

const rootCss = css(jost,borderStyle,{
  color: colors.white,
  backgroundColor: colors.dark,
  borderCollapse: "collapse",
  "td, th": {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    "&:first-of-type": {
      paddingLeft: 20
    },
    "&:last-of-type": {
      paddingRight: 20
    }
  },
  [WHEN_MOBILE]: {
    "td, th": {
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
      paddingBottom: 8,
      "&:first-of-type": {
        paddingLeft: 8
      },
      "&:last-of-type": {
        paddingRight: 8
      }
    },
  }
})


const tableHeadingCss = css(jost,{
  textAlign: "left",
  color: colors.white,
  fontSize: 16,
  lineHeight: "16px",
  fontWeight: 500
})