import { GridRowContentType } from "../utils/contentful"
import { FiatConnect } from "../reskin/FiatConnect"
import React from "react"
import { FinalCTA } from "../reskin/FinalCTA"

export function connectTheWorldSwitch(gridFields: GridRowContentType) {
  switch (gridFields.id) {
    case "fiat-connect": {
      return <FiatConnect gridFields={gridFields} />
    }
    case "final-cta": {
      return <FinalCTA gridFields={gridFields} />
    }
  }
}
