module.exports.Options = class Options {

    constructor(tickers, currency, topCoinsLimit, silent) {
        this.rawTickers = tickers;
        this.rawCurrency = currency;
        this.rawtopCoinsLimit = topCoinsLimit;
        this.rawsilent = silent;
    }

    get tickers() {
        return !!this.rawTickers ? this.rawTickers : 0;
    }

    get tickerCount() {
        return !!this.rawTickers ? this.rawTickers.length : 0;
    }

    get topCoinsLimit() {
        return !!this.rawtopCoinsLimit ? this.rawtopCoinsLimit : 15;
    }

    get showMarketData() {
        if (!!this.rawtopCoinsLimit) {
            return true
        } 

        return this.tickerCount == 0;
    }

    get showHelpSection() {
        return !this.rawsilent
    }
}