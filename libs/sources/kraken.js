import { Coin } from '../models/coin.js';
import { numberWithCommas } from '../helpers.js';

/**
 * @param {string} symbol - Ticker symbol (e.g. "BTC", "ETH")
 * @returns {Promise<Coin>}
 */
export async function getDataByCoin(symbol) {
  const krakenSymbol = convertSymbolToId(symbol);

  try {
    const response = await fetch(`https://api.kraken.com/0/public/Ticker?pair=${krakenSymbol}`);
    const data = await response.json();

    if (data.error && data.error.length > 0) {
      return new Coin(symbol, 0, 0, 0, 'kraken.com', data.error[0]);
    }

    const result = data.result[krakenSymbol];
    const coinPrice = numberWithCommas(parseFloat(result.c[0]).toFixed(4));
    const coinLow = numberWithCommas(parseFloat(result.l[0]).toFixed(4));
    const coinHigh = numberWithCommas(parseFloat(result.h[0]).toFixed(4));

    return new Coin(symbol, coinPrice, coinHigh, coinLow, 'kraken.com', '');
  } catch {
    return new Coin(symbol, 0, 0, 0, 'kraken.com', 'Something went wrong, please try again later.');
  }
}

/**
 * @param {string} symbol
 * @returns {string}
 */
function convertSymbolToId(symbol) {
  switch (symbol) {
    case 'XRP': return 'XXRPZUSD';
    case 'ETH': return 'XETHZUSD';
    case 'BCH': return 'BCHUSD';
    case 'LTC': return 'XLTCZUSD';
    case 'DASH': return 'DASHUSD';
    case 'XMR': return 'XXMRZUSD';
    default: return symbol;
  }
}
