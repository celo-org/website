// import { css } from '@emotion/react'
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { getPageBySlug, SectionType } from 'src/utils/contentful'
import { Document } from '@contentful/rich-text-types'
// import { Entry } from 'contentful'
import OpenGraph from 'src/header/OpenGraph'



interface Props {
    title: string
    slug: string
    body: Document
    section: SectionType
    description: string
    updateAT: string
}

export default function SavingsTerms(props: Props){
    return(
        <div>
            <OpenGraph title={props.title} description={props.description} path={props.slug} />
        </div>
    )

}




export async function getServerSideProps(){
    const page = await getPageBySlug("save-terms-and-conditions", {locale: 'en-US'}, false)
    return {props: page}
}
