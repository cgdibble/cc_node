const fetch = require("node-fetch")
const inquirer = require('inquirer');


async function getConvertedAmount(from, to, amt) { // Converter Endpoint www.fixer.io
    let url = ["https://data.fixer.io/api/convert?access_key=5224cc818d14737db40e2077cf38b610", 
        "&from=", from, "&to=", to, "&amount=", amt];
    let url_string = url.join('');
    let result = await fetch(url_string, {type: 'json'})
    //if (err) {return console.log(err)};
    let full_result = await result.json();
    ///console.log('full_result.result', typeof full_result.result);
    return full_result.result;
}

async function getSymbolList(){ // Supported Symbols Endpoint www.fixer.io
    let url = 'https://data.fixer.io/api/symbols?access_key=5224cc818d14737db40e2077cf38b610';
    let result = await fetch(url, {type: 'json'})
    //console.log(`result`, result);
    //if (err) {return console.log(err)};
    return await result.json();
}

async function isoCheck(list, f_str, t_str, amount){ // Validation of input
    let originValid = list.indexOf(f_str)
    let destinationValid = list.indexOf(t_str);
    try {
      if (originValid >= 0 && destinationValid >= 0) {
        let c_amt = await getConvertedAmount(f_str, t_str, amount);
        console.log("Converted Amount is: ", c_amt.toFixed(2), t_str);
        const startResult = await startProgram();
        return startResult
      } else if (originValid < 0 && destinationValid < 0) {
          console.log("Neither input was a valid ISO code.");
          return startProgram();
      } else if (originValid < 0 && destinationValid > 0) {
          console.log("Your origin currency ISO code is invalid");
          return startProgram();
      } else if (originValid > 0 && destinationValid < 0) {
          console.log("Your destination currency ISO code is invalid");
          return startProgram();
      }
    } catch (error) {
      console.log(`isoCheck::: error.toString()`, error.toString());      
    }
}

function getIsoFromCurrencyName(currenciesByIsoCodes, currencyName){
    return Object.keys(currenciesByIsoCodes).find(key => currenciesByIsoCodes[key] === currencyName);
}

const startProgram = async () => {
  // prep
  let symbolList = await getSymbolList();
  let countryList = Object.values(symbolList.symbols);
  let symbList = Object.keys(symbolList.symbols);

  // prompt
  const answer = await inquirer.prompt({
    name: 'greeting',
    message: 'What would you like to do?',
    type: 'list',
    choices: ['Look up a currency ISO code', 'Convert a currency', 'Exit']
  })
  // react
  if (answer.greeting === 'Look up a currency ISO code') {
    //  react: lookup
      const getIso = await inquirer.prompt(chooseCurrencyCountry(countryList))
      chosenCountry = Object.values(getIso)
      chosenCountry = chosenCountry[0]
      const iso = getIsoFromCurrencyName(symbolList.symbols, chosenCountry);
      console.log("Your currency ISO code is ", iso);
      return startProgram();
    } else if (answer.greeting === 'Convert a currency') {
    //  react:convert
        let inq = startConversion();
        const conversion_from = await inquirer.prompt(inq[0])
        const conversion_to = await inquirer.prompt(inq[1])
        const conversion_amt = await inquirer.prompt(inq[2])
        conversionFrom = Object.values(conversion_from)
        conversionTo = Object.values(conversion_to)
        conversionAmt = Object.values(conversion_amt)  
        return isoCheck(symbList, conversionFrom[0], conversionTo[0], conversionAmt[0]);
  } else {
    //  react:default
    console.log("in the else here");
    return
  }
}

const chooseCurrencyCountry = (countryList) => {
    return {
        name: 'choose_currency_country',
        message: 'What currency would you like?',
        type: 'list',
        choices: countryList,
    }
}

const startConversion = () => {
    const fromC = {
        name: 'from_country',
        message: 'Please enter the ISO code of your origin currency.',
        type: 'input',
    }
    const toC = {
        name: 'to_country',
        message: 'Please enter the ISO code of your destination currency.',
        type: 'input',
    }
    const amt = {
        name: 'amount',
        message: 'Please enter the amount to convert.',
        type: 'number',
    }

    return [fromC, toC, amt]

}

module.exports = {
    getIsoFromCurrencyName, //
    startProgram, //
    getSymbolList,
    getConvertedAmount, //
    isoCheck, //
    startConversion,
    chooseCurrencyCountry
}