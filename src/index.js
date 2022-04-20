const { getSymbolList, startProgram } = require("./converter")

console.log("Welcome to Brinae's Currency Converter!");

let symbolList = getSymbolList();
symbolList.then((result)=> {
    dict = result.symbols;
    countryList = Object.values(result.symbols);
    symbList = Object.keys(result.symbols);
})

let start = startProgram();