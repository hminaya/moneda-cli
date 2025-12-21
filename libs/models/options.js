class Options {

    constructor(tickers, currency, topCoinsLimit, seconds, help){

        this.rawTickers = tickers;
        this.rawCurrency = currency;
        this.rawtopCoinsLimit = topCoinsLimit;
        this.rawSeconds = seconds;
        this.rawhelp = help;

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

        if ( typeof this.rawhelp !== 'undefined' && this.rawhelp ){
            return true;
        }else {
            return false;
        }
    }

    get currency(){
        if ( typeof this.rawCurrency !== 'undefined' && this.rawCurrency ){
            return this.rawCurrency.toUpperCase();
        }else {
            return 'USD';
        }
    }

    get seconds(){
        if ( typeof this.rawSeconds !== 'undefined' && this.rawSeconds ){
            return this.rawSeconds;
        }else {
            return null;
        }
    }

    get refreshInterval(){
        // Always default to 30 seconds
        if ( typeof this.rawSeconds !== 'undefined' && this.rawSeconds ){
            // If a custom value is provided, use it
            if (this.rawSeconds !== true) {
                return this.rawSeconds;
            }
        }
        // Default to 30 seconds in all cases
        return 30;
    }

}

module.exports.Options = Options;