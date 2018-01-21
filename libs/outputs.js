
exports.default = {
    marketCapData: function (table, topCoinsLimit) {
        console.log ('\n');
        console.log (' Market Top ' + topCoinsLimit);
        console.log (table.toString ());
    },
    dataPerCoin: function (tables, res, coin) {
        const table = tables.generatePricePerCoinTable(res);

        console.log('\n');
        console.log(' Ticker: ' + coin);
        console.log(table.toString());
    },
    summarizedCoinData: function () {

    }
};

exports.json = {
    marketCapData: function (table, topCoinsLimit) {
        let cnt, result = [];
        for (cnt = 0; cnt < topCoinsLimit; cnt += 1) {
            let row = table[cnt];
            let obj = {
                rank: row[0],
                name: row[1],
                symbol: row[2]
            };
            result.push(obj);
        }
        console.log(result);
    },
    dataPerCoin: function (tables, res, coin) {
        const table = tables.generatePricePerCoinTable(res);

        let cnt, result = [];
        for (cnt = 0; cnt < table.length; cnt += 1) {
            let row = table[cnt];
            let obj = {
                source: typeof(row[0] === 'string')? row[0] : row[0].content,
                price: (row[1] || {}).content,
                min: (row[2] || {}).content,
                max: (row[3] || {}).content
            };
            result.push(obj);
        }
        return { coin: coin, data: result };
    },
    summarizedCoinData: function (result) {
        console.log(JSON.stringify(result, null, 4));
    }
};

exports.csv = {
    marketCapData: function (table, topCoinsLimit) {
        let cnt;
        for (cnt = 0; cnt < topCoinsLimit; cnt += 1) {
            let row = table[cnt];
            let obj = {
                rank: row[0],
                name: row[1],
                symbol: row[2]
            };
            console.log(Object.keys(obj).map(k => obj[k]).join(','));
        }
    },
    dataPerCoin: function (tables, res, coin) {
        const table = tables.generatePricePerCoinTable(res);

        console.log('Coin = ' + coin);
        let cnt, result = [];
        for (cnt = 0; cnt < table.length; cnt += 1) {
            let row = table[cnt];
            let obj = {
                source: typeof(row[0] === 'string')? row[0] : row[0].content,
                price: (row[1] || {}).content,
                min: (row[2] || {}).content,
                max: (row[3] || {}).content
            };
            console.log(Object.keys(obj).map(k => obj[k]).join(','));
        }
        console.log();
        return { coin: coin, data: result };
    },
    summarizedCoinData: function (result) {
    }
};