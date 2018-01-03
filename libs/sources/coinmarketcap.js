const axios = require('axios')
const market = require('./../models/marketcap.js')
const helpers = require('./../helpers.js')

function getMarketCapData(){
    return axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=15')
    .then(function (response) {

    // Check for errors
    if (response.data.error && response.data.error !== "") {
        return response.data.error;
    } else {

        var res = [];

        // Get data
        for(var i = 0; i < response.data.length; i++) {

            var coin = response.data[i];

            let coinRank = coin.rank;
            let coinName = coin.name;
            let coinSymbol = coin.symbol;
            let coinPrice = helpers.numberWithCommas(parseFloat(coin.price_usd).toFixed(4));
            let coinMarketCap = helpers.numberWithCommas(parseFloat(coin.market_cap_usd).toFixed(2));

            var m = new market.MarketCap(coinRank, coinName, coinSymbol, coinPrice, coinMarketCap);
            res.push(m);

        }

        return res;

    }

    })
    .catch(function (error) {
        console.log(error);
        //console.log('Ups. Something went wrong, please try again latter....');

        return 'Ups. Something went wrong, please try again latter....'
    });
}

module.exports.getMarketCapData = getMarketCapData;