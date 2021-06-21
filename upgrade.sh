OS=$1
NETWORK_VERSION=$2
BIN_VERSION=$3

function echoCyan {
    printf "\033[0;36m$@\e[0m\n"
}

# decide bin pkg
BIN_PKG=""
if [ "$OS" = "linux" ]; then
  BIN_PKG="linux-amd64.zip"
else
  BIN_PKG="darwin-amd64.zip"
fi

# download url
echoCyan "Downloading binaries..."
BIN_URL="https://github.com/InjectiveLabs/injective-chain-releases/releases/download/${BIN_VERSION}/${BIN_PKG}"
wget $BIN_URL
unzip $BIN_PKG
rm $BIN_PKG
mv injectived peggo $GOPATH/bin

# print version
echoCyan "Checking bin versions..."
injectived version
peggo version

# reset the chain
injectived unsafe-reset-all
rm ~/.injectived/config/write-file-atomic-*

# update genesis
echoCyan "Updating genesis..."
cp ${NETWORK_VERSION}/genesis.json ~/.injectived/config/genesis.json
sha256sum ~/.injectived/config/genesis.json

# testing the chain
echoCyan "Testing injectived sync..."
injectived start &
sleep 60
pkill injectived
echoCyan "Injectived exited"

echoCyan "If injectived started to sync properly, please proceed to restart systemd services with following commands"
echo "sudo systemctl start injectived"
echo "sudo systemctl start peggo"
