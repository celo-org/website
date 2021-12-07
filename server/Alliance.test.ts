import { Category } from "src/alliance/CategoryEnum"
import { CATEGORY_FIELD, LOGO_FIELD, normalize, URL_FIELD, normalizeHubspot } from "./Alliance"

describe("Alliance", () => {
  describe("normalize", () => {
    const Logo = []
    it("transforms when no logo is attached", () => {
      expect(
        normalize({
          Name: "Test",
          Approved: true,
          [URL_FIELD]: "celo.org",
          [CATEGORY_FIELD]: [Category.Build],
          [LOGO_FIELD]: Logo,
        })
      ).toEqual({ name: "Test", url: "celo.org", logo: { width: 1, height: 1, uri: "" } })
    })
  })
  describe("normalizeHubspot", () => {
    it("transforms when no logo is attached", () => {
      expect(
        normalizeHubspot({
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
        })
      ).toEqual({ name: "ponto.org", url: "ponto.org", logo: { width: 1, height: 1, uri: "" } })
    })
  })
})
