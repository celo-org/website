import Ally from "../src/alliance/AllianceMember"

export function groupBy(arr: Ally[]) {
  return arr.reduce((acc, obj) => {
    const categories = obj.category
    categories.split(";").forEach((category) => {
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(obj)
    })
    return acc
  }, {})
}
