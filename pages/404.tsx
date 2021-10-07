import Error from "pages/_error"
import { NameSpaces } from "src/i18n"
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [NameSpaces.common])),
    },
  }
}

export default Error
