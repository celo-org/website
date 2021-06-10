import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { css } from "@emotion/react"
import * as React from "react"
import Button, { SIZE } from "src/shared/Button.3"
import { fonts, WHEN_MOBILE } from "src/estyles"
import { RoledexContentType } from "src/utils/contentful"
import { SubNavLink } from "src/experience/common/SubNavLink"
import { colors } from "src/styles"
import { renderNode } from "src/contentful/nodes/nodes"
import { useScreenSize } from "src/layout/ScreenSize"
import DropDownGroup from "src/shared/DropDownGroup"

const DURATION = 200

function useSheet(): [number, (i: number) => void, boolean] {
  const [isInTransition, setTransition] = React.useState(false)
  const [index, setIndex] = React.useState(0)

  function setCurrent(n: number) {
    setTransition(true)
    setTimeout(() => {
      setIndex(n)
      setTransition(false)
    }, DURATION)
  }

  return [index, setCurrent, isInTransition]
}

export default function Roledex(props: RoledexContentType) {
  const [index, setCurrent, isInTransition] = useSheet()
  const sheet = props.sheets[index]
  const { isMobile } = useScreenSize()

  return (
    <>
      <span css={sectionTitle}>{props.title}</span>
      {isMobile ? (
        <DropDownGroup
          data={[
            {
              name: "Choose",
              list: props.sheets.map(({ fields }, id) => ({
                id: id.toString(),
                selected: id === index,
                label: fields.title,
              })),
              onSelect: (i) => setCurrent(Number(i)),
              onClear: () => null,
            },
          ]}
        />
      ) : (
        <div css={navCss} role="combobox">
          {props.sheets.map(({ sys, fields }, i) => (
            <SelectOption
              onPress={setCurrent}
              id={i}
              key={sys.id}
              title={fields.title}
              active={!isInTransition && index === i}
            />
          ))}
        </div>
      )}
      <div css={css(contentAreaCss, isInTransition && transitionCss)}>
        <h3 css={headingCss}>{sheet.fields.heading}</h3>
        {documentToReactComponents(sheet.fields.body, { renderNode })}
        <div css={linksAreaCss} role={"listbox"}>
          {sheet.fields.buttons?.map(({ fields, sys }) => {
            return (
              <Button
                key={sys.id}
                size={SIZE.normal}
                kind={fields.kind}
                text={fields.words}
                href={fields.assetLink?.fields?.file?.url || fields.href}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

interface OptionProps {
  onPress: (id: number) => void
  id: number
  title: string
  active: boolean
}

function SelectOption({ onPress, id, title, active }: OptionProps) {
  const setCurrent = React.useCallback(() => {
    onPress(id)
  }, [id, onPress])

  return (
    <SubNavLink
      onPress={setCurrent}
      title={title}
      color={colors.primary}
      active={active}
      accessibilityRole="option"
    />
  )
}

const sharedCSS = css({
  marginTop: 48,
})

const sectionTitle = css(fonts.h4, sharedCSS, {
  gridColumn: "span 3",
})

const navCss = css(sharedCSS, {})

const headingCss = css(fonts.h3, {
  marginBottom: 16,
})

const contentAreaCss = css(sharedCSS, {
  gridColumn: "span 2",
  maxWidth: 550,
  minHeight: 250,
  transitionDuration: `${DURATION}ms`,
  transitionProperty: "opacity",
  [WHEN_MOBILE]: {
    marginTop: 32,
  },
})

const transitionCss = css({
  opacity: 0,
  transitionTimingFunction: "ease-in-out",
})

const linksAreaCss = css({
  marginTop: 32,
  display: "grid",
  rowGap: 16,
  a: {
    textAlign: "left",
  },
})
