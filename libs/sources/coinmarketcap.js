const axios = require('axios')
const market = require('./../models/marketcap.js')
const coin = require('./../models/coin.js')
const helpers = require('./../helpers.js')

function getDataByCoin(symbol){

    return axios.get('https://api.coinmarketcap.com/v1/ticker/' + convertSymbolToId(symbol) + '/')
        .then(function (response) {
            // Check for errors
            if (response.data.error && response.data.error !== '') {
                return new coin.Coin(symbol, 0, 0, 0, 'coinmarketcap.com', response.data.error);
            }

            // Get data
            const info = response.data[0];
            let coinPrice = helpers.numberWithCommas(parseFloat(info.price_usd).toFixed(4));
            let coinLow = '';
            let coinHigh = '';

            return new coin.Coin(symbol, coinPrice, coinHigh, coinLow, 'coinmarketcap.com', '');
        })
        .catch(function (err) { //TODO: Logging
            return new coin.Coin(
                symbol, 0, 0, 0, 'coinmarketcap.com', 'Ups. Something went wrong, please try again latter....');
        });

}

function getMarketCapData(topCoinsLimit){
    return axios.get('https://api.coinmarketcap.com/v1/ticker/?limit='+topCoinsLimit)
        .then((response) => {

        // Check for errors
        if (response.data.error && response.data.error !== '') {
            return response.data.error;
        }

        // Get data
        const res = [];
        for(let i = 0; i < response.data.length; i++) {
            const coin = response.data[i];

            let coinRank = coin.rank;
            let coinName = coin.name;
            let coinSymbol = coin.symbol;
            let coinPrice = helpers.numberWithCommas(parseFloat(coin.price_usd).toFixed(4));
            let coinMarketCap = helpers.numberWithCommas(parseFloat(coin.market_cap_usd).toFixed(2));
            let percent_change_24h = helpers.numberWithCommas(parseFloat(coin.percent_change_24h).toFixed(2));

            res.push(new market.MarketCap(
                coinRank, coinName, coinSymbol, coinPrice, coinMarketCap, percent_change_24h));
        }

        return res;
    })
    .catch(function (err) { //TODO: Logging
        return 'Ups. Something went wrong, please try again latter....'
    });
}

function convertSymbolToId(symbol){

    switch (symbol) {

        case 'XRP':
            return 'ripple'
        case 'BTC':
            return 'bitcoin'
        case 'ETH':
            return 'ethereum'
        case 'BCH':
            return 'bitcoin-cash'
        case 'ADA':
            return 'cardano'
        case 'LTC':
            return 'litecoin'
        case 'XLM':
            return 'stellar'
        case 'XEM':
            return 'nem'
        case 'MIOTA':
            return 'iota'
        case 'DASH':
            return 'dash'
        case 'XMR':
            return 'monero'
        case 'BTG':
            return 'bitcoin-gold'

        default:
            return symbol;
    }

}

module.exports.getMarketCapData = getMarketCapData;
module.exports.getDataByCoin = getDataByCoin;