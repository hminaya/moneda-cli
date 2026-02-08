import { numberWithCommas } from './helpers.js';

// Cache for exchange rates (valid for 5 minutes)
let exchangeRateCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * @param {string} targetCurrency
 * @returns {Promise<number>}
 */
export async function getExchangeRate(targetCurrency) {
  if (targetCurrency.toUpperCase() === 'USD') return 1;

  const now = Date.now();
  if (exchangeRateCache &&
      exchangeRateCache.currency === targetCurrency.toUpperCase() &&
      cacheTimestamp &&
      (now - cacheTimestamp) < CACHE_DURATION) {
    return exchangeRateCache.rate;
  }

  try {
    const response = await fetch('https://api.coingecko.com/api/v3/exchange_rates');
    const data = await response.json();
    const rates = data.rates;
    const targetRate = rates[targetCurrency.toLowerCase()];

    if (!targetRate) {
      console.error(`Currency ${targetCurrency} not found. Using USD.`);
      return 1;
    }

    const usdRate = rates.usd.value;
    const rate = targetRate.value / usdRate;

    exchangeRateCache = { currency: targetCurrency.toUpperCase(), rate };
    cacheTimestamp = now;

    return rate;
  } catch (error) {
    console.error('Error fetching exchange rate:', error.message);
    return 1;
  }
}

/**
 * @param {string|number} usdPrice
 * @param {number} exchangeRate
 * @returns {string|null}
 */
export function convertPrice(usdPrice, exchangeRate) {
  if (!usdPrice || !exchangeRate) return null;

  const numericPrice = typeof usdPrice === 'string'
    ? parseFloat(usdPrice.replace(/,/g, ''))
    : parseFloat(usdPrice);

  if (isNaN(numericPrice)) return null;

  const converted = numericPrice * exchangeRate;
  return numberWithCommas(converted.toFixed(4));
}
