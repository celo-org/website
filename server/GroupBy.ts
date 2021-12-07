import { normalizeHubspot } from "./Alliance"

const testValue = [
  {
    id: "5701687324",
    properties: {
      categories: "Community;Regenerate",
      createdate: "2021-03-24T13:29:12.497Z",
      domain: "acdi.org.ar",
      hs_lastmodifieddate: "2021-11-04T18:52:24.843Z",
      hs_object_id: "5701687324",
      name: "ACDI",
    },
    createdAt: "2021-03-24T13:29:12.497Z",
    updatedAt: "2021-11-04T18:52:24.843Z",
    archived: false,
  },
  {
    id: "6856616867",
    properties: {
      categories: "Acquire",
      createdate: "2021-08-31T19:02:09.142Z",
      domain: "ponto.org",
      hs_lastmodifieddate: "2021-12-06T04:58:10.649Z",
      hs_object_id: "6856616867",
      name: "ponto.org",
    },
    createdAt: "2021-08-31T19:02:09.142Z",
    updatedAt: "2021-12-06T04:58:10.649Z",
    archived: false,
  },
]

function groupBy(arr) {
  return arr.reduce((acc, obj) => {
    const categories = obj["properties"]["categories"]
    categories.split(";").forEach((category) => {
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(obj)
    })
    return acc
  }, {})
}

console.log(groupBy(testValue))
