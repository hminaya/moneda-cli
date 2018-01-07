const getUsage = require('command-line-usage')

function showUsage(){

    const sections = [
        {
          header: 'Moneda CLI',
          content: 'Command line to track cryptocurrency prices'
        },
        {
            header: 'Synopsis',
            content: '$ moneda <options> <command>'
        },
        {
          header: 'Options',
          optionList: [
            {
              name: 'ticker',
              alias: 't',
              description: 'Crypto that you would like to list the price. You can list multiple tickers'
            },
            {
              name: 'market',
              alias: 'm',
              description: 'Show Market data for the top n cryptocurrencies.'
            },
            {
              name: 'silent',
              alias: 's',
              description: 'If set to true will hide this guide'
            }
          ]
        },{
            content: 'Project home: [underline]{https://github.com/hminaya/moneda-cli}'
        },{
          header: 'Donations',
          content: [
            {
              desc: 'Ethereum (ETH)',
              example: '0x948f2b275ac7c8a24d24c824891386f0dbf6e01e'
            },
            {
              desc: 'Ripple (XRP)',
              example: 'wallet: rE1sdh25BJQ3qFwngiTBwaq3zPGGYcrjp1 destination tag: 20293'
            },
            {
              desc: 'Bitcoin (BTC)',
              example: '38c8kcc4tcZmb7DVn9LScxf4fMjCx3jVbU'
            },
            {
              desc: 'Bitcoin Cash (BTH)',
              example: '34R3g2mybySCY2JSTAk1PsKvbcPX5Jd63P'
            }
          ]
        }
      ];

      const usage = getUsage(sections)

      console.log(usage)

}

module.exports.showUsage = showUsage;