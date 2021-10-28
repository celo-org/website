import { css } from "@emotion/react"
import * as React from "react"
import { StyleSheet, Text, TextProps, View, ViewProps } from "react-native"
import Responsive from "src/shared/Responsive"
import { fonts, standardStyles } from "src/styles"
import { fonts as eFonts } from "src/estyles"
interface Props {
  style?: any
  children?: any
  tabIndex?: number
  id?: string
  ariaLevel?: "1" | "2" | "3" | "4" | "5"
  accessibilityRole?: "button" | "label" | "link" | "heading" | "listitem"
}

interface TableProps {
  className?: string
  children?: React.ReactNode
}

export const TABLE = ({ className, children }: TableProps) => {
  return (
    <table className={className} css={TextStyles.table}>
      {children}
    </table>
  )
}

export const TR = ({ className, children }: TableProps) => {
  return (
    <tr className={className} css={TextStyles.tr}>
      {children}
    </tr>
  )
}

export const TH = ({ className, children }: TableProps) => {
  return (
    <th className={className} css={TextStyles.th}>
      {children}
    </th>
  )
}

export const TD = ({ className, children }: TableProps) => {
  return (
    <td className={className} css={TextStyles.td}>
      {children}
    </td>
  )
}

const TextStyles = {
  table: css({
    marginTop: 4,
    marginBottom: 4,
    borderWidth: 2,
    borderColor: "#eee",
  }),
  tr: css({
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    flexBasis: "auto",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  }),
  th: css(eFonts.legal, {
    fontWeight: 600,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    backgroundColor: "#eee",
  }),
  td: css(eFonts.legal, {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  }),
}

export const H1 = ({ style, children, tabIndex, accessibilityRole, id, ariaLevel }: Props) => {
  return (
    <Responsive large={[styles.reset, fonts.h1, style]}>
      <Text
        aria-level={ariaLevel || "1"}
        id={id}
        tabIndex={tabIndex}
        accessibilityRole={accessibilityRole || "heading"}
        style={[styles.reset, fonts.h1Mobile, style]}
      >
        {children}
      </Text>
    </Responsive>
  )
}

export const H2 = ({ style, children, tabIndex, accessibilityRole, id }: Props) => {
  return (
    <Responsive large={[styles.reset, fonts.h2, style]}>
      <Text
        id={id}
        accessibilityRole={accessibilityRole || "heading"}
        tabIndex={tabIndex}
        aria-level="2"
        style={[styles.reset, fonts.h2Mobile, style]}
      >
        {children}
      </Text>
    </Responsive>
  )
}

export const H3 = ({ style, children, tabIndex, accessibilityRole, id }: Props) => {
  return (
    <Responsive large={[styles.reset, fonts.h3, style]}>
      <Text
        id={id}
        tabIndex={tabIndex}
        accessibilityRole={accessibilityRole || "heading"}
        aria-level="3"
        style={[styles.reset, fonts.h3Mobile, style]}
      >
        {children}
      </Text>
    </Responsive>
  )
}

export const H4 = ({ style, children, tabIndex, accessibilityRole, id }: Props) => {
  return (
    <Responsive large={[styles.reset, fonts.h4, style]}>
      <Text
        id={id}
        tabIndex={tabIndex}
        accessibilityRole={accessibilityRole || "heading"}
        aria-level="4"
        style={[styles.reset, fonts.h4Mobile, style]}
      >
        {children}
      </Text>
    </Responsive>
  )
}

export enum ListType {
  numeric,
  alpha,
  bullet,
}

interface ViewChildren {
  children: React.ReactNode
}
interface TextChildren {
  children: React.ReactNode | string
  listStyle?: ListType
}

export function Ul(props: TextProps & ViewChildren) {
  return (
    <View style={[styles.ul, StyleSheet.flatten(props.style)]} accessibilityRole={"list"}>
      {props.children}
    </View>
  )
}

export function Ol(props: ViewProps & ViewChildren) {
  return (
    <View style={[styles.ol, StyleSheet.flatten(props.style)]} accessibilityRole={"list"}>
      {props.children}
    </View>
  )
}

function listType(listStyle: ListType) {
  switch (listStyle) {
    case ListType.numeric:
      return styles.numeric
    case ListType.alpha:
      return styles.alpha
    default:
      return styles.initial
  }
}

export function Li(props: TextProps & TextChildren) {
  const style = StyleSheet.flatten([
    fonts.p,
    standardStyles.elementalMarginBottom,
    listType(props.listStyle),
    props.style,
  ])
  return (
    <Text
      // @ts-ignore
      style={style}
      accessibilityRole={"listitem"}
    >
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  reset: {
    textTransform: "none",
  },
  alpha: {
    listStyle: "lower-alpha",
    display: "list-item",
  },
  numeric: {
    listStyle: "decimal",
    display: "list-item",
  },
  bullet: {
    listStyle: "disc",
    display: "list-item",
  },
  initial: {
    listStyle: "inherit",
    display: "list-item",
  },
  ul: {
    marginTop: 20,
    paddingLeft: 20,
    listStyle: "disc",
  },
  ol: {
    marginTop: 20,
    paddingLeft: 20,
    listStyle: "decimal",
  },
})
