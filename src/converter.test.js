const { getIsoFromCurrencyName, getConvertedAmount } = require("./converter")

const fetch = require("node-fetch")
jest.mock("node-fetch")

describe('identify test', () => {
    describe('getISOfromCurrencyName()', () => {
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

describe('conversion test', () => {
    describe('getConvertedAmount()', () => {
        it.only('should connect to the Fixer.io API and return a float object for the converted amount', async () => {
            [from, to, amount] = ['USD', 'EUR', 1000];
            const expectation = "1234.667"
            fetch.mockResolvedValue({
              json: jest.fn().mockResolvedValue({result: expectation})
            })
            const result = await getConvertedAmount(from, to, amount)
            expect(result).toEqual(expectation)
        })
        
        it('should not lead to errors', async () => {
            [from, to, amount] = ['USD', 'EUR', 1000];
            const result = await getConvertedAmount(from, to, amount)
            expect(getErrors()).toBeFalsy();
        })
    })
})


