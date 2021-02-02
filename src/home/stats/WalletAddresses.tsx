import * as React from "react"
import useBlockscoutWS from "../useBlockscoutWS"

export default function WalletAddresses() {
  const addresses = useBlockscoutWS()
  return (
    <span style={{ marginTop: 100, padding: 100, fontSize: 50 }}>
      {addresses}
    </span>
  )
}
