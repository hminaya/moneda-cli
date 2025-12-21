#!/usr/bin/env node

// Dependencies
const colors = require('colors')
const ora = require('ora')
const commandLineArgs = require('command-line-args')

// Sources
const kraken = require('./libs/sources/kraken.js')
const coinbase = require('./libs/sources/coinbase.js')
const coingecko = require('./libs/sources/coingecko.js')

// Other
const tables = require('./libs/tables.js')
const usage = require('./libs/usage.js')
const helpers = require('./libs/helpers.js')
const currencyConverter = require('./libs/currencyConverter.js')

// Command line Args - normalize to lowercase for case-insensitive flags
const normalizedArgs = process.argv.slice(2).map(arg => {
    if (arg.startsWith('-')) {
        return arg.toLowerCase();
    }
    return arg;
});

const optionDefinitions = [
    { name: 'ticker', type: String, alias: 't', multiple: true, defaultOption: true},
    { name: 'market', type: Number, alias: 'm'},
    { name: 'silent', type: Boolean, alias: 's'},
    { name: 'help', type: Boolean, alias: 'h'},
    { name: 'currency', type: String, alias: 'c'}
  ]

const options = commandLineArgs(optionDefinitions, { argv: normalizedArgs })

let cliOptions = helpers.cleanUpCommandLineOptions(options);

if (cliOptions.showHelpSection){
    usage.showUsage();
    process.exit(0);
}

// Let the magic begin
const coolSpinner = ora('Loading crypto prices').start()

// Get Data - default to BTC if no ticker specified
const tickersToFetch = cliOptions.tickerCount === 0 ? ['BTC'] : cliOptions.tickers;
const targetCurrency = cliOptions.currency || 'USD';

// Get all coin data
Promise.all(tickersToFetch.map(ticker => getDataPerCoin(ticker, targetCurrency)))
    .then(() => {
        tables.showDonationFooter();
        coolSpinner.stop();
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        coolSpinner.stop();
    });

function getDataPerCoin(coin, targetCurrency){
    return Promise.all([
        kraken.getDataByCoin(coin),
        coinbase.getDataByCoin(coin),
        coingecko.getDataByCoin(coin, targetCurrency)
    ])
    .then(function ([priceKraken, priceCoinbase, priceCoingecko]) {

        // Use CoinGecko's prices to calculate exchange rate for Kraken and Coinbase
        if (targetCurrency.toUpperCase() !== 'USD' && priceCoingecko.convertedPrice && priceCoingecko.currentPrice) {
            // Calculate exchange rate from CoinGecko's data
            const coingeckoUSD = parseFloat(priceCoingecko.currentPrice.replace(/,/g, ''));
            const coingeckoConverted = parseFloat(priceCoingecko.convertedPrice.replace(/,/g, ''));
            const exchangeRate = coingeckoConverted / coingeckoUSD;

            // Apply to Kraken and Coinbase
            priceKraken.convertedPrice = currencyConverter.convertPrice(priceKraken.currentPrice, exchangeRate);
            priceCoinbase.convertedPrice = currencyConverter.convertPrice(priceCoinbase.currentPrice, exchangeRate);
        }

        const res = [];
        res.push(priceKraken);
        res.push(priceCoinbase);
        res.push(priceCoingecko);

        const table = tables.generatePricePerCoinTable(res, targetCurrency);
        const coinSymbol = tables.getCoinSymbol(coin);

        console.log('\n');
        console.log(colors.bold.cyan(` ${coinSymbol} ${coin}`));
        console.log(table.toString());
    });
}
