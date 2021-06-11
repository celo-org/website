import { GetServerSideProps } from "next"
import { Props } from "src/experience/contentful/ContentfulKit"
import { getKit, getPageById, SectionType } from "src/utils/contentful"
import makeSafeForJson from "src/utils/makeSafeForJson"

const getServerSideProps: GetServerSideProps<
  Props | Record<string, any>,
  { kit: string; kitPage: string }
> = async function getServerSideProp({ params, query, req, resolvedUrl }) {
  try {
    const locale = query.locale || "en-US"

    if (!params?.kit) {
      return {
        notFound: true,
      }
    }

    const kit = await getKit(params.kit, params.kitPage, { locale })

    if (!kit.pageID) {
      return {
        props: {},
        redirect: {
          destination: `/experience/${params.kit}`,
        },
      }
    }

    const page = await getPageById<SectionType>(kit.pageID, { locale })
    const questionMark = resolvedUrl.indexOf("?")
    const newUrl = resolvedUrl.substring(0, questionMark)

    const sidebar = kit.sidebar.map((entry) => {
      if (entry.href === newUrl || entry.href === req.url) {
        return {
          ...makeSafeForJson(entry),
          sections: page.sections.map((section) => ({
            title: section.name || null,
            href: `${entry.href}#${section.slug}`,
          })),
        }
      }
      return entry || null
    })
    return {
      props: {
        ...(await serverSideTranslations("en", [NameSpaces.common])),
        ...makeSafeForJson(kit),
        ...makeSafeForJson(page),
        sections: page.sections as SectionType[],
        ogImage: kit.ogImage?.fields?.file?.url || "",
        sidebar,
        path: `${params.kit}${params.kitPage ? "/" + params.kitPage : ""}`,
      },
    }
  } catch (error) {
    console.error("error", error, "kit and page:", params.kit, params.kitPage)
    return {
      notFound: true,
    }
  }
}

export default getServerSideProps
