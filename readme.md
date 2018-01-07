# Moneda
[![npm version](https://badge.fury.io/js/moneda-cli.svg)](https://badge.fury.io/js/moneda-cli)
[![Dependency Status](https://david-dm.org/hminaya/moneda-cli.svg)](https://david-dm.org/hminaya/moneda-cli.svg)

Command line to track cryptocurrency prices

### Instalation

```bash
npm install -g moneda-cli
```

### Update

New features are being added frequently, you should upgrade often

```bash
npm install -g moneda-cli
```

### Usage

```bash
# Display guide and Market Data for top 15 coins
moneda
```
![Market Data](https://github.com/hminaya/moneda-cli/raw/master/imgs/no-options.png)

```bash
# Top 5 coins by Market data
moneda -m 5
```
![Top 5](https://github.com/hminaya/moneda-cli/raw/master/imgs/top5.png)

```bash
# Display data for a specific coin from different sources
moneda -t XRP
```
![One Coin](https://github.com/hminaya/moneda-cli/raw/master/imgs/one-coin.png)

```bash
# Display data for a multiple coins from different sources
moneda -t XRP ETH BTC
```
![Multiple Coins](https://github.com/hminaya/moneda-cli/raw/master/imgs/tickers-3.png)


```bash
# Display both Market Data and Specific Coins
moneda XRP -m 5
```
![Multiple Coins](https://github.com/hminaya/moneda-cli/raw/master/imgs/advanced.png)



### Supported Coins
- [x] Ripple (XRP)
- [x] Bitcoin Cash (BCH)
- [x] Bitcoin (BTC)
- [x] Dash
- [x] Monero (XMR)
- [x] Litecoin (LTC)
- [x] IOTA (MIOTA)
- [x] Cardano (ADA)
- [x] Stellar (XLM)
- [x] NEM (XEM)
- [x] Bitcoin Gold (BTG)

### Supported Sources
- [x] cex.io
- [ ] gdax
- [x] kraken.com
- [x] bitstamp.net
- [x] CoinMarketCap.com

### Product Hunt
**Share your thoughts on [Product Hunt](https://www.producthunt.com/posts/moneda-cli)**

### Tips

If you'd like to see this tool developed further consider sending over a tip


| Coin               | Wallet                                     | Destination Tag |
|--------------------|--------------------------------------------|-----------------|
| Ethereum (ETH)     | 0x948f2b275ac7c8a24d24c824891386f0dbf6e01e |                 |
| Bitcoin Cash (BCH) | 34R3g2mybySCY2JSTAk1PsKvbcPX5Jd63P         |                 |
| Ripple (XRP)       | rE1sdh25BJQ3qFwngiTBwaq3zPGGYcrjp1         | 20293           |
| Bitcoin (BTC)      | 38c8kcc4tcZmb7DVn9LScxf4fMjCx3jVbU         |                 |
| Dash               | 7XKuMxdQyBsLtvaHHuUgYP7o9yDtCqJvt7         |                 |