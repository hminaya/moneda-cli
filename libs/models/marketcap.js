class MarketCap {

    constructor(rank, name, symbol, price, marketCap, percent_change_24h, error){
        this.rank = rank;
        this.name = name;
        this.symbol = symbol;
        this.price = price;
        this.marketCap = marketCap;
        this.percentChange24h = percent_change_24h;
        this.error = error;
    }

}

module.exports.MarketCap = MarketCap;