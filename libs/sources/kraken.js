const axios = require('axios')
const coin = require('./../models/coin.js')
const helpers = require('./../helpers.js')

function getDataByCoin(symbol){

    symbol = convertSymbolToId(symbol);

    return axios.get('https://api.kraken.com/0/public/Ticker?pair=' + symbol)
        .then(function (response) {

        // Check for errors
        if (response.data.error && response.data.error.length > 0) {

            var c = new coin.Coin(symbol, 0, 0, 0, "kraken.com", response.data.error[0]);
            return c;
            
		} else {

            // Get data

            let coinPrice = helpers.numberWithCommas(parseFloat(eval('response.data.result.' + symbol + '.c[0]')).toFixed(4));
            let coinLow = helpers.numberWithCommas(parseFloat(eval('response.data.result.' + symbol + '.l[0]')).toFixed(4).toLocaleString());
            let coinHigh = helpers.numberWithCommas(parseFloat(eval('response.data.result.' + symbol + '.h[0]')).toFixed(4));

            var c = new coin.Coin(symbol, coinPrice, coinHigh, coinLow, "kraken.com", "");
            return c;

        }

        })
        .catch(function (error) {
            //console.log(error);
            //console.log('Ups. Something went wrong, please try again latter....');

            var c = new coin.Coin(symbol, 0, 0, 0, "kraken.com", 'Ups. Something went wrong, please try again latter....');
            return c;

        });

}

function convertSymbolToId(symbol){

    switch (symbol) {

        case "XRP":
            return "XXRPZUSD"
        case "ETH":
            return "XETHZUSD"
        case "BCH":
            return "BCHUSD"
        case "LTC":
            return "XLTCZUSD"
        case "DASH":
            return "DASHUSD"
        case "XMR":
            return "XXMRZUSD"

        default:
            return symbol;
    }

}

module.exports.getDataByCoin = getDataByCoin;