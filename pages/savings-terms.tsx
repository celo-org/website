import { css } from '@emotion/react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { getPageBySlug, SectionType } from 'src/utils/contentful'
import OpenGraph from 'src/header/OpenGraph'
import { OPTIONS } from 'src/contentful/grid2-cells/FreeContent'
import { GridRow } from 'src/layout/Grid2'





interface Props {
    title: string
    slug: string
    sections: SectionType[]
    description: string
}

export default function SavingsTerms(props: Props){
    
    return(
        <>
            <OpenGraph title={props.title} description={props.description} path={props.slug} />
            <GridRow columns={1} css={rootCss}>
                <div css={sectionsCss}>
                {
                props.sections.map((section) => {
                    return(
                        documentToReactComponents(section.contentField, OPTIONS)
                        )
                    })
                }
                </div>
            </GridRow>

        </>
    )

}




export async function getServerSideProps() : Promise<{ props: Props }> {
    const page = await getPageBySlug("save-terms-and-conditions", {locale: 'en-US'}, false)
    const sections = page.sections as SectionType[]
    return {props: {
        ...page,
        sections: sections,
    }}
}

const rootCss = css({
    marginTop: 70,
    alignContent: 'center'
})

const sectionsCss = css({
    maxWidth: '50em',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center'
})
