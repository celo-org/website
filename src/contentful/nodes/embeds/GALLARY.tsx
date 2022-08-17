import * as React from "react"
import dynamic from "next/dynamic"
import { Entry } from "contentful"
import { LogoGallery } from "src/utils/contentful"
const OldGallery = dynamic(import("src/contentful/LogoGallary"))
const PillGallery = dynamic(import("src/home/PillGallary"))
type Props = Entry<{
  list: any[]
  cssStyle?: any
}>

export const GALLARY = {
  logoGallery: ({ fields, sys }: Props) => {
    const gallery = fields as LogoGallery
    if (
      gallery.formation === "ThreeByFour" ||
      gallery.formation === "TwoFourTwoRepeat" ||
      gallery.formation === "FourByThreeByFour"
    ) {
      return <PillGallery formation={gallery.formation} list={gallery.list} key={sys.id} />
    }
    return <OldGallery cssStyle={gallery.cssStyle} list={gallery.list} key={sys.id} />
  },
}
