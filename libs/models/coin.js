class Coin {

    constructor(symbol, currentPrice, high, low, source, error){
        this.symbol = symbol;
        this.currentPrice = currentPrice;
        this.high = high;
        this.low = low;
        this.source = source;
        this.error = error;
    }

}

module.exports.Coin = Coin;