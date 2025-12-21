const axios = require('axios')
const coin = require('./../models/coin.js')
const helpers = require('./../helpers.js')

function getDataByCoin(symbol, targetCurrency){

    const coinId = convertSymbolToId(symbol);
    targetCurrency = targetCurrency || 'USD';

    // Fetch both USD and target currency if different
    let currencies = 'usd';
    if (targetCurrency.toLowerCase() !== 'usd') {
        currencies = 'usd,' + targetCurrency.toLowerCase();
    }

    return axios.get('https://api.coingecko.com/api/v3/simple/price?ids=' + coinId + '&vs_currencies=' + currencies)
        .then(function (response) {

        // Check for errors
        if (!response.data[coinId]) {

            var c = new coin.Coin(symbol, 0, 0, 0, "coingecko.com", 'Coin not found');
            return c;

		} else {

            // Get data
            let coinPrice = helpers.numberWithCommas(parseFloat(response.data[coinId].usd).toFixed(4));
            let coinLow = "";
            let coinHigh = "";

            let convertedPrice = null;
            if (targetCurrency.toLowerCase() !== 'usd' && response.data[coinId][targetCurrency.toLowerCase()]) {
                convertedPrice = helpers.numberWithCommas(parseFloat(response.data[coinId][targetCurrency.toLowerCase()]).toFixed(4));
            }

            var c = new coin.Coin(symbol, coinPrice, coinHigh, coinLow, "coingecko.com", "", convertedPrice);
            return c;

        }

        })
        .catch(function (error) {
            //console.log(error);
            //console.log('Ups. Something went wrong, please try again latter....');

            var c = new coin.Coin(symbol, 0, 0, 0, "coingecko.com", 'Ups. Something went wrong, please try again latter....');
            return c;

        });

}

function convertSymbolToId(symbol){

    switch (symbol) {

        case "BTC":
            return "bitcoin"
        case "ETH":
            return "ethereum"
        case "XRP":
            return "ripple"
        case "BCH":
            return "bitcoin-cash"
        case "LTC":
            return "litecoin"
        case "DASH":
            return "dash"
        case "XMR":
            return "monero"
        case "ADA":
            return "cardano"
        case "XLM":
            return "stellar"
        case "MIOTA":
            return "iota"

        default:
            return symbol.toLowerCase();
    }
}


module.exports.getDataByCoin = getDataByCoin;
