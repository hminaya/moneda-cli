import { Coin } from '../models/coin.js';
import { numberWithCommas } from '../helpers.js';

/**
 * @param {string} symbol - Ticker symbol (e.g. "BTC", "ETH")
 * @param {string} [targetCurrency='USD']
 * @returns {Promise<Coin>}
 */
export async function getDataByCoin(symbol, targetCurrency) {
  const coinId = convertSymbolToId(symbol);
  targetCurrency = targetCurrency || 'USD';

  let currencies = 'usd';
  if (targetCurrency.toLowerCase() !== 'usd') {
    currencies = `usd,${targetCurrency.toLowerCase()}`;
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${currencies}`
    );
    const data = await response.json();

    if (!data[coinId]) {
      return new Coin(symbol, 0, 0, 0, 'coingecko.com', 'Coin not found');
    }

    const coinPrice = numberWithCommas(parseFloat(data[coinId].usd).toFixed(4));

    let convertedPrice = null;
    if (targetCurrency.toLowerCase() !== 'usd' && data[coinId][targetCurrency.toLowerCase()]) {
      convertedPrice = numberWithCommas(parseFloat(data[coinId][targetCurrency.toLowerCase()]).toFixed(4));
    }

    return new Coin(symbol, coinPrice, '', '', 'coingecko.com', '', convertedPrice);
  } catch {
    return new Coin(symbol, 0, 0, 0, 'coingecko.com', 'Something went wrong, please try again later.');
  }
}

/**
 * @param {string} symbol
 * @returns {string}
 */
function convertSymbolToId(symbol) {
  switch (symbol) {
    case 'BTC': return 'bitcoin';
    case 'ETH': return 'ethereum';
    case 'XRP': return 'ripple';
    case 'BCH': return 'bitcoin-cash';
    case 'LTC': return 'litecoin';
    case 'DASH': return 'dash';
    case 'XMR': return 'monero';
    case 'ADA': return 'cardano';
    case 'XLM': return 'stellar';
    case 'MIOTA': return 'iota';
    default: return symbol.toLowerCase();
  }
}
