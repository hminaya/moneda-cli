#!/usr/bin/env node

import pc from 'picocolors';
import ora from 'ora';
import commandLineArgs from 'command-line-args';

import * as kraken from './libs/sources/kraken.js';
import * as coinbase from './libs/sources/coinbase.js';
import * as coingecko from './libs/sources/coingecko.js';
import * as tables from './libs/tables.js';
import { showUsage } from './libs/usage.js';
import { cleanUpCommandLineOptions } from './libs/helpers.js';
import { convertPrice } from './libs/currencyConverter.js';

// Command line args - normalize to lowercase for case-insensitive flags
const normalizedArgs = process.argv.slice(2).map(arg =>
  arg.startsWith('-') ? arg.toLowerCase() : arg
);

const optionDefinitions = [
  { name: 'ticker', type: String, alias: 't', multiple: true, defaultOption: true },
  { name: 'market', type: Number, alias: 'm' },
  { name: 'seconds', type: Number, alias: 's' },
  { name: 'help', type: Boolean, alias: 'h' },
  { name: 'currency', type: String, alias: 'c' }
];

const options = commandLineArgs(optionDefinitions, { argv: normalizedArgs });
const cliOptions = cleanUpCommandLineOptions(options);

if (cliOptions.showHelpSection) {
  showUsage();
  process.exit(0);
}

let spinner = ora('Loading crypto prices').start();

const tickersToFetch = cliOptions.tickerCount === 0 ? ['BTC'] : cliOptions.tickers;
const targetCurrency = cliOptions.currency || 'USD';
const refreshInterval = cliOptions.refreshInterval;

/**
 * @param {string} coin
 * @param {string} targetCurrency
 */
async function getDataPerCoin(coin, targetCurrency) {
  const [priceKraken, priceCoinbase, priceCoingecko] = await Promise.all([
    kraken.getDataByCoin(coin),
    coinbase.getDataByCoin(coin),
    coingecko.getDataByCoin(coin, targetCurrency)
  ]);

  // Use CoinGecko's prices to calculate exchange rate for Kraken and Coinbase
  if (targetCurrency.toUpperCase() !== 'USD' && priceCoingecko.convertedPrice && priceCoingecko.currentPrice) {
    const coingeckoUSD = parseFloat(String(priceCoingecko.currentPrice).replace(/,/g, ''));
    const coingeckoConverted = parseFloat(String(priceCoingecko.convertedPrice).replace(/,/g, ''));
    const exchangeRate = coingeckoConverted / coingeckoUSD;

    priceKraken.convertedPrice = convertPrice(priceKraken.currentPrice, exchangeRate);
    priceCoinbase.convertedPrice = convertPrice(priceCoinbase.currentPrice, exchangeRate);
  }

  const coinData = [priceKraken, priceCoinbase, priceCoingecko];
  const table = tables.generatePricePerCoinTable(coinData, targetCurrency);
  const coinSymbol = tables.getCoinSymbol(coin);

  console.log('\n');
  console.log(pc.bold(pc.cyan(` ${coinSymbol} ${coin}`)));
  console.log(table.toString());
}

async function fetchAndDisplay() {
  try {
    await Promise.all(tickersToFetch.map(ticker => getDataPerCoin(ticker, targetCurrency)));
    tables.showDonationFooter();
    spinner.stop();

    if (refreshInterval) {
      const now = new Date();
      console.log(pc.gray('\nLast updated: ' + now.toLocaleTimeString()));
      console.log(pc.gray(`Refreshing every ${refreshInterval} seconds... (Press Ctrl+C to exit)`));
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    spinner.stop();
  }
}

// Initial fetch
fetchAndDisplay();

// Set up continuous refresh
if (refreshInterval) {
  setInterval(() => {
    console.clear();
    spinner = ora('Loading crypto prices').start();
    fetchAndDisplay();
  }, refreshInterval * 1000);
}
