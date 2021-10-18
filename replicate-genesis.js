const fs = require('fs')
const os = require('os')
const request = require('request-promise')
const srcGenesis = require('./mainnet-genesis.json')
const dstGenesis = require('./devnet-genesis.json')

async function main() {
  // add usdt, usdt to accounts
  peggyDenoms = []
  for (let denom of srcGenesis.app_state.bank.supply){
    peggyDenoms.push(denom.denom)
  }

  for (let denom of peggyDenoms){
    // skip inj
    if (denom == "inj") continue

    // 10e27
    multiplier = "000000000000000000000000000"
    totalAmount = 0
    for (let i in dstGenesis.app_state.bank.balances){
      let amount = 1
      totalAmount += amount
      coin = {
        denom: denom,
        amount: String(amount) + multiplier
      }
      dstGenesis.app_state.bank.balances[i].coins.push(coin)
    }
    dstGenesis.app_state.bank.supply.push({denom: denom, amount: String(totalAmount) + multiplier})
  }

  dstGenesis.app_state.exchange = srcGenesis.app_state.exchange
  dstGenesis.app_state.exchange.balances = []
  dstGenesis.app_state.exchange.positions = []
  dstGenesis.app_state.exchange.derivative_orderbook = []
  dstGenesis.app_state.exchange.spot_orderbook = []
  dstGenesis.app_state.exchange.subaccount_trade_nonces = []

  dstGenesis.app_state.oracle = srcGenesis.app_state.oracle

  fs.writeFileSync(`${os.homedir()}/.injectived/config/genesis.json`, JSON.stringify(dstGenesis))
}

main()
