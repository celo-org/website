import { normalizeHubspot } from "./Alliance"

describe("Alliance", () => {
  describe("normalizeHubspot", () => {
    it("transforms when no logo is attached", () => {
      expect(
        normalizeHubspot({
          id: "6856616867",
          properties: {
            categories: "Test",
            createdate: "2021-08-31T19:02:09.142Z",
            domain: "ponto.org",
            hs_lastmodifieddate: "2021-12-06T04:58:10.649Z",
            hs_object_id: "6856616867",
            name: "ponto.org",
            logo: "",
          },
        })
      ).toEqual({
        name: "ponto.org",
        url: "ponto.org",
        categories: "Test",
        logo: { width: 0, height: 0, uri: "" },
      })
    })
  })
})
