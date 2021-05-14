// import { css } from '@emotion/react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { getPageBySlug } from 'src/utils/contentful'
import { Document } from '@contentful/rich-text-types'
import { renderNode } from '../src/contentful/nodes/nodes'


interface Props {
    title: string
    slug: string
    description: string
    body: Document
}

export default function SavingsTC(props: Props){
    return(
        <div>
           {documentToReactComponents(props.body, renderNode)}
        </div>
    )

}




export async function getServerSideProps(){
    const page = await getPageBySlug("save-terms-and-conditions", {locale: 'en-US'}, true)
    return {props: page}
}
