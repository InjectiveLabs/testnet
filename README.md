# network-config
This repository contains network config required to run a node connected to our devnet and testnet.

## Run a node connected to devnet
1. Initialize injectived directory
```
injectived init injective --home ./generated/devnet --chain-id 888
```

2. Replace genesis.json, app.toml, config.toml in generated directory
```
cd generated/devnet/config && rm -f app.toml config.toml genesis.json && cd ../../../
cp -r config/devnet/ generated/devnet/config/
```

3. Start the node and you should see it syncs with devnet after a while
```
injectived --chain-id=888 --home ./generated/devnet start
```

4. Clean up the existing data to sync again if error happened
```
cd generated/devnet/data && rm -rf application.db blockstore.db evidence.db snapshots state.db tx_index.db && cd ../../../
```

5. persistent peers to add in config.toml
```
6c5a6ec57c562d028bea1e5cf4599733308abbd8@3.130.217.196:26656
```

## Run a node connected to multinodes
1. Initialize injectived directory
```
injectived init injective --home ./generated/multinodes --chain-id 888
```

2. Replace genesis.json, app.toml, config.toml in generated directory
```
cd generated/multinodes/config && rm -f app.toml config.toml genesis.json && cd ../../../
cp -r config/multinodes/ generated/multinodes/config/
```

3. Start the node and you should see it syncs with devnet after a while
```
injectived --chain-id=888 --home ./generated/multinodes start
```

4. Clean up the existing data to sync again if error happened
```
cd generated/multinodes/data && rm -rf application.db blockstore.db evidence.db snapshots state.db tx_index.db && cd ../../../
```

5. persistent peers to add in config.toml
```
73bc86c9c8009804555245dadc5d2c6330c15dee@34.255.55.112:26656
faaaf8fd1389917b7173c00e3014762fec03844d@108.128.141.104:26656
e448b543602292bfc1efad3c08be5728bcebf2c3@99.80.105.200:26656
f890fd750eb6276df6c874be717e5d63be07ecc4@54.220.194.8:26656
```
