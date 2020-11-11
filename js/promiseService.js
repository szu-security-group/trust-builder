contractInstance = require('./instance')
var fs = require('fs')
var sha256 = require('js-sha256');
const NodeRSA = require('node-rsa');

var from = "0xebA810C885D81608F3ffEB25D2ca2Eea4A99a408";
var SPs = [
	"0x3A10016C345350a5a5B201a3d4aFC179ADE91a7f",
]


// function publicHashSP(bytes32 hash_EncryptedS, uint id)
function SP_2(hash, token){
	contractInstance.methods.publicHashSP(hash, token).send(
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
	var hash = '0x8a1bba1a69ab74ec981d47beae29e5260ab9e07558fbf791f26e951e2623c748';
	var token = 'service id';
	SP_2(hash, token)
}
test()
