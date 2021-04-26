import { GetServerSideProps } from 'next'
import { Props } from 'src/experience/contentful/ContentfulKit'
import { getKit, getPageById, SectionType } from 'src/utils/contentful'

const getServerSideProps: GetServerSideProps<
  Props | {},
  { kit: string; kitPage: string }
> = async function getServerSideProp({ params, query, req, resolvedUrl }) {
  try {
  const locale = query.locale || 'en-US'
  const kit = await getKit(params.kit, params.kitPage, { locale })

  if (!kit.pageID) {
    return {
      props: {},
      redirect: {
        destination: `/experience/${params.kit}`,
      }
    }
  }

  const page = await getPageById<SectionType>(kit.pageID, { locale })
  const questionMark = resolvedUrl.indexOf('?');
  const newUrl = resolvedUrl.substring(0, questionMark)

  const sidebar = kit.sidebar.map((entry) => {
    if (entry.href === newUrl || entry.href === req.url) {

      return {
        ...nullify(entry),
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
      ...nullify(kit),
      ...nullify(page),
      sections: page.sections as SectionType[],
      ogImage: kit.ogImage?.fields?.file?.url ||'',
      sidebar,
      path: `${params.kit}${params.kitPage ? '/' + params.kitPage : ''}`,
    },
  }

  } catch (error) {
    console.error("error", error, "kit and page:",params.kit, params.kitPage)
  }
}

function nullify(obj: any) {
  if (typeof obj === 'object') {
    // iterating over the object using for..in
    for (const keys in obj) {
      // checking if the current value is an object itself
      if (typeof obj[keys] === 'object') {
        // if so then again calling the same function
        nullify(obj[keys])
      } else {
        // else getting the value and replacing single { with {{ and so on
        const keyValue = obj[keys]
        obj[keys] = keyValue === undefined ? null : keyValue;
      }
    }
  }
  return obj;
}

export default getServerSideProps
