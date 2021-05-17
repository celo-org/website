// import { css } from '@emotion/react'
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { getPageBySlug, SectionType } from 'src/utils/contentful'
import { Document } from '@contentful/rich-text-types'
// import { Entry } from 'contentful'
// import { renderNode } from '../src/contentful/nodes/nodes'
// import OpenGraph from 'src/header/OpenGraph'



interface Props {
    title: string
    slug: string
    description: string
    body: Document
    section: SectionType
}

export default function SavingsTerms(props: Props){
    return(
        <div>
            {/* <OpenGraph /> */}
        </div>
    )

}




export async function getServerSideProps(){
    const page = await getPageBySlug("save-terms-and-conditions", {locale: 'en-US'}, false)
    console.log(page)
    return {props: page}
}
