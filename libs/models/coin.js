class Coin {

    constructor(symbol, currentPrice, high, low, source, error, convertedPrice){
        this.symbol = symbol;
        this.currentPrice = currentPrice;
        this.high = high;
        this.low = low;
        this.source = source;
        this.error = error;
        this.convertedPrice = convertedPrice || null;
    }

}

module.exports.Coin = Coin;