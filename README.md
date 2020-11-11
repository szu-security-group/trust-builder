# TrustBuilder: A Non-repudiation Scheme for Industrial IoT Cloud Applications

**TrustBuilder** is a  non-repudiation scheme for industrial IoT cloud applications. The proposed scheme guarantees that neither the IoT client nor the cloud could repudiate a service enjoyment and provisioning. Specifically, the proposed scheme employs a blockchain to achieve non-repudiation. 

Formally, we abstract our non-repudiation scheme as follows.
1) *request_service*. The IoT client sends a service request to the service provider using the blockchain.
2) *promise_service*. The cloud sends a service promise to blockchain.
3) *send_masked_service*. The cloud sends the requested service program to the IoT client via an offchain channel.
4) *confirm_receipt*. After receiving the masked service via the off-chain channel, the IoT client sends an acknowledgement to the blockchain to indicate that it received the masked data.
5) *send_key*. The cloud sends the key that is able to unmask the service to the blockchain. The IoT client fetches this key to obtain the real service. 

## Based Environment

We built a Ethereum test environment on Ubuntu 16.04. To install the test environment, you need to install NodeJS and NPM on your system in advance.

### Geth

we built a blockchain network on Geth 1.9.23 with proof-of-authority (PoA) consensus mechanism. You can run a command in terminal to install Geth.

```
sudo add-apt-repository -y ppa:ethereum/ethereum 
sudo apt-get update 
sudo apt-get install ethereum 
```

### Solc

To compile the smart contract(solidity), you also need to install the solc module. The command is as follows.

```
npm install --save solc@0.4.25
```

### Javascript module

In order to run the Javascript code, you also need to install web3, async, js-sha256 and node-rsa module. The command is as follows.

```
npm init
npm install web3 --save
npm install async --save
npm install node-rsa --save
npm install js-sha256 --save
```

## Build Private Ethernum Network

To demonstrate the process of establishing the Ethernum private chain, we only set up two nodes to create a point-to-point network on our localhost.

### Create workspace

```
mkdir workspace
cd workspace
mkdir node1 node2
```

### Create account

An account (also known as a wallet) has the public-private key pairs needed to interact with any blockchain network. To demonstrate, we only create two accounts now. We treat node 1 as client and node 2 as service provider. For test convenience, we set the password to the same.

```
geth --datadir node1/ account new
geth --datadir node2/ account new
```

For each node, we recommend saving the password in a file. This will simplify some of the processes later (such as unlocking your account).
```
echo 'password' > password.txt
```

### Create genesis file

The Genesis file is the file used to initialize the blockchain. You can use puppeth to create a genesis file. Use the follow command and choose the PoA consensus mechanism. After that you can get the genesis.json file, which will be used to initialize each node.

`puppeth`

### Initializing node

You can use genesis.json to initialize the creation block. You must initialize each node with the same genesis file.

```
geth --datadir node1/ init genesis.json
geth --datadir node2/ init genesis.json
```

### Start node

Use the follow command format to start node 1. You need to change the account  in the command. The networkid is the same as your genesis.json file.

`nohup geth --datadir node1/ --syncmode 'full' --port 30311 --rpc --rpcaddr 'localhost' --rpcport 8501 --rpcapi 'personal,eth,net,web3,txpool,miner' --networkid 666 --allow-insecure-unlock --unlock '0x....' --password password.txt --mine`

After Successful starting the node, you can get the bootnodes of node 1, like this *enode://xxxx@127.0.0.1:30311*.

And now you can use the same way to start node 2. You have to change the account and the bootnodes value.
`nohup geth --datadir node2/ --syncmode 'full' --port 30312 --rpc --rpcaddr 'localhost' --rpcport 8502 --rpcapi 'personal,eth,net,web3,txpool,miner' --networkid 666 --allow-insecure-unlock --unlock '0x....' --password password.txt --mine --bootnodes 'enode://xxxx@127.0.0.1:30311'`

## Usage

### Deploy smart contract

Now, you can use the follow javascript code  to deploy the smart contract *(contract/Service.sol)*. 

`node deploy.js`

Once the transaction is packaged into block, you can get the contract address (e.g. 0x917.....da3) and the abi value, you have to modify the contract address value in *instance.js*. What's more, you also need to cover the abi value in *instance.js* too.  

### Generate public/private key for client

For each client node, you can run the *generateKey.js* to generate a pair of public/private key. This public key, associated with the address of the client, will be published on the blockchain. Specially, we only generate the key pairs for node 1 in this code. 
`node generateKey.js`

### Request service

In this phase, the client will write the service provider address and the service ID data in the smart contract. This ID is unique in this system.  You can run the JavaScript code *requestService.js* to simulate the request process.

`node requestService.js`

### Promise service

The promise_service phase writes a hash value in the smart contract. You can run the *promiseService.js* to simulate the promise process.

`node promiseService.js`

### Confirm service

For the confirm_service phase, we just checked whether two hash values are consistence.  You can run *confirmService.js* to simulate the confirm process.

`node confirmService.js`

### Send key

For the send_key phase, we also need to write a decryption key value in the smart contract. However, its size is smaller. You can run sendKey.js to simulate the send key process.

`node sendKey.js`

 

