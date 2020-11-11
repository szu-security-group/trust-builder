let {bytecode, interface} = require('./compile')
let Web3 = require('web3')
let web3 = new Web3()

web3.setProvider('http://localhost:8501')

let contract = new web3.eth.Contract(JSON.parse(interface))

// You need to change the account. In this code, this is an account belongs to administrator.
const account = '0xebA810C885D81608F3ffEB25D2ca2Eea4A99a408'


contract.deploy({
	data : '0x'+bytecode,
}).send({
	from : account,
	gas : '3000000',
}).then(instance => {
	console.log("contract address : ", instance.options.address)
})


