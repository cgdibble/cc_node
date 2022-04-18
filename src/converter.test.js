const { getIsoFromCurrencyName } = require("./converter")
console.log(`getIsoFromCurrencyName`, getIsoFromCurrencyName);
describe('converter test', () => {
  describe.only('getISOfromCountry()', () => {
    it('should return the USA isocode when given the appropriate currency', () => {
      const currancyNameByIsoCodes = {
        "USD": "United States Dollar"
      }
      const currencyName = "United States Dollar"
      const result = getIsoFromCurrencyName(currancyNameByIsoCodes, currencyName)
      expect(result).toBe("USD")
    })
    
    it('should return the CAD isocode when given the appropriate currency', () => {
      const currancyNameByIsoCodes = {
        "CAD": "Canadian Dollar"
      }
      const currencyName = "Canadian Dollar"
      const result = getIsoFromCurrencyName(currancyNameByIsoCodes, currencyName)
      expect(result).toBe("CAD")
    })
  })
})