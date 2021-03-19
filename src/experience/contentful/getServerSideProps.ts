import { GetServerSideProps } from 'next'
import { Props } from 'src/experience/contentful/ContentfulKit'
import { getKit, getPageById, SectionType } from 'src/utils/contentful'

const getServerSideProps: GetServerSideProps<
  Props,
  { kit: string; kitPage: string }
> = async function getServerSideProp({ params, query, req, resolvedUrl }) {
  const locale = query.locale || 'en-US'
  const kit = await getKit(params.kit, params.kitPage, { locale })
  const page = await getPageById<SectionType>(kit.pageID, { locale })
  const questionMark = resolvedUrl.indexOf('?');
  const newUrl = resolvedUrl.substring(0, questionMark)


  const sidebar = kit.sidebar.map((entry) => {
    if (entry.href === newUrl || entry.href === req.url) {

      return {
        ...entry,
        sections: page.sections.map((section) => ({
          title: section.name,
          href: `${entry.href}#${section.slug}`,
        })),
      }
    }
    return entry
  })
  return {
    props: {
      ...kit,
      ...page,
      sections: page.sections as SectionType[],
      ogImage: kit.ogImage.fields.file.url,
      sidebar,
      path: `${params.kit}${params.kitPage ? '/' + params.kitPage : ''}`,
    },
  }
}

export default getServerSideProps
