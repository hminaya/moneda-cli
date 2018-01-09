const colors = require('colors');
const opt = require('./../libs/models/options.js')

function numberWithCommas(x) {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

function cleanUpCommandLineOptions(options){
  let coin = options.ticker;
  let topCoinsLimit = options.market;
  let currency = options.currency;
  let silent = options.silent;

  return new opt.Options(coin, currency, topCoinsLimit, silent);
}

function colorizeNumber(number, text) {
  text = text || number.toString();
  return (number >= 0) ? colors.green(text) : colors.red(text);
}

module.exports.numberWithCommas = numberWithCommas;
module.exports.cleanUpCommandLineOptions = cleanUpCommandLineOptions;
module.exports.colorizeNumber = colorizeNumber;