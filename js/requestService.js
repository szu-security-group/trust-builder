let contractInstance = require('./instance')
var fs = require('fs')
let async = require('async');


// clients address
var Clients = [
	"0xebA810C885D81608F3ffEB25D2ca2Eea4A99a408",
]

// SPs address
var SPs = [
	"0x3A10016C345350a5a5B201a3d4aFC179ADE91a7f",
]

const from = '0x6dceBA41b8F5333AaC2E254e3d9e760D3D4c3bC6'

function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function request(client_address, sp_address, service_id){
	return new Promise((resolve, reject)=>{
		contractInstance.methods.requestService(sp_address, service_id).send({from: client_address}).on('transactionHash', function(hash){
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

async function main(){

	for(let i=0; i<1; i++){
	
		// choose Client\SP\S
		let client_num = random(0, 1)
		let sp_num = random(0, 1)
		let S_num = random(1, 22)
		
		client = Clients[client_num]
		sp = SPs[sp_num]
		
		request(client, sp, "service id")
	}
}

main()
