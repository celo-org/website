

import {css} from "@emotion/react"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import { Entry } from 'contentful'
import { getPageBySlug, ContentfulPage, GridRowContentType } from 'src/utils/contentful'
import { flex } from 'src/estyles'
import { GridRow, Cell } from 'src/layout/Grid2'
import OpenGraph from 'src/header/OpenGraph'
import nodeOptions from "src/utils/contentfulNodes"
import ValueProp, {Props as ValueProps} from "./ValueProp"

type Props = ContentfulPage

export default function PublicSectorPage(props: Props) {
  return <>
      <OpenGraph title={props.title} description={props.description}  path={props.slug}/>
      <div css={rootCss}>
          {props.sections.map(section => {
            if (section.sys.contentType.sys.id === 'grid-row') {
              const fields = section.fields as GridRowContentType
              return (
                <GridRow key={section.sys.id} id={fields.id} css={css(fields.cssStyle)}>
                  {fields.cells.map(cell => (
                    <Cell key={cell.sys.id} span={cell.fields.span} tabletSpan={cell.fields.tabletSpan} css={css(cell.fields.cssStyle)} >
                      {cellSwitch(cell.fields.textBody, cell.fields.body)}
                    </Cell>
                  ))}
                </GridRow>
              )
            }
          })}
      </div>
  </>
}

const rootCss = css(flex, {
  marginTop: 100
})

function cellSwitch(textBody: Document | undefined, body: Entry<any>) {
  if (body) {
    switch (body.sys.contentType.sys.id) {
      case  "proposition":
        const valueProp = body.fields as ValueProps
        return <ValueProp title={valueProp.title}
                        titleType={valueProp.titleType}
                        description={valueProp.description}
                        link={valueProp.link}
                        icon={valueProp.icon}
                        />
    }
  }

  if (textBody) {
    return documentToReactComponents(textBody, nodeOptions)
  }

  return null
}


export async function getServerSideProps() {
  // TODO make any language
  const page = await getPageBySlug("public-sector", {locale: 'en-US'}, true)
  return {props: page }
}
