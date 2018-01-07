const opt = require('./../libs/models/options.js')

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  function cleanUpCommandLineOptions(options){

    let coin = options.ticker;
    let topCoinsLimit = options.market;
    let currency = options.currency;
    let silent = options.silent;

    var o = new opt.Options(coin, currency, topCoinsLimit, silent);
    return o;

  }
  
  module.exports.numberWithCommas = numberWithCommas;
  module.exports.cleanUpCommandLineOptions = cleanUpCommandLineOptions;