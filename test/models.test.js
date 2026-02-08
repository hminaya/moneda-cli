import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Coin } from '../libs/models/coin.js';
import { MarketCap } from '../libs/models/marketcap.js';
import { Options } from '../libs/models/options.js';

describe('Coin', () => {
  it('stores all constructor properties', () => {
    const coin = new Coin('BTC', '50,000.0000', '51,000.0000', '49,000.0000', 'kraken.com', '');
    assert.equal(coin.symbol, 'BTC');
    assert.equal(coin.currentPrice, '50,000.0000');
    assert.equal(coin.high, '51,000.0000');
    assert.equal(coin.low, '49,000.0000');
    assert.equal(coin.source, 'kraken.com');
    assert.equal(coin.error, '');
    assert.equal(coin.convertedPrice, null);
  });

  it('stores convertedPrice when provided', () => {
    const coin = new Coin('BTC', '50,000.0000', '', '', 'coingecko.com', '', '45,000.0000');
    assert.equal(coin.convertedPrice, '45,000.0000');
  });
});

describe('MarketCap', () => {
  it('stores all constructor properties', () => {
    const mc = new MarketCap(1, 'Bitcoin', 'BTC', '50000', '1000000000', 2.5, '');
    assert.equal(mc.rank, 1);
    assert.equal(mc.name, 'Bitcoin');
    assert.equal(mc.symbol, 'BTC');
    assert.equal(mc.price, '50000');
    assert.equal(mc.marketCap, '1000000000');
    assert.equal(mc.percentChange24h, 2.5);
    assert.equal(mc.error, '');
  });
});

describe('Options', () => {
  it('returns tickers when provided', () => {
    const opts = new Options(['BTC', 'ETH']);
    assert.deepEqual(opts.tickers, ['BTC', 'ETH']);
    assert.equal(opts.tickerCount, 2);
  });

  it('returns 0 for tickers when not provided', () => {
    const opts = new Options();
    assert.equal(opts.tickers, 0);
    assert.equal(opts.tickerCount, 0);
  });

  it('defaults currency to USD', () => {
    const opts = new Options();
    assert.equal(opts.currency, 'USD');
  });

  it('uppercases currency', () => {
    const opts = new Options(undefined, 'eur');
    assert.equal(opts.currency, 'EUR');
  });

  it('defaults topCoinsLimit to 15', () => {
    const opts = new Options();
    assert.equal(opts.topCoinsLimit, 15);
  });

  it('returns custom topCoinsLimit', () => {
    const opts = new Options(undefined, undefined, 25);
    assert.equal(opts.topCoinsLimit, 25);
  });

  it('showMarketData is true when no tickers', () => {
    const opts = new Options();
    assert.equal(opts.showMarketData, true);
  });

  it('showMarketData is false when tickers given', () => {
    const opts = new Options(['BTC']);
    assert.equal(opts.showMarketData, false);
  });

  it('showMarketData is true when topCoinsLimit given', () => {
    const opts = new Options(['BTC'], undefined, 10);
    assert.equal(opts.showMarketData, true);
  });

  it('showHelpSection returns false by default', () => {
    const opts = new Options();
    assert.equal(opts.showHelpSection, false);
  });

  it('showHelpSection returns true when help is set', () => {
    const opts = new Options(undefined, undefined, undefined, undefined, true);
    assert.equal(opts.showHelpSection, true);
  });

  it('defaults refreshInterval to 30', () => {
    const opts = new Options();
    assert.equal(opts.refreshInterval, 30);
  });

  it('returns custom refreshInterval', () => {
    const opts = new Options(undefined, undefined, undefined, 10);
    assert.equal(opts.refreshInterval, 10);
  });
});
