const axios = require('axios')
const coin = require('./../models/coin.js')
const helpers = require('./../helpers.js')

function getDataByCoin(symbol){

    return axios.get('https://cex.io/api/ticker/' + symbol + '/USD')
        .then(function (response) {

        // Check for errors
        if (response.data.error && response.data.error !== "") {

            var c = new coin.Coin(symbol, 0, 0, 0, "cex.io", response.data.error);
            return c;
            
		} else {
            // Get data
            let coinPrice = helpers.numberWithCommas(parseFloat(response.data.last).toFixed(4));
            let coinLow = helpers.numberWithCommas(parseFloat(response.data.low).toFixed(4).toLocaleString());
            let coinHigh = helpers.numberWithCommas(parseFloat(response.data.high).toFixed(4));

            var c = new coin.Coin(symbol, coinPrice, coinHigh, coinLow, "cex.io", "");
            return c;

        }

        })
        .catch(function (error) {
            //console.log(error);
            //console.log('Ups. Something went wrong, please try again latter....');

            var c = new coin.Coin(symbol, 0, 0, 0, "cex.io", 'Ups. Something went wrong, please try again latter....');
            return c;

        });

}

module.exports.getDataByCoin = getDataByCoin;