import { fetchCached, MINUTE } from "./cache";
describe("fetchCached", () => {
    async function example1() {
        return 22;
    }
    it("returns the result of calling the passed function", async () => {
        expect(await fetchCached("fetchCached-example1", "en", 100 * MINUTE, example1)).toEqual(await example1());
    });
});
//# sourceMappingURL=cache.test.js.map