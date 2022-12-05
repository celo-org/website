import * as React from "react"
import Chevron from "src/icons/chevron"
import Link from "src/shared/Link"
import { flex, fonts, textStyles, WHEN_MOBILE } from "src/estyles"
import { colors } from "src/colors"
import { css, SerializedStyles } from "@emotion/react"
import { NextRouter } from "next/router"
import { useState } from "react"

export enum BTN {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  TERTIARY = "TERTIARY",
  NAKED = "NAKED",
  DARKNAKED = "DARKNAKED",
  NAV = "NAV",
  DARKNAV = "DARKNAV",
  INLINE = "INLINE",
}
export enum SIZE {
  small = "small",
  normal = "normal",
  big = "big",
  fullWidth = "fullWidth",
}

interface AllButtonProps {
  text: string
  href?: string
  target?: string // only relevent if href used
  disabled?: boolean
  accessibilityRole?: "button" | "link" | "option"
  onPress?: () => void
  iconRight?: React.ReactNode
  iconLeft?: React.ReactNode
  align?: "center" | "flex-start" | "flex-end"
  cssStyle?: SerializedStyles
}

type NakedProps = {
  size: SIZE
  kind: BTN.NAKED | BTN.DARKNAKED
} & AllButtonProps

export type PrimaryProps = {
  onDarkBackground?: boolean
  size?: SIZE
  kind: BTN.PRIMARY | BTN.SECONDARY | BTN.TERTIARY
} & AllButtonProps

type InlineProps = {
  kind: BTN.INLINE
} & AllButtonProps

type NavProps = {
  kind: BTN.NAV | BTN.DARKNAV
} & AllButtonProps

type ButtonsProps = NakedProps | PrimaryProps | InlineProps | NavProps

class Button extends React.PureComponent<ButtonsProps> {
  getStatus = () => {
    if (this.props.disabled) {
      return BTNStates.disabled
    }
    return BTNStates.normal
  }

  getButtonComponent() {
    switch (this.props.kind) {
      case BTN.PRIMARY:
        return ButtonPrimary
      case BTN.SECONDARY:
        return ButtonSecondary
      case BTN.TERTIARY:
        return ButtonTertiary
      case BTN.DARKNAKED:
      case BTN.NAKED:
        return ButtonNaked
      case BTN.DARKNAV:
      case BTN.NAV:
        return ButtonNav
      case BTN.INLINE:
        return ButtonInline
      default:
        return ButtonPrimary
    }
  }

  onPress = () => {
    if (this.props.disabled) {
      return // noop
    } else if (this.props.onPress) {
      this.props.onPress()
    }
  }

  render() {
    const { text, align, iconRight, iconLeft } = this.props
    const ButtonComponent = this.getButtonComponent()

    return (
      <div
        css={css(
          flex,
          { alignItems: align },
          this.props.kind === BTN.INLINE && inlineStyle.container
        )}
      >
        <ButtonComponent
          status={this.getStatus()}
          onPress={this.props.onPress ? this.onPress : null}
          {...this.props}
        >
          {iconLeft && <span css={baseStyles.iconLeft}>{iconLeft}</span>}
          {text}
          {iconRight && <span css={baseStyles.iconRight}>{iconRight}</span>}
        </ButtonComponent>
      </div>
    )
  }
}

interface ElementProps {
  status: BTNStates
  accessibilityRole: "link" | "button" | "option" | undefined
  className?: string
  href: string | undefined
  onPress: () => void | undefined
  target: string | undefined
  children: React.ReactNode
}

function ButtonOrLink(props: ElementProps) {
  if (props.href || props.accessibilityRole === "link") {
    return (
      <Link href={props.href} passHref={true}>
        <a className={props.className} {...getHrefAttrs(props.target)}>
          {props.children}
        </a>
      </Link>
    )
  } else if (props.accessibilityRole === "option") {
    return (
      <div
        role="option"
        dir="auto"
        onClick={props.onPress}
        aria-disabled={props.status === BTNStates.disabled}
        className={props.className}
      >
        {props.children}
      </div>
    )
  } else if (props.onPress || props.accessibilityRole === "button") {
    return (
      <button
        onClick={props.onPress}
        disabled={props.status === BTNStates.disabled}
        className={props.className}
      >
        {props.children}
      </button>
    )
  } else {
    return <span className={props.className}>{props.children}</span>
  }
}

enum BTNStates {
  normal = "normal",
  hover = "hover",
  press = "press",
  disabled = "disabled",
}

interface Props {
  status: BTNStates
  onPress?: () => void
  kind?: BTN
  children: React.ReactNode
  size?: SIZE
  cssStyle?: SerializedStyles
  href?: string
  target?: string
  onDarkBackground?: boolean
  accessibilityRole?: "button" | "link" | "option"
  router?: NextRouter
}

function ButtonPrimary(props: Props) {
  const { children, status, size, cssStyle, href, target, onDarkBackground } = props
  return (
    <ButtonOrLink
      onPress={props.onPress}
      accessibilityRole={props.accessibilityRole}
      status={status}
      href={href}
      target={target}
      css={[
        baseStyles.base,
        baseStyles.verticallyAlign,
        fonts.navigation,
        sizeStyle(size),
        primaryStyles[status],
        textStyles.medium,
        status === BTNStates.disabled && onDarkBackground
          ? primaryStyles.darkText
          : primaryStyles.text,
        cssStyle,
        status === BTNStates.disabled && baseStyles.notAllowed,
      ]}
    >
      {children}
    </ButtonOrLink>
  )
}

function ButtonSecondary(props: Props) {
  const { children, status, size, cssStyle, href, target } = props

  return (
    <div css={secondaryStyles[status]}>
      <ButtonOrLink
        onPress={props.onPress}
        accessibilityRole={props.accessibilityRole}
        status={status}
        href={href}
        target={target}
        css={[
          baseStyles.base,
          sizeStyle(size),
          baseStyles.verticallyAlign,
          fonts.navigation,
          sizeStyle(size),
          verticalSize(size),
          textStyles.medium,
          commonTextStyles[status],
          cssStyle,
        ]}
      >
        {children}
      </ButtonOrLink>
    </div>
  )
}

function ButtonTertiary(props: Props) {
  const { children, status, size, cssStyle, href, target } = props
  return (
    <ButtonOrLink
      onPress={props.onPress}
      accessibilityRole={props.accessibilityRole}
      status={status}
      href={href}
      target={target}
      css={[
        baseStyles.base,
        baseStyles.verticallyAlign,
        sizeStyle(size),
        baseStyles.floating,
        fonts.navigation,
        sizeStyle(size),
        textStyles.medium,
        commonTextStyles[status],
        cssStyle,
      ]}
    >
      {children}
    </ButtonOrLink>
  )
}

function nakedSize(size: SIZE) {
  switch (size) {
    case SIZE.big:
    case SIZE.fullWidth:
      return 20
    case SIZE.normal:
      return 16
    case SIZE.small:
      return 14
  }
}

function ButtonNaked(props: Props) {
  const { children, status, kind, cssStyle, href, size, target } = props
  const [chevronColor, setChevronColor] = useState(
    kind === BTN.DARKNAKED ? colors.black : colors.white
  )
  const textStyle = kind === BTN.DARKNAKED ? nakedDarkStyle[status] : commonTextStyles[status]
  const opacity = kind === BTN.DARKNAKED ? opacityState[status].opacity : 1
  const fontSize = nakedSize(size)
  return (
    <span css={[baseStyles.base, baseStyles.floating, nakedStyles.container]}>
      <ButtonOrLink
        onPress={props.onPress}
        accessibilityRole={props.accessibilityRole}
        status={status}
        href={href}
        target={target}
        css={[
          fonts.navigation,
          baseStyles.verticallyAlign,
          textStyle,
          { fontSize },
          textStyles.medium,
          cssStyle,
        ]}
      >
        {children}

        <span
          onMouseEnter={() => setChevronColor(colors.black)}
          onMouseLeave={() => setChevronColor(kind === BTN.DARKNAKED ? colors.black : colors.white)}
          onMouseDown={() => setChevronColor(kind === BTN.DARKNAKED ? colors.black : colors.white)}
          css={kind === BTN.DARKNAKED ? darkNakedStyles.chevron : nakedStyles.chevron}
        >
          <Chevron color={chevronColor} opacity={opacity} size={"0.75em"} />
        </span>
      </ButtonOrLink>
    </span>
  )
}
ButtonNaked.displayName = "ButtonNaked"

const nakedStyles = {
  container: css({
    flexDirection: "row",
    justifyContent: "center",
  }),
  chevron: css({
    marginLeft: 8,
    backgroundColor: colors.black,
    padding: "9.5px 9.5px 9.5px 13.5px",
    borderRadius: 60,
    "&:hover": {
      backgroundColor: colors.primaryYellow,
    },
    "&:active": {
      backgroundColor: colors.black,
    },
    [WHEN_MOBILE]: {
      padding: "6px 6px 6px 8px",
    },
  }),
}

const darkNakedStyles = {
  container: css({
    flexDirection: "row",
    justifyContent: "center",
  }),
  chevron: css({
    marginLeft: 8,
    backgroundColor: colors.white,
    padding: "9.5px 9.5px 9.5px 13.5px",
    borderRadius: 60,
    "&:active": {
      backgroundColor: colors.primaryYellow,
    },
    [WHEN_MOBILE]: {
      padding: "6px 6px 6px 8px",
    },
  }),
}

function getHrefAttrs(target: string) {
  if (target === "_blank") {
    return {
      rel: "noopener",
      target: "_blank",
    }
  } else {
    return { target }
  }
}

function ButtonNav(props: Props) {
  const { children, status, kind, cssStyle, href, target } = props
  const color = kind === BTN.DARKNAV ? colors.white : colors.dark
  return (
    <ButtonOrLink
      onPress={props.onPress}
      accessibilityRole={props.accessibilityRole}
      status={status}
      href={href}
      target={target}
      css={[
        baseStyles.base,
        baseStyles.verticallyAlign,
        baseStyles.floating,
        fonts.navigation,
        { color },
        opacityStyle[status],
        cssStyle,
      ]}
    >
      {children}
    </ButtonOrLink>
  )
}

function ButtonInline(props: Props) {
  const { children, status, cssStyle, href, target } = props
  return (
    <ButtonOrLink
      onPress={props.onPress}
      accessibilityRole={props.accessibilityRole}
      status={status}
      href={href}
      target={target}
      css={[inlineStyle.text, inlineStyle.container, opacityStyle[status], cssStyle]}
    >
      {children}
    </ButtonOrLink>
  )
}

const inlineStyle = {
  text: css({
    color: "inherit",
    cursor: "pointer",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  }),
  container: css({
    display: "inline",
  }),
}

const sizeStyle = (size: SIZE) => {
  if (size === SIZE.small) {
    return baseStyles.small
  } else if (size === SIZE.fullWidth) {
    return baseStyles.fullWidth
  } else if (size === SIZE.big) {
    return baseStyles.big
  }

  return baseStyles.standard
}

function verticalSize(size: SIZE) {
  return boxedVertical[size]
}

const borderRadius = 3
const borderWidth = 1

const primaryStyles = {
  normal: css({
    backgroundColor: colors.primaryYellow,
    border: "solid",
    borderColor: colors.transparentGray,
    borderRadius: 70,
    borderWidth,
    padding: "24px 64px",
    "&:hover, &:active": {
      backgroundColor: colors.black,
      borderColor: colors.transparentGray,
      borderRadius: 70,
      borderWidth,
      color: colors.white,
    },
    [WHEN_MOBILE]: {
      padding: "16px 24px",
    },
  }),

  disabled: css({
    backgroundImage: colors.disabledHatch,
    border: "solid",
    borderColor: colors.transparentGray,
    borderRadius: 70,
    borderWidth,
    padding: "24px 64px",
    [WHEN_MOBILE]: {
      padding: "16px 24px",
    },
  }),

  darkText: css({
    color: colors.dark,
  }),
  text: css({
    color: colors.black,
  }),
}

const secondaryStyles = {
  normal: css({
    backgroundColor: "transparent",
    borderColor: colors.gray,
    borderRadius,
    borderWidth,
    "&:hover": {
      backgroundColor: "transparent",
      borderColor: colors.primaryHover,
      borderRadius,
      borderWidth,
    },
    "&:active": css({
      backgroundColor: "transparent",
      borderColor: colors.primaryPress,
      outlineColor: colors.primaryPress,
      borderRadius,
      borderWidth,
    }),
  }),
  disabled: css({
    backgroundColor: "transparent",
    borderColor: colors.gray,
    cursor: "not-allowed",
    borderRadius,
    borderWidth,
  }),
}

const commonTextStyles = {
  normal: css({
    color: colors.black,
  }),
  disabled: css({
    color: colors.inactive,
    cursor: "not-allowed",
  }),
}

const opacityState = {
  normal: {
    opacity: 1,
    "&:hover": {
      opacity: 0.75,
    },
    "&:active": {
      opacity: 1,
    },
  },
  disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
}
const opacityStyle = opacityState

const nakedDarkStyle = {
  normal: css({
    color: colors.white,
  }),
  disabled: css({
    color: colors.inactive,
    cursor: "not-allowed",
  }),
}

enum VERTICAL_PAD {
  big = 20,
  standard = 10,
  small = 7,
  fullWidth = 15,
}

const baseStyles = {
  base: css({
    justifyContent: "center",
    flexGrow: 0,
    width: "fit-content",
    opacity: 1,
  }),
  verticallyAlign: css({
    display: "inline-flex",
    alignItems: "center",
  }),
  big: css({
    minWidth: 200,
    padding: `${VERTICAL_PAD.big}px 30px`,
    fontSize: 20,
  }),
  standard: css({
    minWidth: 150,
    padding: `${VERTICAL_PAD.standard}px 20px`,
  }),
  small: css({
    minWidth: 100,
    padding: `${VERTICAL_PAD.small}px 10px`,
  }),
  fullWidth: css({
    flexGrow: 1,
    width: "100%",
    padding: `${VERTICAL_PAD.fullWidth}px 20px`,
    alignItems: "center",
    justifyContent: "center",
  }),
  floating: css({
    backgroundColor: "transparent",
    borderColor: "transparent",
    outlineColor: "transparent",
  }),
  notAllowed: css({ cursor: "not-allowed", color: colors.disabledTextGray }),
  iconLeft: css({
    paddingRight: 8,
  }),
  iconRight: css({
    paddingLeft: 8,
  }),
}

const boxedVertical = {
  big: css({
    paddingTop: VERTICAL_PAD.big - 1,
    paddingBottom: VERTICAL_PAD.big - 1,
  }),
  normal: css({
    paddingTop: VERTICAL_PAD.standard - 1,
    paddingBottom: VERTICAL_PAD.standard - 1,
  }),
  small: css({
    paddingTop: VERTICAL_PAD.small - 1,
    paddingBottom: VERTICAL_PAD.small - 1,
  }),
  fullWidth: css({
    paddingTop: VERTICAL_PAD.fullWidth - 1,
    paddingBottom: VERTICAL_PAD.fullWidth - 1,
  }),
}

export default Button
