import { useForm } from "react-hook-form";
import {FormContentType} from "src/utils/contentful"
import { inputDarkStyle, labelStyle } from "src/estyles"
import { css } from "@emotion/react"

export default function Form(props: FormContentType){

  const { register, handleSubmit} = useForm();
  const onSubmit = data => console.log(data);
  return <form css={rootStyle} onSubmit={handleSubmit(onSubmit)}>
      {props.fields.map(input =>
        <label css={css(labelStyle, {gridArea: input.fields.name})} >
          {input.fields.label}
          <input css={inputDarkStyle} name={input.fields.name}
            {...register(input.fields.name, {required: input.fields.required})}
          />
        </label>
      )}
  </form>
}

const rootStyle = css({
  display: 'grid'
})