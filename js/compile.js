// 导入solc和fs
let solc = require('solc')
let fs = require('fs')

// 读取合约代码
let contractCode = fs.readFileSync('../contract/Service.sol', 'utf-8')

// 编译合约代码
let output = solc.compile(contractCode, 1)
// 执行导出
module.exports = output['contracts'][':Service']
console.log('bytecode : ', output['contracts'][':Service']['bytecode'])
console.log('abi : ', output['contracts'][':Service']['interface'])

