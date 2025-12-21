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
              name: 'currency',
              alias: 'c',
              description: 'Display prices in specified currency (e.g., EUR, GBP, JPY). Default: USD'
            },
            {
              name: 'seconds',
              alias: 's',
              description: 'Custom refresh interval in seconds. Default: 30 (always auto-refreshes)'
            },
            {
              name: 'help',
              alias: 'h',
              description: 'Show this help guide'
            }
          ]
        },{
            content: 'Project home: https://github.com/hminaya/moneda-cli'
        },{
          header: 'Donations',
          content: [
            {
              desc: 'Bitcoin (BTC)',
              example: 'bc1qkmt89twaqz5hvq9676agxj8jgatfy4wgyyuuzc'
            }
          ]
        }
      ];

      const usage = getUsage(sections)

      console.log(usage)

}

module.exports.showUsage = showUsage;