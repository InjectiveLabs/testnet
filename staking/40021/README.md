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

3. Restart chain
```
sudo systemctl restart injectived
```
