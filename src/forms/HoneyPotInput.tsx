import * as React from "react"
import { LabeledInput } from "./LabeledInput"

export function HoneyPotInput() {
  return (
    <div>
      <LabeledInput
        name={""}
        value={""}
        label={""}
        onInput={() => {
          console.log("hello world")
        }}
      />
    </div>
  )
}
