const axios = require('axios');

// Cache for exchange rates (valid for 5 minutes)
let exchangeRateCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getExchangeRate(targetCurrency) {
    // Return 1 if USD (no conversion needed)
    if (targetCurrency.toUpperCase() === 'USD') {
        return 1;
    }

    // Check cache
    const now = Date.now();
    if (exchangeRateCache &&
        exchangeRateCache.currency === targetCurrency.toUpperCase() &&
        cacheTimestamp &&
        (now - cacheTimestamp) < CACHE_DURATION) {
        return exchangeRateCache.rate;
    }

    try {
        // Fetch exchange rates from CoinGecko
        const response = await axios.get('https://api.coingecko.com/api/v3/exchange_rates');

        const rates = response.data.rates;
        const targetRate = rates[targetCurrency.toLowerCase()];

        if (!targetRate) {
            console.error(`Currency ${targetCurrency} not found. Using USD.`);
            return 1;
        }

        // CoinGecko returns rates relative to BTC, we need USD to target currency
        // Formula: USD -> BTC -> Target
        const usdRate = rates.usd.value;
        const rate = targetRate.value / usdRate;

        // Update cache
        exchangeRateCache = {
            currency: targetCurrency.toUpperCase(),
            rate: rate
        };
        cacheTimestamp = now;

        return rate;
    } catch (error) {
        console.error('Error fetching exchange rate:', error.message);
        return 1; // Default to no conversion on error
    }
}

function convertPrice(usdPrice, exchangeRate) {
    if (!usdPrice || !exchangeRate) {
        return null;
    }

    // Handle string prices with commas
    let numericPrice;
    if (typeof usdPrice === 'string') {
        numericPrice = parseFloat(usdPrice.replace(/,/g, ''));
    } else {
        numericPrice = parseFloat(usdPrice);
    }

    if (isNaN(numericPrice)) {
        return null;
    }

    const converted = numericPrice * exchangeRate;

    return converted.toFixed(4).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

module.exports = {
    getExchangeRate,
    convertPrice
};
