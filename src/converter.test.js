const { getIsoFromCurrencyName, getConvertedAmount, isoCheck, startProgram, startConversion, getSymbolList, chooseCurrencyCountry } = require("./converter");

const fetch = require("node-fetch")
jest.mock("node-fetch")

const inquirer = require("inquirer")
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
        it('should get converted amount when from and to are both provided on the input list', async () => {
          // mock call in getConverstion Amount
          // assert mock was called with the from and to values
          const fakeRate = .5
          fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ result: amount * fakeRate })
          })
          const f_country = "USD"
          const t_country = "CAD"
          const answer = await isoCheck(objectList, f_country, t_country, amount)
          const expectedMockArgs = [objectList, f_country, t_country, amount]
          //console.log(`result returned in test`, result);
            expect(fetch.result).toEqual(answer)
            //expect(isoCheck).toBeCalledWith(expectedMockArgs)
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
        describe.only('startProgram()', () => {

          beforeEach(() => {
            fetch.mockResolvedValue({
                json: jest.fn().mockResolvedValue({ symbols: {} })
            })
            inquirer.prompt.mockResolvedValue({ greeting: "Exit" })
          })

          it.skip('should call a function based on the response', async () => {
            const expectation = {
              'USD': 'United States Dollar',
              'EUR': 'Euro',
              'CAD': 'Canadian Dollar'
            }
            fetch.mockResolvedValue({
              json: jest.fn().mockResolvedValue({ result: expectation})
            })
            inquirer.prompt.mockResolvedValueOnce('Test');
            const actual = await startProgram();
            expect(actual).toBe('Test');
          })
          
          it('should get the symbol list', async () => {
            await startProgram()
            expect(fetch).toBeCalledWith(expect.stringContaining("/api/symbols"), {type: "json"})
          })

          it('should prompt the user with options to convert, lookup, or exit', async () => {
            await startProgram()
            expect(inquirer.prompt).toBeCalledWith({
              name: "greeting",
              choices: ['Look up a currency ISO code', 'Convert a currency', 'Exit'],
              type: "list",
              message: 'What would you like to do?',
            })
          })

          it('should execute the lookup iso code flow', async () => {
            inquirer.prompt.mockResolvedValueOnce({ greeting: "Exit" })

            await startProgram()
            /**
             * get symbolist
             * prompt -> lookup greeting
             *  prompt -> get iso
             *  getIsoFromCurrencyName
             * reruns start program
             *  -> getsymbollist
             *  -> prompt -> exit
             */
            // Start with the expectation!
          })

          it('should execute conversion flow', async () => {
            
          })

          it('should bail out if exit flow selected', async () => {
            
          })
    })
})

// DRY
// - shared mocks and such/before/aftereach
// fall throughs (isoCheck)
// 