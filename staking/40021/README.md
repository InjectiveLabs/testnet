# Start chain with exported genesis
1. Stop and reset chain data
```
sudo systemctl stop injectived
injectived unsafe-reset-all
rm ~/.injectived/config/genesis.json
```

2. Download and apply new genesis
```
aws s3 cp s3://injective-snapshots/testnet/40021/genesis.json .
cksum genesis.json
#3454599728 214923029 40021/genesis.json
mv genesis.json ~/.injectived/config/
```

3. Download new binary
```
wget https://github.com/InjectiveLabs/injective-chain-releases/releases/download/v0.4.19-1652947015/linux-amd64.zip
unzip linux-amd64.zip
sudo mv injectived peggo injective-exchange /usr/bin

# Download wasm packages, which include the libs
go mod download github.com/CosmWasm/wasmd@v0.27.0-rc0
go mod download github.com/CosmWasm/wasmvm@v1.0.0-rc.0
go mod download github.com/InjectiveLabs/wasmd v0.27.0-rc2-inj
```

3. Restart chain
```
sudo systemctl restart injectived
```
