const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class Conversion{
    constructor(from, to, amount) {
        this.f = from;
        this.t = to;
        this.a = amount;
    }

    // Getter
    get result() {
        return this.converter();
    }

    // Method
    async converter() {
        let url = ["https://data.fixer.io/api/convert?access_key=5224cc818d14737db40e2077cf38b610", 
            "&from=", this.f, "&to=", this.t, "&amount=", this.a];
        let url_string = url.join('');
        let result = await fetch(url_string, {type: 'json'})
        //if (err) {return console.log(err)};
        return await result.json();
    }
}

class Symbols{
    constructor(from, to) {
        this.f = from;
        this.t = to;
    }

    // Getter
    get symbols() {
        return this.list();
    }

    // Method: Pulls list of supported symbols from API
    async list(){
        let url = 'https://data.fixer.io/api/symbols?access_key=5224cc818d14737db40e2077cf38b610';
        let result = await fetch(url, {type: 'json'})
        //if (err) {return console.log(err)};
        //let symb = Object.keys(body.symbols);
        return await result.json();
        //return symb;
        
    }

    // Validation
    checker(){
        const l = this.list;
        // Will build in iterator to check input symbols v list of supported symbols
        console.log(l);
        return l;
       
    }
}
let input_f = 'USD';
let input_t = 'EUR';
let input_a = 1200;

let x = new Symbols(input_f, input_t);
x.symbols.then((result)=> {
   // console.log("X Symbols", result)
});

let y = new Conversion(input_f, input_t, input_a);
y.result.then((result)=> {
    console.log("y result", result)
})




module.exports = {Conversion};
