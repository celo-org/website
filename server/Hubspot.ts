interface AllianceContact {
  email: string
  firstname?: string
  lastname?: string
  additional_information_about_your_project___areas_of_interest?: string
}

interface AllianceCompany {
  name: string
  domain?: string
  project_description?: string
}

interface EcoFundContact {
  email: string
  firstname: string
  lastname: string
  hs_content_membership_notes?: string
}
interface EcoFundCompany {
  name: string // company name
  domain: string // company website
  website: string // video
  description: string // What the company does
  project_description: string
}

interface PublicSectorContact {
  email: string
}

export type HubSpotContact = AllianceContact | EcoFundContact | PublicSectorContact

export type HubSpotCompany = AllianceCompany | EcoFundCompany
