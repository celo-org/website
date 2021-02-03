import {calcAverageBlockTime} from "./stats"

describe('calcAverageBlockTime', () => {
  it("returns average block time in seconds since genesis block", () => {
    const timestampOfTestBlock = 1611867992000
    expect(calcAverageBlockTime(4858462, timestampOfTestBlock)).toBeCloseTo(5.0)
  })
})

// describe('hugeNumberToHuman', () => {
//   it("given the large values returns number that is human scale", () => {
//     expect(hugeNumberToHuman("329958375833727435235695148")).toEqual(329_958_375)
//   })
// })
