import { useForm } from "react-hook-form";
import {FormContentType} from "src/utils/contentful"
import { inputDarkStyle, labelStyle, WHEN_TABLET_AND_UP } from "src/estyles"
import { css } from "@emotion/react"
import Button, { BTN } from "src/shared/Button.3"
import * as React from "react"
import { postForm } from "src/forms/postForm"

export default function Form(props: FormContentType){

  const { register, handleSubmit, formState} = useForm();
  const onSubmit = data => postForm(props.route, data);

  const styles = React.useMemo(() => {
    return css(rootStyle, {
      gridColumn: `span ${props.colSpan}`,
      [WHEN_TABLET_AND_UP]: {
        gridTemplateAreas: props.layout?.grid?.map(row => row.join(" ")).map(e => `"${e}"`).join("\n")
      }
    }
  )},[props.colSpan, props.layout?.grid])

  return <form css={styles} onSubmit={handleSubmit(onSubmit)}>
      {props.fields.map(input => {
        const attributes = register(input.fields.name, {required:  input.fields.required})

        return <label key={input.sys.id} css={css(labelStyle, {gridArea:  props.layout ? input.fields.name : null})} >

          {input.fields.label}{input.fields.required && "*"}

          {input.fields.type === "multiline" ?
            <textarea  name={input.fields.name} css={inputDarkStyle} rows={5}
              {...attributes} />
            :
            <input name={input.fields.name} type={input.fields.type} css={inputDarkStyle}
              {...attributes}
            />
          }
        </label>
      }
      )}
      <span css={buttonCss}><Button  kind={BTN.PRIMARY} onPress={handleSubmit(onSubmit)} css={buttonCss} accessibilityRole="button" text={props.submitText}/></span>
  </form>
}

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