const axios = require('axios')
const coin = require('./../models/coin.js')
const helpers = require('./../helpers.js')

function getDataByCoin(symbol){

    return axios.get('https://www.bitstamp.net/api/v2/ticker/' + symbol + 'USD')
        .then(function (response) {
            // Check for errors
            if (response.data.error && response.data.error !== '') {
                return new coin.Coin(symbol, 0, 0, 0, 'bitstamp.net', response.data.error);
            }
            
            // Get data
            let coinPrice = helpers.numberWithCommas(parseFloat(response.data.last).toFixed(4));
            let coinLow = helpers.numberWithCommas(parseFloat(response.data.low).toFixed(4).toLocaleString());
            let coinHigh = helpers.numberWithCommas(parseFloat(response.data.high).toFixed(4));

            return new coin.Coin(symbol, coinPrice, coinHigh, coinLow, 'bitstamp.net', '');
        })
        .catch(function (err) {
            console.log('Error occurred: ' + err); //TODO: change for Winston or better logger

            return new coin.Coin(
                symbol, 0, 0, 0, 'bitstamp.net', 'Ups. Something went wrong, please try again latter....');
        });

}

module.exports.getDataByCoin = getDataByCoin;