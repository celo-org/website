import CommonPage from "src/public-sector/CommonContentFullPage"
import { getPageBySlug } from "src/utils/contentful"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { GetServerSideProps } from "next"
import connectBackground from "src/illustrations/connect22.jpg"
import { css } from "@emotion/react"

export default (props) => <CommonPage {...props} css={rootCss} className={"Test"} />

export const getServerSideProps: GetServerSideProps = async function getServerSideProps({
  locale,
}) {
  const page = await getPageBySlug("connect2022" as string, { locale: "en-US" }, true)

  if (!page) {
    return { notFound: true }
  }

  return {
    props: {
      ...page,
      ...(await serverSideTranslations(locale, [NameSpaces.common])),
    },
  }
}

const rootCss = css({
  backgroundImage: `url(${connectBackground.src})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  minHeight: "100vh",
})
