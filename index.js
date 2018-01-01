#!/usr/bin/env node

// Dependencies
const colors = require('colors')
const ora = require('ora')
const axios = require('axios')
const Table = require('cli-table2')

// Args
let coin = process.argv.length > 2 ? process.argv[2].toUpperCase() : undefined;

console.log('')
console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
console.log('Moneda CLI')

if ( typeof coin !== 'undefined' && coin )
{
  console.log('Coin: ' + coin)
} else
{
    console.log('Default Exchange: cex.io')
}

console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');

const coolSpinner = ora('Loading crypto magic').start()

// Setup Table
var table = new Table();
if ( typeof coin !== 'undefined' && coin )
{
    table = new Table({
        head: ['Exchange', {hAlign:'center',content:'Price (USD)'}, {hAlign:'center',content:'High'}, {hAlign:'center',content:'Low'}]
    });
} else {
    table = new Table({
        head: ['Coin', {hAlign:'center',content:'Price (USD)'}, {hAlign:'center',content:'High'}, {hAlign:'center',content:'Low'}]
    });
}

let priceRow = [];

// Get Data
if ( typeof coin !== 'undefined' && coin )
{
    axios.all([getCexInfoByCoin(coin, "cex.io")])
    .then(axios.spread(function (priceRowCex) {
      
      table.push(priceRowCex);

      coolSpinner.stop()
  
      console.log('');
      console.log(table.toString());

      tips(coin);
      
    }));
} else {
    getCexInfo();
}

//Done.

  function getCexInfoByCoin(crypto, lbl){

    return axios.get('https://cex.io/api/ticker/' + crypto + '/USD')
        .then(function (response) {

        // Check for errors
        if (response.data.error && response.data.error !== "") {
            cexData = [lbl, response.data.error, '', ''];
		} else {
            // Get data
            let coinPrice = numberWithCommas(parseFloat(response.data.last).toFixed(4));
            let coinLow = numberWithCommas(parseFloat(response.data.low).toFixed(4).toLocaleString());
            let coinHigh = numberWithCommas(parseFloat(response.data.high).toFixed(4));

            cexData = [lbl, {hAlign:'right',content:'$' + coinPrice}, {hAlign:'right',content:'$' + coinLow}, {hAlign:'right',content:'$' + coinHigh}];
        }

        return cexData;

        })
        .catch(function (error) {
            console.log(error);
            console.log('Ups. Something went wrong, please try again latter....');
            coolSpinner.stop()
        });

  }

  function getCexInfo(){

    axios.all([
        getCexInfoByCoin("XRP", "Ripple (XRP)"), 
        getCexInfoByCoin("BTC", "Bitcoin (BTC)"),
        getCexInfoByCoin("BCH", "Bitcoin Cash (BCH)"),
        getCexInfoByCoin("DASH", "Dash (DASH)"),
    ])
    .then(axios.spread(function (priceRowXRP, priceRowBTC, priceRowBCH, priceRowDASH) {
      
      table.push(priceRowXRP);
      table.push(priceRowBTC);
      table.push(priceRowBCH);
      table.push(priceRowDASH);
  
      console.log('');
      console.log(table.toString());
  
      coolSpinner.stop();

      tips();
      
    }));

  }

  function tips(coin){

    var rnd = Math.floor(Math.random() * 3) + 1  

    if (rnd == 1){

        console.log('');
        console.log("Buy me a beer!");
        console.log('');

        if ( typeof coin !== 'undefined' && coin ){
            switch (coin){
                case "BCH":
                    console.log("Bitcoin Cash (BCH): 34R3g2mybySCY2JSTAk1PsKvbcPX5Jd63P");
                    break;
                case "XRP":
                    console.log("Ripple (XRP) Wallet: rE1sdh25BJQ3qFwngiTBwaq3zPGGYcrjp1 Destination Tag: 20293 ");
                    break;
                case "BTC":
                    console.log("Bitcoin (BTC): 38c8kcc4tcZmb7DVn9LScxf4fMjCx3jVbU");
                    break;
                case "DASH":
                    console.log("Dash : 7XKuMxdQyBsLtvaHHuUgYP7o9yDtCqJvt7");
                    break;
            }
            
        }else{

            console.log("Bitcoin Cash (BCH): 34R3g2mybySCY2JSTAk1PsKvbcPX5Jd63P");
            console.log("Ripple (XRP) Wallet: rE1sdh25BJQ3qFwngiTBwaq3zPGGYcrjp1 Destination Tag: 20293 ");
            console.log("Bitcoin (BTC): 38c8kcc4tcZmb7DVn9LScxf4fMjCx3jVbU");
            console.log("Dash : 7XKuMxdQyBsLtvaHHuUgYP7o9yDtCqJvt7");

        }

        console.log('');

    }

  }

  const numberWithCommas = (x) => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }