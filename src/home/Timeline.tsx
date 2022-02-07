import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { css } from "@emotion/react"
import { colors } from "src/colors"
import { garamond, jost, WHEN_MOBILE, WHEN_TABLET } from "src/estyles"
import Button, { SIZE } from "src/shared/Button.3"
import { RoledexContentType } from "src/utils/contentful"
import OvalCoin from "src/shared/OvalCoin"
import { renderNode } from "src/contentful/nodes/nodes"
export default function Timeline(props: RoledexContentType) {
  return (
    <div css={rootCss}>
      {props.sheets.map((event) => {
        return (
          <div css={eventCSS} key={event.sys.id}>
            <div css={contentsCss}>
              <h5 css={titleCss}>
                <span css={marker}>
                  {" "}
                  <OvalCoin size={9} />{" "}
                </span>
                {event.fields.title}
              </h5>
              <h6 css={headingCss}>{event.fields.heading}</h6>
              {documentToReactComponents(event.fields.body, { renderNode })}
            </div>
            {event.fields.buttons.map((button) => (
              <Button
                key={button.sys.id}
                size={SIZE.normal}
                kind={button.fields.kind}
                text={button.fields.words}
                href={button.fields.assetLink?.fields?.file?.url || button.fields.href}
              />
            ))}
          </div>
        )
      })}
      <span css={fog} />
    </div>
  )
}

const marker = css({
  position: "absolute",
  transform: "translateX(-33px) translateY(-2px)",
  [WHEN_MOBILE]: {
    transform: "translateX(-21px) translateY(-2px)",
  },
})

const fog = css({
  display: "block",
  background: `linear-gradient(0deg, rgba(255,255,255,1) 34%, rgba(255,255,255,0) 100%)`,
  position: "absolute",
  width: 5,
  height: 120,
  bottom: 0,
  left: 0,
  transform: "translateX(-5px)",
})

const rootCss = css({
  position: "relative",
  marginTop: 24,
  marginLeft: 30,
  paddingLeft: 28,
  borderLeft: ` 1px solid ${colors.primary}`,
  [WHEN_TABLET]: {
    marginLeft: 6,
  },
  [WHEN_MOBILE]: {
    marginLeft: 0,
    paddingLeft: 16,
  },
})

const eventCSS = css({
  marginBottom: 48,
  transform: "translateY(-5px)",
  maxWidth: 370,
  [WHEN_MOBILE]: {
    maxWidth: 324,
  },
})

const contentsCss = css({
  marginBottom: 16,
})

const titleCss = css(jost, {
  fontSize: 18,
  lineHeight: 1.1,
  fontWeight: 600,
  margin: 0,
})

const headingCss = css(garamond, {
  fontSize: 20,
  fontWeight: 600,
  lineHeight: "28px",
  margin: 0,
})
