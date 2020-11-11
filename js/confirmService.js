let contractInstance = require('./instance')
var fs = require('fs')
let async = require('async');


// Client address
var Clients = [
	"0xebA810C885D81608F3ffEB25D2ca2Eea4A99a408"
]

// SP address
var SPs = [
	"0x3A10016C345350a5a5B201a3d4aFC179ADE91a7f",
]

const from = '0xebA810C885D81608F3ffEB25D2ca2Eea4A99a408'

function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function publicHashClient(hash, token){
	return new Promise((resolve, reject)=>{
		contractInstance.methods.publicHashClient(hash, token).send({from: from,}).on('transactionHash', function(hash){
		})
		.on('confirmation', function(confirmationNumber, receipt){
		})
		.on('receipt', function(receipt){
		    // receipt example
		    console.log(receipt['events'])
		    //resolve(receipt["gasUsed"]);
		})
		.on('error', console.error); // If a out of gas error, the second parameter is the receipt.
	})
}

function main(){

	for(let i=0; i<1; i++){
		hash = '0x8a1bba1a69ab74ec981d47beae29e5260ab9e07558fbf791f26e951e2623c748';
		token = 'service id';
		publicHashClient(hash, token)
	}
}

main()

