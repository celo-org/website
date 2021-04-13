import * as React from 'react'
import dynamic from "next/dynamic"
const LogoGallary = dynamic(import("src/contentful/LogoGallary"))

export const GALLARY = {
  "logoGallery": ({ fields, sys }) => <LogoGallary
    key={sys?.id}
    list={(fields.list)} />
}
