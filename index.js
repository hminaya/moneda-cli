#!/usr/bin/env node

// Dependencies
const colors = require('colors')
const ora = require('ora')
const axios = require('axios')
const Table = require('cli-table2')
const commandLineArgs = require('command-line-args')

// Sources
const cexio = require('./libs/sources/cexio.js')
const bitstamp = require('./libs/sources/bitstamp.js')
const market = require('./libs/sources/coinmarketcap.js')
const kraken = require('./libs/sources/kraken.js')
const coinbase = require('./libs/sources/coinbase.js')

// Other
const tables = require('./libs/tables.js')
const usage = require('./libs/usage.js')
const helpers = require('./libs/helpers.js')
const outputs = require('./libs/outputs')

// Command line Args

const optionDefinitions = [
    { name: 'ticker', type: String, alias: 't', multiple: true, defaultOption: true},
    { name: 'market', type: Number, alias: 'm'},
    { name: 'silent', type: Boolean, alias: 's'},
    { name: 'output', type: String, alias: 'o', defaultOption: 'default' }
  ]

const options = commandLineArgs(optionDefinitions)

let cliOptions = helpers.cleanUpCommandLineOptions(options);

if (cliOptions.showHelpSection){
    usage.showUsage();
}

function getSpinner(options) {
    if ((!options.output) || (options.output == 'default')) {
        return ora('Loading crypto magic');
    }
    return {
        start: function () {
            return {
                stop: function () {}
            }
        }
    };
}

// Let the magic begin
const coolSpinner = getSpinner(cliOptions).start();

let output = outputs[cliOptions.output];

// Get Data
if (cliOptions.showMarketData){
    getMarketCapData(cliOptions.topCoinsLimit);
}

if (cliOptions.tickerCount) {
	let seed = Promise.resolve(true),
		result = [];
	for(let i = 0; i < cliOptions.tickerCount; i++) {
		let coin = cliOptions.tickers[i];
		seed = seed.then(function () {
			return getDataPerCoin(coin).then(function (data) {
				result.push(data);
			});
		});
	}
	seed.then(function () {
		output.summarizedCoinData(result);
	});
}

    function getMarketCapData(topCoinsLimit){
        market.getMarketCapData(topCoinsLimit).then((response) => {
            const table = tables.generateMarketDataTable(response);

            output.marketCapData(table, topCoinsLimit);

            coolSpinner.stop();
         });
    }

    function getDataPerCoin(coin){
        return axios.all([
            cexio.getDataByCoin(coin),
            bitstamp.getDataByCoin(coin),
            kraken.getDataByCoin(coin),
            coinbase.getDataByCoin(coin),
            market.getDataByCoin(coin)
        ])
        .then(axios.spread(function (priceCex, priceBt, priceKraken, priceCoinbase, priceMkt) {
          
            const res = [];
            res.push(priceCex);
            res.push(priceBt);
            res.push(priceKraken);
            res.push(priceCoinbase);
            res.push(priceMkt);

            let result = output.dataPerCoin(tables, res, coin);

            coolSpinner.stop();
            return result;
        }));
    }
