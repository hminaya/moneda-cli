#!/usr/bin/env node

// Dependencies
const colors = require('colors')
const ora = require('ora')
const axios = require('axios')
const Table = require('cli-table3')
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

// Command line Args

const optionDefinitions = [
    { name: 'ticker', type: String, alias: 't', multiple: true, defaultOption: true},
    { name: 'market', type: Number, alias: 'm'},
    { name: 'silent', type: Boolean, alias: 's'}
  ]

const options = commandLineArgs(optionDefinitions)

let cliOptions = helpers.cleanUpCommandLineOptions(options);

if (cliOptions.showHelpSection){
    usage.showUsage();
}

// Let the magic begin
const coolSpinner = ora('Loading crypto magic').start()

// Get Data
if (cliOptions.showMarketData){
    getMarketCapData(cliOptions.topCoinsLimit);
}

for(let i = 0; i < cliOptions.tickerCount; i++) {
    getDataPerCoin(cliOptions.tickers[i]);
}

    function getMarketCapData(topCoinsLimit){

        market.getMarketCapData(topCoinsLimit).then((response) => {
            const table = tables.generateMarketDataTable(response);
        
            console.log('\n');
            console.log(' Market Top ' + topCoinsLimit);
            console.log(table.toString());

            coolSpinner.stop();
         });
    }

    function getDataPerCoin(coin){
        axios.all([
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
        
            const table = tables.generatePricePerCoinTable(res);
        
            console.log('\n');
            console.log(' Ticker: ' + coin);
            console.log(table.toString());

            coolSpinner.stop();
        }));
    }
