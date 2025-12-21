# Moneda
[![npm version](https://badge.fury.io/js/moneda-cli.svg)](https://badge.fury.io/js/moneda-cli)

Command line to track cryptocurrency prices

### Requirements

- Node.js >= 22.0.0

### Installation

```bash
npm install -g moneda-cli
```

### Usage

```bash
# Display price data for a specific coin (auto-refreshes every 30 seconds)
moneda -t BTC
```

```bash
# Display price data for multiple coins
moneda -t BTC ETH XRP
```

```bash
# Display prices in a different currency
moneda -t BTC -c EUR
moneda -t ETH -c GBP
moneda -t XRP -c JPY
```

```bash
# Customize refresh interval (in seconds)
moneda -t BTC -s 10     # Refresh every 10 seconds
moneda -t ETH -s 60     # Refresh every 60 seconds
```

```bash
# Show help
moneda -h
```

**Note:** The app automatically refreshes prices every 30 seconds by default. Use the -s flag to customize the refresh interval.


### Supported Coins

**Supported by all sources (best results):**
- [x] Bitcoin (BTC)
- [x] Ethereum (ETH)
- [x] Ripple (XRP)
- [x] Bitcoin Cash (BCH)
- [x] Litecoin (LTC)
- [x] Dash (DASH)
- [x] Monero (XMR)

**Also supported via CoinGecko:**
- [x] Cardano (ADA)
- [x] Stellar (XLM)
- [x] IOTA (MIOTA)
- [x] And 13,000+ more coins!

### Supported Sources
- [x] Coinbase
- [x] Kraken
- [x] CoinGecko

### Product Hunt
**Share your thoughts on [Product Hunt](https://www.producthunt.com/posts/moneda-cli)**

### Tips

If you'd like to see this tool developed further consider sending over a tip


| Coin               | Wallet                                     |
|--------------------|--------------------------------------------|
| Bitcoin (BTC)      | bc1qkmt89twaqz5hvq9676agxj8jgatfy4wgyyuuzc |