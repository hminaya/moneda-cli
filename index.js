#!/usr/bin/env node

// Dependencies
const colors = require('colors')
const ora = require('ora')
const axios = require('axios')
const Table = require('cli-table2')

// Sources
const cexio = require('./libs/sources/cexio.js')
const bitstamp = require('./libs/sources/bitstamp.js')
const market = require('./libs/sources/coinmarketcap.js')
const kraken = require('./libs/sources/kraken.js')

// Other
const tables = require('./libs/tables.js')

// Args
let coin = process.argv.length > 2 ? process.argv[2].toUpperCase() : undefined;
const coolSpinner = ora('Loading crypto magic').start()

// Get Data
if ( typeof coin !== 'undefined' && coin )
{
    if (coin == 'MARKET'){
        getMarketCapData();
    }else{
        coolSpinner.text = 'Loading crypto magic - ' + coin;
        getDataPerCoin(coin);
    }

} else {
    getMarketCapData();
}

    function getMarketCapData(){

        market.getMarketCapData().then((response) => {
            var tbl = tables.generateMarketDataTable(response);
        
            console.log('');
            console.log(tbl.toString());

            coolSpinner.stop();
            printFooter("");
         });
    }

    function getDataPerCoin(coin){
        axios.all([
            cexio.getDataByCoin(coin),
            bitstamp.getDataByCoin(coin),
            kraken.getDataByCoin(coin),
            market.getDataByCoin(coin)
        ])
        .then(axios.spread(function (priceCex, priceBt, priceMkt) {
          
            var res = [];
            res.push(priceCex);
            res.push(priceBt);
            res.push(priceMkt);
        
            var tbl = tables.generatePricePerCoinTable(res);
        
            console.log('');
            console.log(tbl.toString());

            coolSpinner.stop();
            printFooter(coin);
        }));
    }

  function printFooter(coin){

    var rnd = Math.floor(Math.random() * 4) + 1  

    if (rnd == 1){
        console.log('');
        console.log('');
        console.log('|---------------------------------------------------------------------------|');
        console.log('| Moneda CLI                                                                |');
        console.log('| https://github.com/hminaya/moneda-cli                                     |');
        console.log('|---------------------------------------------------------------------------|');
        console.log('| Donations:                                                                |');
        console.log('|--------------------|------------------------------------|-----------------|');
        console.log('| Coin               | Wallet                             | Destination Tag |');
        console.log('|--------------------|------------------------------------|-----------------|');
        console.log('| Bitcoin Cash (BCH) | 34R3g2mybySCY2JSTAk1PsKvbcPX5Jd63P |                 |');
        console.log('| Ripple (XRP)       | rE1sdh25BJQ3qFwngiTBwaq3zPGGYcrjp1 | 20293           |');
        console.log('| Bitcoin (BTC)      | 38c8kcc4tcZmb7DVn9LScxf4fMjCx3jVbU |                 |');
        console.log('| Dash               | 7XKuMxdQyBsLtvaHHuUgYP7o9yDtCqJvt7 |                 |');
        console.log('|---------------------------------------------------------------------------|');
        console.log('');

    }

  }
