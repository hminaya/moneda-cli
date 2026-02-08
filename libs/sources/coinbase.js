import { Coin } from '../models/coin.js';
import { numberWithCommas } from '../helpers.js';

/**
 * @param {string} symbol - Ticker symbol (e.g. "BTC", "ETH")
 * @returns {Promise<Coin>}
 */
export async function getDataByCoin(symbol) {
  const coinbaseSymbol = convertSymbolToId(symbol);

  try {
    const response = await fetch(`https://api.coinbase.com/v2/prices/${coinbaseSymbol}/spot`);
    const data = await response.json();

    if (data.error && data.error.length > 0) {
      return new Coin(symbol, 0, 0, 0, 'coinbase.com', data.error.message);
    }

    const coinPrice = numberWithCommas(parseFloat(data.data.amount).toFixed(4));
    return new Coin(symbol, coinPrice, '', '', 'coinbase.com', '');
  } catch {
    return new Coin(symbol, 0, 0, 0, 'coinbase.com', 'Something went wrong, please try again later.');
  }
}

/**
 * @param {string} symbol
 * @returns {string}
 */
function convertSymbolToId(symbol) {
  switch (symbol) {
    case 'BTC': return 'BTC-USD';
    case 'ETH': return 'ETH-USD';
    case 'BCH': return 'BCH-USD';
    default: return symbol;
  }
}
