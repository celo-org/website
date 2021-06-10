import { I18n, TFunction } from "next-i18next"

export {
  Trans,
  appWithTranslation,
  withTranslation,
  useTranslation,
  withTranslation as withNamespaces,
} from "next-i18next"

// export const Trans = NTrans

export interface I18nProps {
  t: TFunction
  i18n: I18n
  tReady: boolean
}

export enum NameSpaces {
  common = "common",
  about = "about",
  audits = "audits",
  brand = "brand",
  cbe = "cbe",
  celoRewards = "celoRewards",
  community = "community",
  alliance = "alliance",
  download = "download",
  dev = "dev",
  faucet = "faucet",
  home = "home",
  jobs = "jobs",
  papers = "papers",
  press = "press",
  plumo = "plumo",
  terms = "terms",
}
