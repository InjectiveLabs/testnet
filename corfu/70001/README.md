# Start Corfu Testnet
1. Stop and reset chain data
```
sudo systemctl stop injectived
injectived tendermint unsafe-reset-all
rm ~/.injectived/config/genesis.json
```

2. Download and apply new genesis
```
aws s3 cp s3://injective-snapshots/testnet/genesis.json . --no-sign-request
sha256sum genesis.json
a4abe4e1f5511d4c2f821c1c05ecb44b493eec185c0eec13b1dcd03d36e1a779
mv genesis.json ~/.injectived/config/
```

3. Download new binary
```
wget https://github.com/InjectiveLabs/injective-chain-releases/releases/download/v1.7.0-1662223156/linux-amd64.zip
unzip linux-amd64.zip
sudo mv injectived peggo injective-exchange /usr/bin
sudo mv libwasmvm.x86_64.so /usr/lib
```

3. Restart chain
```
sudo systemctl restart injectived
```
