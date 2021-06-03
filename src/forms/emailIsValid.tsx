export function emailIsValid(email: string) {
  return email && email.length && email.length < 254 && email.indexOf("@") > 0
}

export function urlIsValid(url: string) {
  return /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/.test(url)
}

export function hasField(value: string) {
  return value && value.trim().length > 0
}
