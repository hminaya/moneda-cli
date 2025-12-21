const helpers = require('./helpers');
const Table = require('cli-table3')
const colors = require('colors')

function getCoinSymbol(ticker) {
    const symbols = {
        'BTC': '₿',
        'ETH': 'Ξ',
        'XRP': '✕',
        'BCH': '฿',
        'LTC': 'Ł',
        'DASH': 'Đ',
        'XMR': 'ɱ',
        'ADA': '₳',
        'XLM': '*',
        'MIOTA': 'ɨ'
    };
    return symbols[ticker] || '◆';
}

function generatePricePerCoinTable(coinData, targetCurrency){
    targetCurrency = targetCurrency || 'USD';
    const showConvertedColumn = targetCurrency.toUpperCase() !== 'USD';

    const headers = [
        colors.cyan('Source'),
        colors.cyan('Price (USD)')
    ];

    if (showConvertedColumn) {
        headers.push(colors.cyan(`Price (${targetCurrency.toUpperCase()})`));
    }

    const table = new Table({
        head: headers,
        style: {
            head: [],
            border: ['grey']
        },
        chars: {
            'top': '─', 'top-mid': '┬', 'top-left': '┌', 'top-right': '┐',
            'bottom': '─', 'bottom-mid': '┴', 'bottom-left': '└', 'bottom-right': '┘',
            'left': '│', 'left-mid': '├', 'mid': '─', 'mid-mid': '┼',
            'right': '│', 'right-mid': '┤', 'middle': '│'
        }
    });

    for(let i = 0; i < coinData.length; i++) {

        let coin = coinData[i];
        let row = [];

        if(coin.error != '') {
        //row = [coin.source, {colSpan:2,content:coin.error}];

        } else {
            row = [
                colors.white(coin.source),
                colors.green.bold('$' + coin.currentPrice)
            ];

            if (showConvertedColumn) {
                const currencySymbol = getCurrencySymbol(targetCurrency);
                const displayPrice = coin.convertedPrice || 'N/A';
                row.push(colors.yellow.bold(currencySymbol + displayPrice));
            }

            table.push(row);
        }

    }

    if(table.length == 0){
        const colSpan = showConvertedColumn ? 3 : 2;
        const row = [{colSpan: colSpan, content:'No data found for ' + coinData[0].symbol}];
        table.push(row);
    }

    return table;
}

function getCurrencySymbol(currency) {
    const symbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'JPY': '¥',
        'CNY': '¥',
        'AUD': 'A$',
        'CAD': 'C$',
        'CHF': 'CHF ',
        'KRW': '₩',
        'INR': '₹',
        'RUB': '₽',
        'BRL': 'R$'
    };
    return symbols[currency.toUpperCase()] || currency.toUpperCase() + ' ';
}

function generateMarketDataTable(coinMarketData){
    const table = new Table({
        head: ['Rank', 'Name', 'Symbol', 
            { hAlign:'center', content:'Price (USD)' }, 
            { hAlign:'center', content:'Market Cap (USD)' }, 
            { hAlign:'center', content:'Change (24h)' }
        ]
    });

    for(let i = 0; i < coinMarketData.length; i++) {
        const coin = coinMarketData[i];
        const row = [
            coin.rank,
            coin.name,
            coin.symbol, 
            { hAlign:'right',content:'$' + coin.price },
            { hAlign:'right',content:'$' + coin.marketCap },
            { hAlign:'right', content: helpers.colorizeNumber(coin.percentChange24h, `${coin.percentChange24h} %`) }
        ];
        table.push(row);
    }

    return table;
}

function showDonationFooter() {
    console.log('');
    console.log(colors.grey('─'.repeat(60)));
    console.log(colors.grey('  💝 Support development:'));
    console.log(colors.grey('  BTC: ') + colors.white('bc1qkmt89twaqz5hvq9676agxj8jgatfy4wgyyuuzc'));
    console.log(colors.grey('─'.repeat(60)));
}

module.exports.generatePricePerCoinTable = generatePricePerCoinTable;
module.exports.generateMarketDataTable = generateMarketDataTable;
module.exports.getCoinSymbol = getCoinSymbol;
module.exports.showDonationFooter = showDonationFooter;