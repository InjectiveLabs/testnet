# Start Corfu Testnet
1. Stop and reset chain data
```
sudo systemctl stop injectived
injectived unsafe-reset-all
rm ~/.injectived/config/genesis.json
```

2. Download and apply new genesis
```
wget https://raw.githubusercontent.com/InjectiveLabs/testnet-config/master/corfu/70001/genesis.json
cksum genesis.json
#1919640451 19448 genesis.json
mv genesis.json ~/.injectived/config/
```

3. Download new binary
```
wget https://github.com/InjectiveLabs/injective-chain-releases/releases/download/v0.4.19-1656563866/linux-amd64.zip
unzip linux-amd64.zip
sudo mv injectived peggo injective-exchange /usr/bin
sudo mv libwasmvm.x86_64.so /usr/lib

```

3. Restart chain
```
sudo systemctl restart injectived
```
