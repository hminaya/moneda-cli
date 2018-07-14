const helpers = require('./helpers');
const Table = require('cli-table3')

function generatePricePerCoinTable(coinData){
    const table = new Table({
        head: ['Source', {
            hAlign:'center',
            content:'Price (USD)'
        }, {
            hAlign:'center',
            content:'High'
        }, {
            hAlign:'center',
            content:'Low'
        }]
    });

    for(let i = 0; i < coinData.length; i++) {

        let coin = coinData[i];
        let row = [];

        if(coin.error != '') {
        //row = [coin.source, {colSpan:3,content:coin.error}];

        } else {
            row = [coin.source,
                { hAlign:'right',content:'$' + coin.currentPrice }, 
                { hAlign:'right',content:'$' + coin.high }, 
                { hAlign:'right',content:'$' + coin.low }
            ];
            table.push(row);
        }

    }

    if(table.length == 0){
        const row = [{colSpan:4,content:'No data found for ' + coinData[0].symbol}];
        table.push(row);
    }

    return table;
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

module.exports.generatePricePerCoinTable = generatePricePerCoinTable;
module.exports.generateMarketDataTable = generateMarketDataTable;