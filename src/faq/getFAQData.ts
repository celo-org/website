import { GetServerSideProps } from "next"
import { Props } from "src/faq/FAQ"
import { getFAQ } from "src/utils/contentful"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

const getServerSideProps: GetServerSideProps<Props> = async function getServerSideProp({ locale }) {
  const lang = locale === "en" ? "en-US" : locale
  const faqs = await getFAQ({ locale: lang })
  return {
    props: {
      ...(await serverSideTranslations(locale, [NameSpaces.common, "faq"])),
      title: faqs.fields.title,
      list: faqs.fields.list.map((item) => {
        return {
          question: item.fields.question,
          answer: item.fields.answer,
          id: item.sys.id,
        }
      }),
      id: faqs.sys.id,
      updatedAt: faqs.sys.updatedAt,
    },
  }
}

export default getServerSideProps
