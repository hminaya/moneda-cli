export class Coin {
  /**
   * @param {string} symbol
   * @param {string|number} currentPrice
   * @param {string|number} high
   * @param {string|number} low
   * @param {string} source
   * @param {string} error
   * @param {string|null} [convertedPrice]
   */
  constructor(symbol, currentPrice, high, low, source, error, convertedPrice) {
    this.symbol = symbol;
    this.currentPrice = currentPrice;
    this.high = high;
    this.low = low;
    this.source = source;
    this.error = error;
    this.convertedPrice = convertedPrice || null;
  }
}
