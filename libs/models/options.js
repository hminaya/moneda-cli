class Options {

    constructor(tickers, currency, topCoinsLimit, silent, output){

        this.rawTickers = tickers;
        this.rawCurrency = currency;
        this.rawtopCoinsLimit = topCoinsLimit;
        this.rawsilent = silent;
        this.rawoutput = output;

    }

    get tickers(){
        if ( typeof this.rawTickers !== 'undefined' && this.rawTickers ){
            return this.rawTickers;
        }else {
            return 0;
        }
    }

    get tickerCount(){
        if ( typeof this.rawTickers !== 'undefined' && this.rawTickers ){
            return this.rawTickers.length;
        }else {
            return 0;
        }
    }

    get topCoinsLimit(){

        if ( typeof this.rawtopCoinsLimit !== 'undefined' && this.rawtopCoinsLimit ){
            return this.rawtopCoinsLimit;
        }else {
            return 15;
        }

    }
    get showMarketData(){

        if ( typeof this.rawtopCoinsLimit !== 'undefined' && this.rawtopCoinsLimit ){
            return true;
        }else {

            if (this.tickerCount == 0){
                return true;
            }else{
                return false;
            }

        }
    }

    get showHelpSection(){

        if ( typeof this.rawsilent !== 'undefined' && this.rawsilent ){
            return false;
        }else {
            return true;
        }
    }

    get output(){
        return this.rawoutput || 'default';
    }

}

module.exports.Options = Options;