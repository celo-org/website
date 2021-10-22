import * as React from "react"
import { LabeledInput } from "./LabeledInput"

export function HoneyPotInput() {
  return (
    <div>
      <LabeledInput
        name={"pAccount"}
        value={"pAccount"}
        label={"pAccount"}
        onInput={() => {
          console.log("hello world")
        }}
      />
    </div>
  )
}
