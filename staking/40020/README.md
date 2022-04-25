# Start chain with exported genesis
1. Stop and reset chain data
```
sudo systemctl stop injectived
injectived unsafe-reset-all
rm ~/.injectived/config/genesis.json
```

2. Download and apply new genesis
```
aws s3 cp s3://injective-snapshots/testnet/40020/genesis.json .
# 1289493814 338784202 genesis.json
cksum genesis.json
mv genesis.json ~/.injectived/config/
```

3. Restart chain
```
sudo systemctl restart injectived
```
