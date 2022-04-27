const { getIsoFromCurrencyName, getConvertedAmount, isoCheck, startProgram, startConversion, getSymbolList, getISO } = require("./converter");

const fetch = require("node-fetch")
jest.mock("node-fetch")

const inquire = require("inquirer")
jest.mock('inquirer', () => {
  return { prompt: jest.fn() };
});

describe('identify test', () => {
    console.log(`getIsoFromCurrencyName`, getIsoFromCurrencyName);
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
    console.log('isoCheck', isoCheck)
    describe('isoCheck()', () => {
        const objectList = ["USD", "CAD", "EUR"]
        const amount = 1000
        it('should validate both inputs are part of the object array returned by the API', async () => {
            const f_country = "USD"
            const t_country = "CAD"
            const result = await isoCheck(objectList, f_country, t_country, amount)
            
            //expect(startProgram).toHaveBeenCalled();
        })
        it('should validate that neither input is in the object array returned by the API', () => {
            const f_country = "NaC"            
            const t_country = "NaC"
            const result = isoCheck(objectList, f_country, t_country, amount)
            expect(startConversion).toHaveBeenCalled();
        })
        it('should validate that the from country is not in the object array returned by the API', () => {
            const f_country = "NaC"            
            const t_country = "EUR"
            const result = isoCheck(objectList, f_country, t_country, amount)
            expect(startConversion).toHaveBeenCalled();
        })
        it('should validate that the to country is not in the object array returned by the API', () => {
            const f_country = "USD"            
            const t_country = "NaC"
            const result = isoCheck(objectList, f_country, t_country, amount)
            expect(startConversion).toHaveBeenCalled();
        })
    })
})


describe('conversion test', () => {
    console.log('getConvertedAmount', getConvertedAmount);
    describe('getConvertedAmount()', () => {
        it('should connect to the Fixer.io API and return a float object for the converted amount', async () => {
            [from, to, amount] = ['USD', 'EUR', 1000];
            const expectation = "1234.667"
            fetch.mockResolvedValue({
                json: jest.fn().mockResolvedValue({ result: expectation})
            })
            const result = await getConvertedAmount(from, to, amount)
            expect(result).toEqual(expectation)
        })
    })
})

describe('inquirer test', () => {
    console.log('startProgram', startProgram)
    describe('startProgram()', () => {
        it('should start the symbolList function to pull the data from the API', () => {
            expect(getSymbolList).toHaveBeenCalled();
        })
        it ('should call a function based on the response', async () => {
            inquirer.prompt.mockResolvedValueOnce('Start ISO');
            const actual = await getAnswers('Look up a currency ISO code');
            expect(actual).toBe('Start ISO');
        })
    })
})