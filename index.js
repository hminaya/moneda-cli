#!/usr/bin/env node

// Dependencies
const colors = require('colors')
const ora = require('ora')
const axios = require('axios')
const Table = require('cli-table2')

const cexio = require('./libs/sources/cexio.js')
const bitstamp = require('./libs/sources/bitstamp.js')
const market = require('./libs/sources/coinmarketcap.js')
const tables = require('./libs/tables.js')

// Args
let coin = process.argv.length > 2 ? process.argv[2].toUpperCase() : undefined;

console.log('')
console.log('╔═══════════════════════════════════════════════════╗');
console.log('║                                                   ║')
console.log('║ Moneda CLI                                        ║')
console.log('║ https://github.com/hminaya/moneda-cli             ║')
console.log('║                                                   ║')
console.log('╚═══════════════════════════════════════════════════╝');
console.log('')
const coolSpinner = ora('Loading crypto magic').start()

// Get Data
if ( typeof coin !== 'undefined' && coin )
{
    if (coin == 'MARKET'){
        getMarketCapData();
    }else{
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
            tips("");
         });
    }

    function getDataPerCoin(coin){
        axios.all([
            cexio.getDataByCoin(coin),
            bitstamp.getDataByCoin(coin),
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
            tips(coin);
        }));
    }

  function tips(coin){

    var rnd = Math.floor(Math.random() * 3) + 1  

    if (rnd == 1){

        console.log('');
        console.log('');
        console.log('If you would like to see this tool developed further consider sending over a tip');
        console.log('');
        console.log('| Coin               | Wallet                             | Destination Tag |');
        console.log('|--------------------|------------------------------------|-----------------|');
        console.log('| Bitcoin Cash (BCH) | 34R3g2mybySCY2JSTAk1PsKvbcPX5Jd63P |                 |');
        console.log('| Ripple (XRP)       | rE1sdh25BJQ3qFwngiTBwaq3zPGGYcrjp1 | 20293           |');
        console.log('| Bitcoin (BTC)      | 38c8kcc4tcZmb7DVn9LScxf4fMjCx3jVbU |                 |');
        console.log('| Dash               | 7XKuMxdQyBsLtvaHHuUgYP7o9yDtCqJvt7 |                 |');
        console.log('');

    }

  }
