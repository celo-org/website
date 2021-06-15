import { I18n, TFunction } from "next-i18next"

export {
  Trans,
  appWithTranslation,
  withTranslation,
  useTranslation,
  withTranslation as withNamespaces,
} from "next-i18next"
export interface I18nProps {
  t: TFunction
  i18n: I18n
  tReady: boolean
}

export enum NameSpaces {
  common = "common",
  about = "about",
  alliance = "alliance",
  audits = "audits",
  brand = "brand",
  cbe = "cbe",
  celoRewards = "celoRewards",
  community = "community",
  dev = "dev",
  download = "download",
  faucet = "faucet",
  home = "home",
  jobs = "jobs",
  papers = "papers",
  press = "press",
  plumo = "plumo",
  terms = "terms",
}
