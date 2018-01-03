class MarketCap {

    constructor(rank, name, symbol, price, marketCap, error){
        this.rank = rank;
        this.name = name;
        this.symbol = symbol;
        this.price = price;
        this.marketCap = marketCap;
        this.error = error;
    }

}

module.exports.MarketCap = MarketCap;