import Home, {Props} from "src/home/Home"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { getPageBySlug, GridRowContentType } from "src/utils/contentful"
import { Entry } from "contentful"
import { CoverContentType, LogoGallery } from "src/utils/contentful"
import { GetServerSideProps } from "next"


export const getServerSideProps: GetServerSideProps<Props> = async function getServerSideProps() {
  const page = await getPageBySlug("home", { locale: "en-US" }, true)

  if (!page) {
    return { notFound: true }
  }

  const sections = page.sections as Entry<GridRowContentType | CoverContentType | LogoGallery>[]
  const cover = sections.find(finder("cover")) as Entry<CoverContentType>
  const press = sections.find(finder("logoGallery")) as Entry<LogoGallery>
  const filtered = sections.filter(finder("grid-row")) as Entry<GridRowContentType>[]

  return {
    props: {
      ...(await serverSideTranslations("en", [NameSpaces.common, NameSpaces.home])),
      ...page,
      cover: cover?.fields,
      press: press?.fields,
      sections: filtered,
    },
  }
}

const finder = (key) => (section) => section.sys.contentType.sys.id === key

export default Home
