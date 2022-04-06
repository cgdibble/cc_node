const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


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
function checker(list, f_str, t_str){
    for (let i in list) {
        if (list.indexOf(f_str)) {
            console.log("Origin ISO code ",f_str," is valid");
            break;
        }
        else console.log("Origin input ",f_str," is not valid ISO code.")
    }
    for (let i = 0; i < list.length; i++) {
        if (list.indexOf(t_str)) {
            console.log("Destination ISO code ",t_str," is valid");
            break;
        }
        else console.log("Destination input ",t_str," is not valid ISO code.")
    }
    return;
}


let input_f = 'USD';
let input_t = 'ISK';
let input_a = 1200;

let x = list();
x.then((result)=> {
    ///console.log("X Symbols", result.symbols);
    let list_s = Object.keys(result.symbols);
    return checker(list_s, input_f, input_t);
});

let y = converter(input_f, input_t, input_a);
y.then((result)=> {
    console.log("Converted Amount is: ", result.result)
})




///module.exports = {Conversion};
