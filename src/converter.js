const request = require("request")

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
    converter() {
        var url = ["https://data.fixer.io/api/convert?access_key=5224cc818d14737db40e2077cf38b610", 
            "&from=", this.f, "&to=", this.t, "&amount=", this.a];
        var url_string = url.join('');
        request(url_string, {json: true}, (err, res, body) => {
            if (err) {return console.log(err)};
            const result = body.result;
            console.log(result);
        return result;
        });
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
    list(){
        var url = 'https://data.fixer.io/api/symbols?access_key=fab696bb4082dd825a4681f6be651707';
        request(url, {json: true}, (err, body) => {
            if (err) {return console.log(err)};
            //var symb = Object.keys(body.symbols);
            var symb = 'x';
            console.log(symb);
        return symb;
        })
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
x.symbols;

let y = new Conversion(input_f, input_t, input_a);
y.result;




module.exports = {Conversion};
