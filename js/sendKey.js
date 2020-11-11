contractInstance = require('./instance')
var fs = require('fs')
var sha256 = require('js-sha256');
const NodeRSA = require('node-rsa');

const from = '0xebA810C885D81608F3ffEB25D2ca2Eea4A99a408'
// SP address
var SPs = [
	"0x3A10016C345350a5a5B201a3d4aFC179ADE91a7f",
]



// function publicHashSP(bytes32 hash_EncryptedS, uint id)
function publicKey(key, token){
	contractInstance.methods.publicKey(key, token).send(
		{from: from, gas: 5759998})
	.on('transactionHash', function(hash){
	})
	.on('confirmation', function(confirmationNumber, receipt){
	})
	.on('receipt', function(receipt){
		console.log(receipt);
	    resolve(receipt);
	})
	.on('error', console.error); // If a out of gas error, the second parameter is the receipt.

}

function test() {
	var key = 'BHhFIqencYrSiGq7+A1t6hiTHC/cz2csMkr8moKlklCFfyU0YtrOkcAmz7ZOtaCQVbzRf4AmdMnHbxcQC3WdEwAtDTO1imfBez58pbA7yzBVm3GSSguaWNgl1g==';
	var token = 'service id';
	publicKey(key, token)
}
test()
