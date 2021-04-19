import { useForm } from "react-hook-form";
import {FormContentType} from "src/utils/contentful"
import { inputDarkStyle, labelStyle, WHEN_TABLET_AND_UP } from "src/estyles"
import { css } from "@emotion/react"

export default function Form(props: FormContentType){

  const { register, handleSubmit, formState} = useForm();
  const onSubmit = data => console.log(data, formState);

  return <form css={css(rootStyle, {gridColumn: `span ${props.colSpan}`})} onSubmit={handleSubmit(onSubmit)}>
      {props.fields.map(input => {
        const attributes = register(input.fields.name, {required: input.fields.required})

        return <label key={input.sys.id} css={css(labelStyle, {gridArea: input.fields.type === "multiline" ? 2: 1 })} >

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
      <button css={buttonCss} type="submit"> "TEST" {props.submitText} </button>
  </form>
}

const buttonCss = css({
  gridArea: "submitButton"
})

const rootStyle = css({
  [WHEN_TABLET_AND_UP]: {
    display: 'grid',
    marginTop: 24,
    columnGap: 24,
    gridTemplateColumns: "1 2",
    // gridTemplateAreas: `
    // "name  reason"
    // "email reason"
    // "orgName ."
    // "submitButton ."
    // `
  }
})