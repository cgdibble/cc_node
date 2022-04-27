const fetch = require("node-fetch")
const inquirer = require('inquirer');


async function getConvertedAmount(from, to, amt) { // Converter Endpoint www.fixer.io
    let url = ["https://data.fixer.io/api/convert?access_key=5224cc818d14737db40e2077cf38b610", 
        "&from=", from, "&to=", to, "&amount=", amt];
    let url_string = url.join('');
    let result = await fetch(url_string, {type: 'json'})
    //if (err) {return console.log(err)};
    let full_result = await result.json();
    console.log('result', result);
    ///console.log('full_result.result', typeof full_result.result);
    return full_result.result;
}

async function getSymbolList(){ // Supported Symbols Endpoint www.fixer.io
    let url = 'https://data.fixer.io/api/symbols?access_key=5224cc818d14737db40e2077cf38b610';
    let result = await fetch(url, {type: 'json'})
    //if (err) {return console.log(err)};
    return await result.json();
}


async function isoCheck(list, f_str, t_str, amount){ // Validation of input
    let originValid = list.indexOf(f_str);
    let destinationValid = list.indexOf(t_str);
    if (originValid > 0 && destinationValid > 0) {
        let c_amt = await getConvertedAmount(f_str, t_str, amount);
            console.log("Converted Amount is: ", c_amt.toFixed(2), t_str);
            return startProgram();
        }
    if (originValid < 0 && destinationValid < 0) {
        console.log("Neither input was a valid ISO code.");
        return startConversion();
    }
    if (originValid < 0 && destinationValid > 0) {
        console.log("Your origin currency ISO code is invalid");
        return startConversion();
    }
    if (originValid > 0 && destinationValid < 0) {
        console.log("Your destination currency ISO code is invalid");
        return startConversion();
    }
}

function getIsoFromCurrencyName(currenciesByIsoCodes, currencyName){
    return Object.keys(currenciesByIsoCodes).find(key => currenciesByIsoCodes[key] === currencyName);
}

const startProgram = async () => {
    let symbolList = getSymbolList();
    symbolList.then((result)=> {
        dict = result.symbols;
        countryList = Object.values(result.symbols);
        symbList = Object.keys(result.symbols);
    })
    const answer = await inquirer.prompt({
              name: 'greeting',
              message: 'What would you like to do?',
              type: 'list',
              choices: ['Look up a currency ISO code', 'Convert a currency', 'Exit']
    })
    
    if (answer.greeting === 'Look up a currency ISO code') {
        const getIso = await inquirer.prompt(getISO(countryList))
        const iso = getIsoFromCurrencyName(dict, getIso.choose_iso);
        console.log("Your currency ISO code is ", iso);
        return startProgram();
    }
    if (answer.greeting === 'Convert a currency') {
        let inq = startConversion();
        const conversion_from = await inquirer.prompt(inq[0])
        const conversion_to = await inquirer.prompt(inq[1])
        const conversion_amt = await inquirer.prompt(inq[2])
        console.log(conversion_from, conversion_to, conversion_amt)
        return isoCheck(symbList, conversion_from, conversion_to, conversion_amt);
    } else {
        return
    }
}

const getISO = (countryList) => {
    return {
        name: 'choose_iso',
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
    return  [fromC, toC, amt]
}

module.exports = {
    getIsoFromCurrencyName, //
    startProgram, //
    getSymbolList,
    getConvertedAmount, //
    isoCheck, //
    startConversion,
    getISO
}

