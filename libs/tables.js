import pc from 'picocolors';
import Table from 'cli-table3';
import { colorizeNumber } from './helpers.js';

/**
 * @param {string} ticker
 * @returns {string}
 */
export function getCoinSymbol(ticker) {
  const symbols = {
    'BTC': '\u20bf',
    'ETH': '\u039e',
    'XRP': '\u2715',
    'BCH': '\u0e3f',
    'LTC': '\u0141',
    'DASH': '\u0110',
    'XMR': '\u0271',
    'ADA': '\u20b3',
    'XLM': '*',
    'MIOTA': '\u0268'
  };
  return symbols[ticker] || '\u25c6';
}

/**
 * @param {string} currency
 * @returns {string}
 */
export function getCurrencySymbol(currency) {
  const symbols = {
    'USD': '$',
    'EUR': '\u20ac',
    'GBP': '\u00a3',
    'JPY': '\u00a5',
    'CNY': '\u00a5',
    'AUD': 'A$',
    'CAD': 'C$',
    'CHF': 'CHF ',
    'KRW': '\u20a9',
    'INR': '\u20b9',
    'RUB': '\u20bd',
    'BRL': 'R$'
  };
  return symbols[currency.toUpperCase()] || currency.toUpperCase() + ' ';
}

/**
 * @param {import('./models/coin.js').Coin[]} coinData
 * @param {string} targetCurrency
 * @returns {Table}
 */
export function generatePricePerCoinTable(coinData, targetCurrency) {
  targetCurrency = targetCurrency || 'USD';
  const showConvertedColumn = targetCurrency.toUpperCase() !== 'USD';

  const headers = [
    pc.cyan('Source'),
    pc.cyan('Price (USD)')
  ];

  if (showConvertedColumn) {
    headers.push(pc.cyan(`Price (${targetCurrency.toUpperCase()})`));
  }

  const table = new Table({
    head: headers,
    style: { head: [], border: ['grey'] },
    chars: {
      'top': '\u2500', 'top-mid': '\u252c', 'top-left': '\u250c', 'top-right': '\u2510',
      'bottom': '\u2500', 'bottom-mid': '\u2534', 'bottom-left': '\u2514', 'bottom-right': '\u2518',
      'left': '\u2502', 'left-mid': '\u251c', 'mid': '\u2500', 'mid-mid': '\u253c',
      'right': '\u2502', 'right-mid': '\u2524', 'middle': '\u2502'
    }
  });

  for (const coin of coinData) {
    if (coin.error !== '') continue;

    const row = [
      pc.white(coin.source),
      pc.bold(pc.green('$' + coin.currentPrice))
    ];

    if (showConvertedColumn) {
      const currencySymbol = getCurrencySymbol(targetCurrency);
      const displayPrice = coin.convertedPrice || 'N/A';
      row.push(pc.bold(pc.yellow(currencySymbol + displayPrice)));
    }

    table.push(row);
  }

  if (table.length === 0) {
    const colSpan = showConvertedColumn ? 3 : 2;
    table.push([{ colSpan, content: 'No data found for ' + coinData[0].symbol }]);
  }

  return table;
}

/**
 * @param {import('./models/marketcap.js').MarketCap[]} coinMarketData
 * @returns {Table}
 */
export function generateMarketDataTable(coinMarketData) {
  const table = new Table({
    head: ['Rank', 'Name', 'Symbol',
      { hAlign: 'center', content: 'Price (USD)' },
      { hAlign: 'center', content: 'Market Cap (USD)' },
      { hAlign: 'center', content: 'Change (24h)' }
    ]
  });

  for (const coin of coinMarketData) {
    table.push([
      coin.rank,
      coin.name,
      coin.symbol,
      { hAlign: 'right', content: '$' + coin.price },
      { hAlign: 'right', content: '$' + coin.marketCap },
      { hAlign: 'right', content: colorizeNumber(coin.percentChange24h, `${coin.percentChange24h} %`) }
    ]);
  }

  return table;
}

export function showDonationFooter() {
  console.log('');
  console.log(pc.gray('\u2500'.repeat(60)));
  console.log(pc.gray('  \ud83d\udc9d Support development:'));
  console.log(pc.gray('  BTC: ') + pc.white('bc1qkmt89twaqz5hvq9676agxj8jgatfy4wgyyuuzc'));
  console.log(pc.gray('\u2500'.repeat(60)));
}
