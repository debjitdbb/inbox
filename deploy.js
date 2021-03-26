// const { interfaces } = require('mocha')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const HDWalletProvider2 = require("truffle-hdwallet-provider");

const Web3 = require('web3')
const compile = require('./compile');
const interface = compile.contracts['inbox.sol'].Inbox.abi;
const bytecode = compile.contracts['inbox.sol'].Inbox.evm.bytecode.object;
const credentials = require('./config');
const mnemonicPhrase = credentials.mnemonic;
const endpoint = credentials.endpoint;

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl:
    endpoint,
});


const prov = new HDWalletProvider2(
  mnemonicPhrase,
  endpoint
);
const web3 = new Web3(prov);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account',accounts[0]);

    try{
        const result = await new web3.eth.Contract(interface)
          .deploy({ data: bytecode, arguments: ["Hi there!"] })
          .send({from: accounts[0],gas:1000000});

        console.log("Contract deployed to", result.options.address);
    } catch(e){
        console.log('error',e);
    }
    
};

deploy();