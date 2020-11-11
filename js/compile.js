// import solc fs
let solc = require('solc')
let fs = require('fs')

// read contract
let contractCode = fs.readFileSync('../contract/Service.sol', 'utf-8')

// compile contract
let output = solc.compile(contractCode, 1)

// export 
module.exports = output['contracts'][':Service']
console.log('bytecode : ', output['contracts'][':Service']['bytecode'])
console.log('abi : ', output['contracts'][':Service']['interface'])

