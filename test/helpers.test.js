import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { numberWithCommas, cleanUpCommandLineOptions, colorizeNumber } from '../libs/helpers.js';

describe('numberWithCommas', () => {
  it('formats integers with commas', () => {
    assert.equal(numberWithCommas(1000), '1,000');
    assert.equal(numberWithCommas(1000000), '1,000,000');
  });

  it('formats decimals with commas in integer part only', () => {
    assert.equal(numberWithCommas(1234567.8901), '1,234,567.8901');
  });

  it('leaves small numbers unchanged', () => {
    assert.equal(numberWithCommas(999), '999');
    assert.equal(numberWithCommas(0), '0');
  });

  it('handles string input', () => {
    assert.equal(numberWithCommas('50000'), '50,000');
  });
});

describe('cleanUpCommandLineOptions', () => {
  it('returns Options with tickers', () => {
    const opts = cleanUpCommandLineOptions({ ticker: ['BTC', 'ETH'] });
    assert.deepEqual(opts.tickers, ['BTC', 'ETH']);
    assert.equal(opts.tickerCount, 2);
  });

  it('returns defaults when no options given', () => {
    const opts = cleanUpCommandLineOptions({});
    assert.equal(opts.tickerCount, 0);
    assert.equal(opts.currency, 'USD');
    assert.equal(opts.refreshInterval, 30);
    assert.equal(opts.showHelpSection, false);
  });

  it('parses currency option', () => {
    const opts = cleanUpCommandLineOptions({ currency: 'eur' });
    assert.equal(opts.currency, 'EUR');
  });

  it('parses seconds option', () => {
    const opts = cleanUpCommandLineOptions({ seconds: 10 });
    assert.equal(opts.refreshInterval, 10);
  });

  it('parses help option', () => {
    const opts = cleanUpCommandLineOptions({ help: true });
    assert.equal(opts.showHelpSection, true);
  });
});

describe('colorizeNumber', () => {
  it('returns a string for positive numbers', () => {
    const result = colorizeNumber(5);
    assert.equal(typeof result, 'string');
  });

  it('returns a string for negative numbers', () => {
    const result = colorizeNumber(-3);
    assert.equal(typeof result, 'string');
  });

  it('uses custom text when provided', () => {
    const result = colorizeNumber(5, '5 %');
    assert.ok(result.includes('5 %'));
  });

  it('treats zero as non-negative', () => {
    const result = colorizeNumber(0);
    assert.ok(result.includes('0'));
  });
});
