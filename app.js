var http = require('http');
var request = require('request');

var express = require('express');

var app = express();
app.get('/', function(req, res) {
  res.send('Hello Seattle\n');
});
app.listen(3001);
console.log('Listening on port 3001...');
// request.post(
//     'https://api.blockcypher.com/v1/btc/test3/wallets?token=48b001c7f91e463a82352552232db02b',
//     { json: {name: "SUNN", addresses: ["mt4wpkLSr7PbNXQJhwARH97Dyh6h7QZH56"]} },
//     function (error, response, body) {
//         if (error != null && response.statusCode == 200 || response.statusCode == 201) {
//             console.log(error, 'error')
//             console.log(response, 'response')
//             console.log(body, 'BODY')
//         }
//         else {
//             console.log('err', error, response.statusCode)
//         }
//     }
// );
// var data = {"name": "alice","addresses": ["1JcX75oraJEmzXXHpDjRctw3BX6qDmFM8e"]};
// http.post('https://api.blockcypher.com/v1/btc/main/wallets?token=48b001c7f91e463a82352552232db02b', JSON.stringify(data))
//   .then(function(d) {console.log(d)});


// TODO

// Rest endpoints CA
// /register/{name}/{phone}
// 1. Creates a new wallet with this name
// 2. Generate a 5 digit code
// 3. Sends the code to the phone number
// 4. Return the code as an ouput of the endpoint

// /getWalletAmount/{name}
// 1. Get the current amount in the wallet of {name}
// Return

// POST /sendMoney/{from}/{to}/{amount}
// Return success
