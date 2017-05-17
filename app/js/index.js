/*globals $, SimpleStorage, document*/



$(document).ready(function() {

var select = document.getElementById("accounts");

var accounts = web3.eth.accounts;
console.log(accounts);
for(var i=0; i<accounts.length; i++) {
	select.options.add( new Option(accounts[i], accounts[i]));
}


  $("#getBalance").click(function() {
     console.log("coucou");
    // Plantoid.getBalance().then(function (address, value, trois, quatre) {
     //   console.log(address, value, trois, quatre);
     Plantoid.getBalance().then(function(value) {
        $("#balance").val(value.toNumber());
        console.log(value.toNumber());
     });
  });

  $("#getStatus").click(function() {
  	Plantoid.getStatus().then(function(value) {
  		$("#status").val(value.toNumber());
  		console.log(value.toNumber());
  	})
  })

$("#getWinner").click(function() {
  	Plantoid.getWinner().then(function(value) {
  		$("#winnerID").val(value);
  		console.log("AND THE WINNER IS: "+value);
  	})
  })


  $("#sendFunds").click(function() {
  	var amount = document.getElementById("amount").value;
  	console.log("sending funds...." + amount);
  	amount = web3.toWei(amount, "ether");
  	Plantoid.fund({value: amount, from: select.options[select.selectedIndex].value});
  });

  $("#sendProposal").click(function() {
  	var url = document.getElementById("proposalURL").value;
  	console.log("sending proposal...." + url);
  	Plantoid.addProposal(url, { from: select.options[select.selectedIndex].value});
  });

  $("#voteProposal").click(function() {
  	var id = document.getElementById("proposalID").value;
  	Plantoid.voteProposal(id, { from: select.options[select.selectedIndex].value});
  });

  $("#listProposals").click(function() {
  	Plantoid.nProposals().then(function(value) {
  		console.log("number of total proposals = " + value);
  		//$("#proposals").val("");
  		var newtext = "";
  		for(var i=0; i<value.toNumber(); i++) {
  			Plantoid.getProposal(i).then(function(values) {   // values = from, url, votes 
  				console.log(values);
  				//if(i == 0) { $("#proposals").val(""); console.log("clearing..."); }
  				//$("#proposals").append( "\nfrom = "+ values[0] + "   URL:  " + values[1] + "( "+values[2].toNumber()+ ")"); 
  				//console.log("appended:  " + values[1]);
  				newtext += "\nfrom = "+ values[0] + "   URL:  " + values[1] + "( "+values[2].toNumber()+ ")"
  				$("#proposals").val(newtext);
  			});
  		}
  	});
 
  });

});

console.log(Plantoid);

Plantoid.Funded().then(function(event) {
	console.log("from = "+event.args._funder + " amount = " + event.args._amount.toNumber());
});

/*

var event = Plantoid.Funded({}, { fromBlock: 0, toBlock: 'latest'});
console.log(event.cb);
event.watch(function(error, result) {
	if(!error) console.log(result);
	else console.log("Funded error: " + error);
});

*/


/*
var event = Plantoid.Funded(function(error, result) {
	if(!error) console.log("Fundedddd:::: " + result);
	else console.log("Funded error: " + error);
});
*/


/*
SimpleStorage.set(100);
SimpleStorage.get().then(function(value) { console.log(value.toNumber()) });
SimpleStorage.storedData().then(function(value) { console.log(value.toNumber()) });

Plantoid.targetBal().then(function(value) { console.log(value.toNumber()) });
Plantoid.getBalance().then(function(value) { console.log("getBalance: " + value.toNumber() ) } );
*/

//var isAddress = web3.isAddress('0x92049f58f8e79fac7c972d5aebdc3fa50ab32562');
//console.log(isAddress);
/*


//var amount = web3.toWei(0.01, "ether");
var sender = web3.eth.accounts[0];
var receiver = Plantoid.address;
console.log(receiver);

*/
//web3.eth.sendTransaction({from:sender, to:receiver, value:amount});

//Plantoid.fund({value: amount});

var balance = web3.eth.getBalance(Plantoid.address);
console.log(balance.toNumber());

