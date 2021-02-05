
export interface StatsState {
  avgBlockTime: string
  blockCount: number
  totalTx: number
  addressCount: string
}


export enum StatKeys {
  "avgBlockTime"= "avgBlockTime",
  "blockCount" = "blockCount",
  "totalTx"= "totalTx",
  "addressCount" = "addressCount"
}

export interface StatsTransport {
  action: StatKeys
  value: string | number
}

export interface InitialResponse {
  action: "init"
  value: StatsState
}