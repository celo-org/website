import {css} from "@emotion/react"
import * as React from 'react'
import { flex, gridRow, WHEN_MOBILE, WHEN_TABLET_AND_UP } from "src/estyles"
import { I18nProps, withNamespaces } from 'src/i18n'
import { Cell, GridRow, Spans } from 'src/layout/GridRow'
import Button, { BTN, SIZE } from 'src/shared/Button.3'
import MENU from 'src/shared/menu-items'
import { colors, standardStyles } from 'src/styles'
import theblock from './the-block.svg'
import fortune from './fortune-white.png'
import coindesk from './coindesk-logo-white.png'
import techcrunch from './techcrunch-logo-white.png'
import wsj from './wsj-logo-white.png'

class Press extends React.PureComponent<I18nProps> {
  render() {
    const { t } = this.props
    return (
      <div css={backgroundCss}>
        <GridRow
          mobileStyle={standardStyles.blockMarginBottomMobile}
          tabletStyle={standardStyles.blockMarginBottomTablet}
          desktopStyle={standardStyles.blockMarginBottom}
        >
          <Cell span={Spans.full} style={standardStyles.centered}>
            <div css={logoContainerCss}>
              {logos.map((logo) => (
                <a  key={logo.url} href={logo.url} target={'_blank'} rel="noopener">
                  <img
                    alt={logo.alt}
                    loading={"lazy"}
                    css={css(logoCss, logo.size)}
                    width={logo.size?.width ||130}
                    height={logo.size?.height || 25}
                    src={logo.source}
                    />
                </a>
              ))}
            </div>
            <div css={links}>
              <Button
                text={t('recentNews')}
                kind={BTN.NAKED}
                size={SIZE.normal}
                href={MENU.PRESS.link}
              />
              <Button
                text={t('contactPress')}
                kind={BTN.NAKED}
                size={SIZE.normal}
                href={"mailto:press@celo.org"}
              />
            </div>
          </Cell>
        </GridRow>
      </div>
    )
  }
}

const backgroundCss = css(flex,{
  backgroundColor: colors.dark,
  [WHEN_MOBILE]: {
    opacity: 0.9,
    paddingTop: 24,
    backgroundColor: colors.darkTransparent,
    zIndex: 10,
    boxShadow: `-1px 5px 22px 7px ${colors.darkTransparent}`
  }
})

const links = css(gridRow, {
  marginTop: 24
})

const logoCss = css({
  objectFit: "contain",
  height: 25,
  width: 130,
  marginTop: 12,
  marginBottom: 12,
  marginLeft: '5vw',
  marginRight: '5vw',
  cursor: 'pointer',
  [WHEN_TABLET_AND_UP]: {
    marginLeft: 20,
    marginRight: 20
  },
  [WHEN_MOBILE]: {
    height: 20,
    width: 104,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
    marginBottom: 12,
  }
})

const logoContainerCss = css({
  display: "flex",
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  opacity: 0.7,
  [WHEN_MOBILE]: {
    display: 'none'
  }
})
interface Logo {
  source: string
  size: { height?: number; width?: number }
  url: string
  alt: string
}

const logos: Logo[] = [
  {
    source: theblock,
    size: {},
    alt: "The Block",
    url:
      'https://www.theblockcrypto.com/post/94012/celo-stablecoin-morgan-beller-advisor',
  },
  {
    alt: "Wall Street Journal",
    source: wsj,
    size: { height: 50, width: 180 },
    url:
      'https://www.wsj.com/articles/startup-celo-aims-to-make-crypto-accessible-to-mainstream-mobile-users-11554204600',
  },
  {
    alt: "Fortune",
    source: fortune,
    size: {},
    url:
      'https://fortune.com/2021/02/10/one-day-well-all-yawn-about-blockchain/',
  },
  {
    alt: "Decrypt",
    source: coindesk,
    size: {},
    url: 'https://decrypt.co/57246/celo-raises-20-million-as-it-debuts-decentralized-venmo-competitor',
  },
  {
    alt: "TechCrunch",
    source: techcrunch,
    size: {},
    url:
      'https://techcrunch.com/2018/09/05/googles-launchpad-studio-accelerator-welcomes-a-cohort-of-blockchain-and-finance-startups/',
  },
]
export default withNamespaces('home')(Press)
