import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getCoinSymbol, getCurrencySymbol, generatePricePerCoinTable, generateMarketDataTable
} from '../libs/tables.js';
import { Coin } from '../libs/models/coin.js';
import { MarketCap } from '../libs/models/marketcap.js';

describe('getCoinSymbol', () => {
  it('returns correct symbol for known tickers', () => {
    assert.equal(getCoinSymbol('BTC'), '\u20bf');
    assert.equal(getCoinSymbol('ETH'), '\u039e');
    assert.equal(getCoinSymbol('XRP'), '\u2715');
  });

  it('returns diamond for unknown tickers', () => {
    assert.equal(getCoinSymbol('UNKNOWN'), '\u25c6');
  });
});

describe('getCurrencySymbol', () => {
  it('returns correct symbol for known currencies', () => {
    assert.equal(getCurrencySymbol('USD'), '$');
    assert.equal(getCurrencySymbol('EUR'), '\u20ac');
    assert.equal(getCurrencySymbol('GBP'), '\u00a3');
  });

  it('returns uppercase code for unknown currencies', () => {
    assert.equal(getCurrencySymbol('xyz'), 'XYZ ');
  });

  it('is case-insensitive', () => {
    assert.equal(getCurrencySymbol('usd'), '$');
    assert.equal(getCurrencySymbol('Eur'), '\u20ac');
  });
});

describe('generatePricePerCoinTable', () => {
  it('generates a table with USD prices', () => {
    const coins = [
      new Coin('BTC', '50,000.0000', '', '', 'kraken.com', ''),
      new Coin('BTC', '50,100.0000', '', '', 'coinbase.com', ''),
      new Coin('BTC', '50,050.0000', '', '', 'coingecko.com', '')
    ];
    const table = generatePricePerCoinTable(coins, 'USD');
    const output = table.toString();
    assert.ok(output.includes('kraken.com'));
    assert.ok(output.includes('coinbase.com'));
    assert.ok(output.includes('coingecko.com'));
  });

  it('adds converted column for non-USD currencies', () => {
    const coins = [
      new Coin('BTC', '50,000.0000', '', '', 'kraken.com', '', '42,500.0000'),
    ];
    const table = generatePricePerCoinTable(coins, 'EUR');
    const output = table.toString();
    assert.ok(output.includes('42,500.0000'));
  });

  it('shows "No data found" when all coins have errors', () => {
    const coins = [
      new Coin('XYZ', 0, 0, 0, 'kraken.com', 'Not found'),
    ];
    const table = generatePricePerCoinTable(coins, 'USD');
    const output = table.toString();
    assert.ok(output.includes('No data found'));
  });

  it('skips coins with errors', () => {
    const coins = [
      new Coin('BTC', '50,000.0000', '', '', 'kraken.com', ''),
      new Coin('BTC', 0, 0, 0, 'coinbase.com', 'Error occurred'),
    ];
    const table = generatePricePerCoinTable(coins, 'USD');
    const output = table.toString();
    assert.ok(output.includes('kraken.com'));
    assert.ok(!output.includes('coinbase.com'));
  });
});

describe('generateMarketDataTable', () => {
  it('generates a table with market data', () => {
    const data = [
      new MarketCap(1, 'Bitcoin', 'BTC', '50,000', '1,000,000,000', 2.5, ''),
      new MarketCap(2, 'Ethereum', 'ETH', '3,000', '500,000,000', -1.2, '')
    ];
    const table = generateMarketDataTable(data);
    const output = table.toString();
    assert.ok(output.includes('Bitcoin'));
    assert.ok(output.includes('Ethereum'));
    assert.ok(output.includes('2.5 %'));
  });
});
