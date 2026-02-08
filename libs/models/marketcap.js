export class MarketCap {
  /**
   * @param {number} rank
   * @param {string} name
   * @param {string} symbol
   * @param {string|number} price
   * @param {string|number} marketCap
   * @param {number} percentChange24h
   * @param {string} error
   */
  constructor(rank, name, symbol, price, marketCap, percentChange24h, error) {
    this.rank = rank;
    this.name = name;
    this.symbol = symbol;
    this.price = price;
    this.marketCap = marketCap;
    this.percentChange24h = percentChange24h;
    this.error = error;
  }
}
