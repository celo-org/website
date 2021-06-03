import * as React from 'react'
import OpenGraph from 'src/header/OpenGraph'
import {  useTranslation } from "src/i18n"
import {css} from "@emotion/react"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ContentfulPage, GridRowContentType, SectionType } from 'src/utils/contentful'
import { flex, flexRow, WHEN_MOBILE, whiteText, fonts } from 'src/estyles'
import { GridRow } from 'src/layout/Grid2'
import {renderWhiteParagraph} from 'src/contentful/nodes/paragraph'
import { cellSwitch } from "src/public-sector/cellSwitch"
import { colors } from 'src/styles'
import gradientFeathers from 'src/plumo/color-feathers.svg'
import Button, {BTN, SIZE} from 'src/shared/Button.3'
import LogoDarkBg from 'src/logos/LogoDarkBg'
import Footer from 'src/shared/Footer'
import Link2 from 'src/shared/Link'
import Rounds from './Rounds'
import Safety from "./Safety"

type Props = ContentfulPage<GridRowContentType | SectionType>
const PLUMO_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScZswraVVC91RwToo_9qm-1QzGrxp7yjVeM2wzdTbL5T_lAgQ/viewform"

// const MEDIUM_POST = 'https://medium.com/celoorg/the-plumo-ceremony-ac7649e9c8d8'

export default function PlumoLanding(props: Props) {
  const { t } = useTranslation('plumo')

  return (
    <>
      <OpenGraph
        image={props.openGraph?.fields?.file?.url}
        title={props.title}
        description={props.description}
        path="/plumo"
      />
      <nav css={navBar}>
        <Link2 href="/">
          <LogoDarkBg height={30} />
        </Link2>
        <div css={innerNav}>
          <Button
            size={SIZE.small}
            href={PLUMO_FORM}
            text={t("navSignup")}
            kind={BTN.PRIMARY}
            target="_blank"
          />
        </div>
      </nav>
      <div css={rootCss}>
        <GridRow columns={1} css={coverCss}>
          <header css={logoCss}>
            <img src={gradientFeathers} width={72} height={72} />
            <h1 css={titleCss}>{props.title}</h1>
          </header>
        </GridRow>
        <Safety>
          <Rounds />
        </Safety>
        {props.sections?.map((section) => {
          if (section.sys.contentType.sys.id === "grid-row") {
            const fields = section.fields as GridRowContentType
            return (
              <GridRow
                key={section.sys.id}
                id={fields.id}
                columns={fields.columns}
                css={css(fields.cssStyle)}
              >
                {fields.cells.map((cell) => cellSwitch(cell, fields.darkMode))}
              </GridRow>
            )
          } else {
            const fields = section.fields as SectionType

            return (
              <GridRow key={section.sys.id} id={fields.slug} columns={1}>
                {documentToReactComponents(fields.contentField, {
                  renderNode: renderWhiteParagraph,
                })}
              </GridRow>
            )
          }
        })}
        <Footer darkMode={true} hideForm={true} />
      </div>
    </>
  )
}

const rootCss = css(flex, {
  paddingTop: 50,
  backgroundColor: colors.dark,
  minHeight: "100vh"
})

const coverCss = css({
  paddingTop: 36,
  textAlign: "center",
  justifyContent: "center",
  justifyItems: "center",
  alignItems: "center",
})

const logoCss = css(flexRow,{
  columnGap: "8px",
  [WHEN_MOBILE]: {
    flexDirection: "column",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
  }
})

const titleCss = css(fonts.h1, whiteText)

const navBar = css(flexRow,{
  top: 0,
  left: 0,
  right: 0,
  position: 'fixed',
  width: '100%',
  height: 70,
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: 24,
  paddingRight: 40,
  backgroundColor: 'rgba(46, 51, 56, 0.95)',
  backdropFilter: 'blur(5px)',
  zIndex: 100,
  [WHEN_MOBILE]: {
    paddingLeft: 16,
    paddingRight: 16,
  }
})

const innerNav = css({
  display: "grid",
  columnGap: "16px",
  gridAutoColumns: "100px",
  gridTemplateColumns: "repeat(2, max-content)",
  alignItems: "center",
  [WHEN_MOBILE]: {
    paddingLeft: 12
  }
})