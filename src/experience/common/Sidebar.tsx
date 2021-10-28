import * as React from "react"
import { HEADER_HEIGHT } from "src/shared/Styles"
import { colors } from "src/colors"
import { SubNavLink } from "./SubNavLink"
import { css } from "@emotion/react"
import { WHEN_MOBILE, WHEN_TABLET_AND_UP } from "src/estyles"

export interface Section {
  title: string
  href: string
}

export interface Page {
  title: string
  href: string
  sections: Section[]
}

interface Props {
  pages: Page[]
  currentPathName: string
  routeHash: string
  onChangeRoute?: () => void
}

export default React.memo<Props>(function Sidebar({
  pages,
  currentPathName,
  routeHash,
  onChangeRoute,
}: Props) {
  return (
    <div css={containerCss} id="sidebar">
      {pages.map((page) => {
        return (
          <React.Fragment key={page.href}>
            <SubNavLink
              onPress={onChangeRoute}
              key={page.title}
              kind={Kind.page}
              href={page.href}
              title={page.title}
              active={isActive(page.href, currentPathName)}
            />
            {!!page.sections.length && (
              <SectionNav
                sections={page.sections}
                active={isActive(page.href, currentPathName)}
                routeHash={routeHash}
                onChangeRoute={onChangeRoute}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
})

const SectionNav = React.memo(function SectionNav_({
  sections,
  active,
  routeHash,
  onChangeRoute,
}: {
  onChangeRoute?: () => void
  sections: Section[]
  active: boolean
  routeHash: string
}) {
  return (
    <div css={[sectionCss, active && activeSectionCss]}>
      {active &&
        sections.map((section) => {
          return (
            <SubNavLink
              onPress={onChangeRoute}
              key={section.title}
              color={color(Kind.section)}
              href={section.href}
              title={section.title}
              active={isActiveSection(section.href, routeHash)}
            />
          )
        })}
    </div>
  )
})

export enum Kind {
  page,
  section,
}

function color(kind: Kind) {
  return kind === Kind.page ? colors.primary : colors.gold
}

function isActive(path: string, currentPath: string) {
  if (!currentPath) {
    return false
  }
  const hashIndex = currentPath.indexOf("#")
  const pathSansHash = hashIndex !== -1 ? currentPath.substring(0, hashIndex) : currentPath
  return path === pathSansHash
}

function isActiveSection(path: string, routeHash: string) {
  return routeHash.length ? path?.endsWith(routeHash) : path?.endsWith("overview")
}

const containerCss = css({
  [WHEN_TABLET_AND_UP]: {
    position: "sticky",
    top: HEADER_HEIGHT + 100,
    height: "fit-content",
  },
  [WHEN_MOBILE]: {
    width: "100%",
    zIndex: 10,
  },
})

const sectionCss = css({
  transformOrigin: "top",
  transform: "scaleY(0)",
  marginLeft: 20,
  transitionProperty: "transform,",
  transitionDuration: "500ms",
})
const activeSectionCss = css({
  transform: "scaleY(1)",
})
