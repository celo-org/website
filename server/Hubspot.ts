export interface Context {
  pageTitle: string
  pageURL: string
}

export interface Field {
  value: string
  name: string
}

export enum FormIDs {
  PUBLIC_SECTOR = "0f2e11f5-6390-404c-9c4a-9d265c2cc6a2",
  ECO_FUND = "8677957b-39cd-4f05-9364-228213d9c12c",
  ECO_FUND_REFERRAL = "107d2cce-2aba-4bf5-b7f2-001b1ccb3998",
}
export interface HubSpotEcoFundApplication {
  name: string // company name
  domain: string // company website
  website: string // video
  description: string // What the company does
  project_description: string
  email: string
}

export interface HubSpotEcoFundRecommendation {
  company: string // company name
  email: string // submitted email
}

export const PORTAL_ID = 8568019
