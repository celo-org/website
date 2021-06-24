// converts any undefines in an object to nulls for safe jsonification
export default function makeSafeForJson<T>(obj: T) {
  if (typeof obj === "object") {
    for (const keys in obj) {
      // checking if the current value is an object itself
      if (typeof obj[keys] === "object") {
        // if so then again calling the same function
        makeSafeForJson(obj[keys])
      } else {
        // else getting the value and replacing single { with {{ and so on
        const keyValue = obj[keys]
        obj[keys] = keyValue === undefined ? null : keyValue
      }
    }
  }
  return obj
}
