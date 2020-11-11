var NodeRSA = require('node-rsa')
var fs = require('fs')
let contractInstance = require('./instance')
let async = require('async');

// Client address
var Clients = [
	"0xebA810C885D81608F3ffEB25D2ca2Eea4A99a408",
]

function setPublickey(address, publickey){
	return new Promise((resolve, reject)=>{
		contractInstance.methods.setPublicKey(address, publickey).send({from: address,}).on('transactionHash', function(hash){
		})
		.on('confirmation', function(confirmationNumber, receipt){
		})
		.on('receipt', function(receipt){
		    // receipt example
		    console.log(receipt)
		    //resolve(receipt["gasUsed"]);
		})
		.on('error', console.error); // If a out of gas error, the second parameter is the receipt.
	})
}


function generator(index) {
	//var args = process.argv.slice(2);
	//console.log(args)
	var key = new NodeRSA({ b: 512 })
	key.setOptions({ encryptionScheme: 'pkcs1' })
	var privatePem = key.exportKey('pkcs1-private-pem')
	var publicPem = key.exportKey('pkcs1-public-pem')

	// publish the public key to the blockchain
	setPublickey(Clients[index-1], publicPem)

	fs.writeFile('../../node'+index+'/public.pem', publicPem, (err) => {
	if (err) throw err
		console.log('public key saved！')
	})
	fs.writeFile('../../node'+index+'/private.pem', privatePem, (err) => {
	if (err) throw err
		console.log('private key saved！')
	})
}


function main() {
	for(let i=1; i<2; i++){
		generator(i)
	}
}

main();
