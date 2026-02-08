export class Options {
  /**
   * @param {string[]|undefined} tickers
   * @param {string|undefined} currency
   * @param {number|undefined} topCoinsLimit
   * @param {number|undefined} seconds
   * @param {boolean|undefined} help
   */
  constructor(tickers, currency, topCoinsLimit, seconds, help) {
    this.rawTickers = tickers;
    this.rawCurrency = currency;
    this.rawtopCoinsLimit = topCoinsLimit;
    this.rawSeconds = seconds;
    this.rawhelp = help;
  }

  /** @returns {string[]|number} */
  get tickers() {
    return this.rawTickers || 0;
  }

  /** @returns {number} */
  get tickerCount() {
    return this.rawTickers ? this.rawTickers.length : 0;
  }

  /** @returns {number} */
  get topCoinsLimit() {
    return this.rawtopCoinsLimit || 15;
  }

  /** @returns {boolean} */
  get showMarketData() {
    if (this.rawtopCoinsLimit) return true;
    return this.tickerCount === 0;
  }

  /** @returns {boolean} */
  get showHelpSection() {
    return !!this.rawhelp;
  }

  /** @returns {string} */
  get currency() {
    return this.rawCurrency ? this.rawCurrency.toUpperCase() : 'USD';
  }

  /** @returns {number|null} */
  get seconds() {
    return this.rawSeconds || null;
  }

  /** @returns {number} */
  get refreshInterval() {
    if (this.rawSeconds && this.rawSeconds !== true) {
      return this.rawSeconds;
    }
    return 30;
  }
}
