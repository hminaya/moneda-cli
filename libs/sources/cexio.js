const axios = require('axios')
const coin = require('./../models/coin.js')
const helpers = require('./../helpers.js')

function getDataByCoin(symbol){

    return axios.get('https://cex.io/api/ticker/' + symbol + '/USD')
        .then(function (response) {
            // Check for errors
            if (response.data.error && response.data.error !== '') {
                return new coin.Coin(symbol, 0, 0, 0, 'cex.io', response.data.error);
            }
            
            // Get data
            let coinPrice = helpers.numberWithCommas(parseFloat(response.data.last).toFixed(4));
            let coinLow = helpers.numberWithCommas(parseFloat(response.data.low).toFixed(4).toLocaleString());
            let coinHigh = helpers.numberWithCommas(parseFloat(response.data.high).toFixed(4));

            return new coin.Coin(symbol, coinPrice, coinHigh, coinLow, 'cex.io', '');
        })
        .catch(function (err) { //TODO: Logs
            return new coin.Coin(symbol, 0, 0, 0, 'cex.io', 'Ups. Something went wrong, please try again latter....');
        });

}

module.exports.getDataByCoin = getDataByCoin;