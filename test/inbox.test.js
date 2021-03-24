const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const compile = require('../compile');
const interface = compile.contracts['inbox.sol'].Inbox.abi;
const bytecode = compile.contracts['inbox.sol'].Inbox.evm.bytecode.object;
const INITIAL_STRING = 'Hi there!';


let accounts;
let inbox;

beforeEach( async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    
    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(interface)
    .deploy({data: bytecode, arguments: ['Hi there!']}) 
    .send({from:accounts[0], gas:'1000000'});

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        // console.log(inbox);
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
    
});