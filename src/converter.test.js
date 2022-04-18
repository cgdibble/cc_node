console.log(`getIsoFromCurrencyName`, getIsoFromCurrencyName);
const { getIsoFromCurrencyName } = require("./converter")

describe('identify test', () => {
    describe.only('getISOfromCurrencyName()', () => {
        it('should return the USA ISO Code when given the appropriate currency', () => {
            const currencyNameByIsoCodes ={
                "USD" : "United States Dollar"
            }
            const currencyName = "United States Dollar"
            const result = getIsoFromCurrencyName(currencyNameByIsoCodes, currencyName)
            expect(result).toBe("USD")
        })
        it('should return the CAD ISO code when given the approprate currency', () => {
            const currencyNameByIsoCodes ={
                "CAD" : "Canadian Dollar"
            }
            const currencyName = "Canadian Dollar"
            const result = getIsoFromCurrencyName(currencyNameByIsoCodes, currencyName)
            expect(result).toBe("CAD")
        })
    })
})

