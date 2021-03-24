const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');
const source = fs.readFileSync(inboxPath,'utf-8');

const obj = (JSON.parse(solc.compile(JSON.stringify({
  language: 'Solidity',
  sources: {
    'inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['evm', 'abi'],
      },
    },
  },
}))));

// console.log(obj.contracts['inbox.sol'].Inbox.evm.bytecode.object);
// console.log(obj.contracts['inbox.sol'].Inbox);


module.exports = obj;