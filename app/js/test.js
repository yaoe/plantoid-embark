var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var number = web3.eth.blockNumber;
console.log(number);


var abi = [{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"address"}],"name":"voteProposal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"status","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"url","type":"string"}],"name":"addProposal","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"nProposals","outputs":[{"name":"n","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"targetBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getStatus","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"string"},{"name":"_amount","type":"uint256"}],"name":"btcFund","outputs":[{"name":"","type":"string"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"targetBal","outputs":[{"name":"retVal","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getWinner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allProposals","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"fund","outputs":[{"name":"","type":"address"}],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getProposal","outputs":[{"name":"_from","type":"address"},{"name":"_url","type":"string"},{"name":"_votes","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"votes","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"winner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_funder","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Funded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_funder","type":"string"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"BtcFunded","type":"event"}];
var addr = "0x8e92c4e703444426a266aa24f7f84215be3fdde1";

var contract = web3.eth.contract(abi).at(addr);

var balance = contract.getBalance.call();
console.log(balance);

var nProp = contract.nProposals.call();  console.log(nProp);

var Prop = contract.getProposal(1).call(); console.log(Prop);
//console.log(Prop);

//var Vote = contract.voteProposal("0x1f183f20803984692c28e34585c7ab30a2804d07").call();

//var funding = contract.fund({value: 1000000}).send();

balance = contract.getBalance.call();
console.log(balance);
