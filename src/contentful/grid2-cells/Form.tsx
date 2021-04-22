import { useForm } from "react-hook-form";
import {FormContentType, InputTypes} from "src/utils/contentful"
import { inputDarkStyle, labelStyle, errorStyle, WHEN_TABLET_AND_UP, whiteText } from "src/estyles"
import { css } from "@emotion/react"
import Button, { BTN } from "src/shared/Button.3"
import * as React from "react"
import { postForm } from "src/forms/postForm"
import MessageDisplay from 'src/forms/eMessageDisplay'
import { NameSpaces, useTranslation } from "src/i18n"
import { emailIsValid, urlIsValid } from "src/forms/Form"

export default function Form(props: FormContentType){
  const {t} = useTranslation(NameSpaces.common)

  const { register, handleSubmit, formState, setError, reset} = useForm();
  const onSubmit = async (data) => {
    const submission = await postForm(props.route, data);
    console.log(submission)
    if (submission.ok)
      reset()
    else {
      setError('server', {message: submission.statusText})
    }
  }

  const styles = React.useMemo(() => {

    return css(rootStyle, {
      gridColumn: `span ${props.colSpan}`,
      gridTemplateAreas:  `${props.layout?.grid?.map(row => row.join(" ")).map(e => `"${e}"`).join("\n")}`
    }
  )},[props.colSpan, props.layout?.grid])

  return <form css={styles} onSubmit={handleSubmit(onSubmit)}>
      {props.fields.map(input => {
        const attributes = register(input.fields.name, {required:  input.fields.required, validate: valitators(input.fields.type)})

        return <label key={input.sys.id} css={css(labelStyle, {gridArea: props.layout?.grid ? input.fields.name : null})}>

          {input.fields.label}{input.fields.required && "*"}

          {input.fields.type === "multiline" ?
            <textarea  name={input.fields.name} css={inputDarkStyle} rows={5}
              {...attributes} />
            :
            <input name={input.fields.name} type={input.fields.type} css={inputDarkStyle}
              {...attributes}
            />
          }
          <MessageDisplay css={errorStyle} isShowing={formState.errors[input.fields.name]?.type === 'required'}>{t('validationErrors.fieldIsRequired', {field: input.fields.label})}</MessageDisplay>
          <MessageDisplay css={errorStyle} isShowing={formState.errors[input.fields.name]?.type === 'email'}>{t('validationErrors.email')}</MessageDisplay>
          <MessageDisplay css={errorStyle} isShowing={formState.errors[input.fields.name]?.type === 'url'}>{t('validationErrors.url')}</MessageDisplay>
        </label>
      })}
      <span css={buttonCss}>
        <Button disabled={formState.isSubmitting} kind={BTN.PRIMARY} onPress={handleSubmit(onSubmit)} accessibilityRole="button" text={formState.isSubmitting ? '...' : props.submitText}/>
        <MessageDisplay css={postSubmitCss} isShowing={formState.isSubmitSuccessful}>{t('shortSuccess')}</MessageDisplay>
        <MessageDisplay css={postSubmitErrorCss} isShowing={!!formState.errors.server}>{formState.errors.server?.message}</MessageDisplay>
      </span>

  </form>
}

function valitators(fieldType: InputTypes) {
  switch(fieldType) {
    case 'email':
      return {email: emailIsValid}
    case 'url':
      return {url: urlIsValid}
    case 'tel':
      return null
  }
}

const postSubmitCss = css(whiteText,{
  marginTop:12
})

const postSubmitErrorCss = css(errorStyle,{
  marginTop:12
})

const buttonCss = css({
  gridArea: "button"
})

const rootStyle = css({
  [WHEN_TABLET_AND_UP]: {
    display: 'grid',
    marginTop: 24,
    columnGap: 24,
  }
})