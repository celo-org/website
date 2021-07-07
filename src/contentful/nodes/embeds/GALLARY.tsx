import * as React from "react"
import dynamic from "next/dynamic"
import { Entry } from "contentful"
const LogoGallary = dynamic(import("src/contentful/LogoGallary"))

type Props = Entry<{
  list: any[]
  cssStyle?: any
}>

export const GALLARY = {
  logoGallery: ({ fields, sys }: Props) => <LogoGallary key={sys?.id} list={fields.list} cssStyle={fields?.cssStyle} />,
}
