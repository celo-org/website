import Page from 'src/plumo/Landing'
import { getPageBySlug } from 'src/utils/contentful'

export default Page


export async function getServerSideProps() {
  const page = await getPageBySlug("plumo", {locale: 'en-US'}, true)
  return {props: page }
}
