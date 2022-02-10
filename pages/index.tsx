import Home, { Props } from "src/home/Home"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { Props as HomeCoverProps } from "src/home/Cover"
import { getPageBySlug, GridRowContentType } from "src/utils/contentful"
import { Entry } from "contentful"
import { LogoGallery } from "src/utils/contentful"
import { GetServerSideProps } from "next"
import { i18nLocaleToContentfulLocale } from "server/i18nSetup"

export const getServerSideProps: GetServerSideProps<Props> = async function getServerSideProps({
  locale,
}) {
  const page = await getPageBySlug("home2", { locale: i18nLocaleToContentfulLocale(locale) }, true)

  if (!page) {
    return { notFound: true }
  }

  const sections = page.sections as Entry<GridRowContentType | HomeCoverProps | LogoGallery>[]

  return {
    props: {
      ...(await serverSideTranslations(locale || "en", [NameSpaces.common, NameSpaces.home])),
      ...page,
      sections,
    },
  }
}

export default Home
