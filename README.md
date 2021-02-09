# network-config
This repository contains network config required to run a node


## Run validator via docker
1. Setup new node at network-config root
  ```m
  # Clear existing node
  rm -rf ~/.injectived/
  injectived init my-validator --chain-id 888

  # Copy config
  cp ./internal/50003/genesis.json ~/.injectived/config/genesis.json
  cp ./internal/50003/app.toml  ~/.injectived/config/app.toml

  # Config persistent peer in config.toml
  persistent_peers = "d6548f57d8e2f29222fa9cb874833a22f5fd77ac@3.128.195.28:26656"
  ```

1. Start the node to sync with genesis validators
  ```
  # Wait till your node is fully sync with the network to continue
  # Or you can use synced node to setup next steps while waiting
  docker-compose up -d injective-core
  ```

1. Create validator key
  ```
  yes 12345678 | injectived keys add my-validator-key

  # Store this private key as $VAL_PRIV
  yes 12345678 | injectived keys unsafe-export-eth-key my-validator-key
  ```

1. Deposit INJ token to peggy contract using address of $VAL_PRIV
  ```
  # Load peggy contract at this address
  Peggy contract:

  # Call sendToCosmos() to deposit token
  Token contract: [ERC20 INJ contract address]
  Destination: [your address]
  Amount: [staking amount]
  ```

1. Check your balance in cosmos
  ```
  # List your account
  yes 12345678 | injectived keys list

  # Paste in your account address and query balance
  http://localhost:10337/cosmos/bank/v1beta1/balances/[Address]
  ```

1. Now you have valid balance, proceed to register node as validator. You can use another node url to register if your node is not fully synced yet.
  ```
  # Grab this as $NODE_PUB
  injectived tendermint show-validator

  # Register your node as validator node
  yes 12345678 | injectived tx staking create-validator \
  --moniker my-validator --amount 970000000inj \
  --pubkey $NODE_PUB \
  --from my-validator-key --chain-id=888 --keyring-backend=file --yes \
  --node=tcp://localhost:26657 --commission-max-change-rate=0.1 \
  --commission-max-rate=0.1 --commission-rate=0.1 --min-self-delegation 1
  ```

1. Configure peggo
  ```
  # Paste config template to node directory
  mkdir -p ~/.injectived/peggo/
  cat ./internal/50003/peggo-config.env > ~/.injectived/peggo/.env

  # Configure .env, you can choose different keys for ethereum and cosmos.

  APP_ENV=local
  APP_LOG_LEVEL=info
  SERVICE_WAIT_TIMEOUT=1m
  PEGGY_COSMOS_PRIVKEY=$VAL_PRIV
  PEGGY_COSMOS_GRPC=tcp://injective-core:9900
  PEGGY_TENDERMINT_RPC=http://injective-core:26657
  PEGGY_FEE_DENOM=inj
  INJECTIVED_CHAIN_ID=888
  PEGGY_ETH_RPC=https://eth-kovan.alchemyapi.io/v2/[your-api-key]
  PEGGY_ETH_PRIVATE_KEY=$VAL_PRIV
  PEGGY_CONTRACT_ADDRESS=0x3A509fB16797164B6c958d6265720BC9E6cB0633
  INJ_CONTRACT_ADDRESS=0xFd47C734996F0bb2C60B207390f8A3e9f7c38A44
  STATSD_PREFIX=relayer_api
  STATSD_ADDR=localhost:8125
  STATSD_STUCK_DUR=5m
  STATSD_MOCKING=false
  STATSD_DISABLED=false
  ```

1. Register eth key
  ```
  cd ~/.injectived/peggo/ && register_eth_key && cd -
  ```

1. Start peggo
  ```
  docker-compose up -d peggo
  ```
