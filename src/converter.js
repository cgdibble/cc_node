const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const inquirer = require('inquirer');

async function converter(f, t, a) { // Converter Endpoint
    let url = ["https://data.fixer.io/api/convert?access_key=5224cc818d14737db40e2077cf38b610", 
        "&from=", f, "&to=", t, "&amount=", a];
    let url_string = url.join('');
    let result = await fetch(url_string, {type: 'json'})
    //if (err) {return console.log(err)};
    return await result.json();
}

async function list(){ // Supported Symbols Endpoint
    let url = 'https://data.fixer.io/api/symbols?access_key=5224cc818d14737db40e2077cf38b610';
    let result = await fetch(url, {type: 'json'})
    //if (err) {return console.log(err)};
    return await result.json();
}

// Validation of input
async function checker(list, f_str, t_str, amount){
    let x = list.indexOf(f_str);
    let y = list.indexOf(t_str);
    if (x > 0 && y > 0) {
        let c_amt = converter(f_str, t_str, amount);
                c_amt.then((result)=> {
                    console.log("Converted Amount is: ", result.result);
                    return getProgram();
                })
    }
    if (x < 0 && y < 0) {
        console.log("Neither input was a valid ISO code.");
        return getConversion();
    }
    if (x < 0 && y > 0) {
        console.log("Your origin currency ISO code is invalid");
        return getConversion();
    }
    if (x > 0 && y < 0) {
        console.log("Your destination currency ISO code is invalid");
        return getConversion();
    }
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

console.log("Welcome to Brinae's Currency Converter!");

const getProgram = () => {
    inquirer
        .prompt([
            {
              name: 'greeting',
              message: 'What would you like to do?',
              type: 'list',
              choices: ['Look up a currency ISO code', 'Convert a currency', 'Exit']
            },
        ])
        .then(answer =>  {
            console.log(answer.greeting);
            if (answer.greeting == 'Look up a currency ISO code') {
                return getISO();
            }
            else if (answer.greeting == 'Convert a currency') {
                return getConversion();
            } 
            else return;
        });
};

const getISO = () => {
    inquirer
        .prompt([
            {
                name: 'choose_iso',
                message: 'What currency would you like?',
                type: 'list',
                choices: list_c,
            },
        ])
        .then(answer => {
            console.log(answer.choose_iso);
            let iso = getKeyByValue(dict, answer.choose_iso);
            console.log("Your currency ISO code is ", iso);
            return getProgram();
        })
}

const getConversion = () => {
    inquirer
        .prompt([
            {
                name: 'from_country',
                message: 'Please enter the ISO code of your origin currency.',
                type: 'input',
            },
            {
                name: 'to_country',
                message: 'Please enter the ISO code of your destination currency.',
                type: 'input',
            },
            {
                name: 'amount',
                message: 'Please enter the amount to convert.',
                type: 'number',
            },
        ])
        .then(answer => {
            let valid = checker(list_s, answer.from_country, answer.to_country, answer.amount);
        })
}

let y = list();
y.then((result)=> {
    dict = result.symbols;
    ///console.log(dict);
    list_c = Object.values(result.symbols);
    list_s = Object.keys(result.symbols);
})

let x = getProgram();
