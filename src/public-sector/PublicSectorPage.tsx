
import OpenGraph from 'src/header/OpenGraph'
import {css} from "@emotion/react"
import { getPageBySlug } from 'src/utils/contentful'

export default function PublicSectorPage() {
  return <>
      <OpenGraph />
      <div css={rootCss}>

      </div>
  </>
}

const rootCss = css({})


export async function getServerSideProps() {
  // TODO make many language
  const page = await getPageBySlug("public-sector", {locale: 'en'})
  page.sections
}
