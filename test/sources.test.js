import { describe, it, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';

// We need to mock fetch before importing sources
const originalFetch = globalThis.fetch;

describe('kraken source', () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('parses a successful response', async () => {
    globalThis.fetch = mock.fn(async () => ({
      json: async () => ({
        error: [],
        result: {
          'XXRPZUSD': {
            c: ['0.5234', '100'],
            h: ['0.5400', '0.5500'],
            l: ['0.5100', '0.5000']
          }
        }
      })
    }));

    const { getDataByCoin } = await import('../libs/sources/kraken.js');
    const coin = await getDataByCoin('XRP');
    assert.equal(coin.source, 'kraken.com');
    assert.equal(coin.error, '');
    assert.equal(coin.currentPrice, '0.5234');
  });

  it('handles API errors', async () => {
    globalThis.fetch = mock.fn(async () => ({
      json: async () => ({
        error: ['Unknown pair']
      })
    }));

    const { getDataByCoin } = await import('../libs/sources/kraken.js');
    const coin = await getDataByCoin('INVALID');
    assert.equal(coin.source, 'kraken.com');
    assert.equal(coin.error, 'Unknown pair');
  });

  it('handles fetch errors gracefully', async () => {
    globalThis.fetch = mock.fn(async () => {
      throw new Error('Network error');
    });

    const { getDataByCoin } = await import('../libs/sources/kraken.js');
    const coin = await getDataByCoin('BTC');
    assert.equal(coin.source, 'kraken.com');
    assert.ok(coin.error.length > 0);
  });
});

describe('coinbase source', () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('parses a successful response', async () => {
    globalThis.fetch = mock.fn(async () => ({
      json: async () => ({
        data: { amount: '50000.1234', currency: 'USD' }
      })
    }));

    const { getDataByCoin } = await import('../libs/sources/coinbase.js');
    const coin = await getDataByCoin('BTC');
    assert.equal(coin.source, 'coinbase.com');
    assert.equal(coin.error, '');
    assert.equal(coin.currentPrice, '50,000.1234');
  });

  it('handles fetch errors gracefully', async () => {
    globalThis.fetch = mock.fn(async () => {
      throw new Error('Network error');
    });

    const { getDataByCoin } = await import('../libs/sources/coinbase.js');
    const coin = await getDataByCoin('BTC');
    assert.equal(coin.source, 'coinbase.com');
    assert.ok(coin.error.length > 0);
  });
});

describe('coingecko source', () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('parses a successful USD response', async () => {
    globalThis.fetch = mock.fn(async () => ({
      json: async () => ({
        bitcoin: { usd: 50000.5678 }
      })
    }));

    const { getDataByCoin } = await import('../libs/sources/coingecko.js');
    const coin = await getDataByCoin('BTC', 'USD');
    assert.equal(coin.source, 'coingecko.com');
    assert.equal(coin.error, '');
    assert.equal(coin.currentPrice, '50,000.5678');
    assert.equal(coin.convertedPrice, null);
  });

  it('parses a response with currency conversion', async () => {
    globalThis.fetch = mock.fn(async () => ({
      json: async () => ({
        bitcoin: { usd: 50000, eur: 42500 }
      })
    }));

    const { getDataByCoin } = await import('../libs/sources/coingecko.js');
    const coin = await getDataByCoin('BTC', 'EUR');
    assert.equal(coin.currentPrice, '50,000.0000');
    assert.equal(coin.convertedPrice, '42,500.0000');
  });

  it('returns error for unknown coin', async () => {
    globalThis.fetch = mock.fn(async () => ({
      json: async () => ({})
    }));

    const { getDataByCoin } = await import('../libs/sources/coingecko.js');
    const coin = await getDataByCoin('FAKECOIN', 'USD');
    assert.equal(coin.error, 'Coin not found');
  });

  it('handles fetch errors gracefully', async () => {
    globalThis.fetch = mock.fn(async () => {
      throw new Error('Network error');
    });

    const { getDataByCoin } = await import('../libs/sources/coingecko.js');
    const coin = await getDataByCoin('BTC', 'USD');
    assert.equal(coin.source, 'coingecko.com');
    assert.ok(coin.error.length > 0);
  });
});
