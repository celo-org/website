import Alliance from "src/alliance/Main"
import { GetServerSidePropsContext } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [NameSpaces.common, NameSpaces.alliance])),
    },
  }
}

export default Alliance
