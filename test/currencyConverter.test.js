import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { convertPrice } from '../libs/currencyConverter.js';

describe('convertPrice', () => {
  it('converts a numeric price', () => {
    const result = convertPrice(100, 0.85);
    assert.equal(result, '85.0000');
  });

  it('converts a string price', () => {
    const result = convertPrice('1,000.5000', 0.85);
    assert.equal(result, '850.4250');
  });

  it('formats large results with commas', () => {
    const result = convertPrice('50,000.0000', 0.85);
    assert.equal(result, '42,500.0000');
  });

  it('returns null for missing price', () => {
    assert.equal(convertPrice(null, 0.85), null);
    assert.equal(convertPrice(undefined, 0.85), null);
  });

  it('returns null for missing exchange rate', () => {
    assert.equal(convertPrice(100, null), null);
    assert.equal(convertPrice(100, 0), null);
  });

  it('returns null for NaN price', () => {
    assert.equal(convertPrice('not-a-number', 0.85), null);
  });

  it('handles zero price', () => {
    assert.equal(convertPrice(0, 0.85), null);
  });
});
