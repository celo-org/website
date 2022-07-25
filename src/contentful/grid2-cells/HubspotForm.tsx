import Script from "next/script"
import { HubFormFieldsType } from "src/utils/contentful"

export default function HubspotForm({ hubspotFormId }: HubFormFieldsType) {
  const target = `form-${hubspotFormId}`

  return (
    <>
      <Script
        async={true}
        src={"//js.hsforms.net/forms/v2.js"}
        onLoad={() => {
          // @ts-expect-error
          window.hbspt?.forms?.create({
            region: "na1",
            portalId: "8568019",
            formId: hubspotFormId,
            target: `#${target}`,
          })
        }}
      />
      <span id={target} />
    </>
  )
}
