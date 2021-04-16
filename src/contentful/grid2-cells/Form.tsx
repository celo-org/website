import { useForm } from "react-hook-form";
import {FormContentType} from "src/utils/contentful"
import { inputDarkStyle, labelStyle } from "src/estyles"

export default function Form(props: FormContentType){

  const { register, handleSubmit} = useForm();
  const onSubmit = data => console.log(data);
  return <form onSubmit={handleSubmit(onSubmit)}>
      {props.fields.map(input =>
        <label css={labelStyle} >
          {input.fields.label}
          <input css={inputDarkStyle} name={input.fields.name}  {...register(input.fields.name)} />
        </label>
      )}
  </form>
}

