import pc from 'picocolors';
import { Options } from './models/options.js';

/**
 * @param {number|string} x
 * @returns {string}
 */
export function numberWithCommas(x) {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

/**
 * @param {Object} options - Raw command-line options
 * @returns {Options}
 */
export function cleanUpCommandLineOptions(options) {
  const { ticker, currency, market, seconds, help } = options;
  return new Options(ticker, currency, market, seconds, help);
}

/**
 * @param {number} number
 * @param {string} [text]
 * @returns {string}
 */
export function colorizeNumber(number, text) {
  text = text || number.toString();
  return number >= 0 ? pc.green(text) : pc.red(text);
}
