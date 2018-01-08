const axios = require('axios')
const coin = require('./../models/coin.js')
const helpers = require('./../helpers.js')

function getDataByCoin(symbol){

    symbol = convertSymbolToId(symbol);

    return axios.get('https://api.coinbase.com/v2/prices/' + convertSymbolToId(symbol) + '/spot')
        .then(function (response) {

        // Check for errors
        if (response.data.error && response.data.error.length > 0) {

            var c = new coin.Coin(symbol, 0, 0, 0, "coinbase.com", response.data.error.message);
            return c;
            
		} else {

            // Get data
            let coinPrice = helpers.numberWithCommas(parseFloat(response.data.data.amount).toFixed(4));
            let coinLow = "";
            let coinHigh = "";

            var c = new coin.Coin(symbol, coinPrice, coinHigh, coinLow, "coinbase.com", "");
            return c;

        }

        })
        .catch(function (error) {
            //console.log(error);
            //console.log('Ups. Something went wrong, please try again latter....');

            var c = new coin.Coin(symbol, 0, 0, 0, "coinbase.com", 'Ups. Something went wrong, please try again latter....');
            return c;

        });

}

function convertSymbolToId(symbol){

    switch (symbol) {

        case "BTC":
            return "BTC-USD"
        case "ETH":
            return "ETH-USD"
        case "BCH":
            return "BCH-USD"

        default:
            return symbol;
    }
}


module.exports.getDataByCoin = getDataByCoin;