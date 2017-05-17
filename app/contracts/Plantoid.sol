pragma solidity ^0.4.6;

contract Plantoid {
	
	// struct Proposal { address proposer; bytes32 url; uint256 votes; }
	mapping (address => bool) voters;
	mapping (address => uint256) funders;
	mapping (address => string) proposals;
	mapping (address => uint) public votes;
	address[] public allProposals;
	// address[] public allFunders;
	address public winner;
	
	// btc version test
	mapping (string => uint256) btcFunders;
	uint256 btcBalance;
	
	uint256 totalweight;
	uint256 public targetBalance;
	enum PossibleStatus { Fundraising, OpenCall, ClosedCall }
	PossibleStatus public status;
	
	modifier forStatus (PossibleStatus _status) {
		if (status != _status) { throw; }
		_;
	}
	
	modifier notForStatus (PossibleStatus _status) {
		if (status == _status) { throw; }
		_;
	}
	
	event Funded (address indexed _funder, uint _amount);
	event BtcFunded (string indexed _funder, uint _amount);
	
	function getAddress() constant returns(address) {
		address _contract = this;
		return _contract;
	}
	
	function getBalance() constant returns(uint256)   {
		address _contract = this;
		return _contract.balance;
	}
	
	function getStatus() constant returns(PossibleStatus) {
		return status;
	}
	
	function getWinner() constant returns(address) {
		return winner;
	}
	
	function btcFund(string _from, uint256 _amount) forStatus(PossibleStatus.Fundraising) payable returns(string) {
		
		BtcFunded(_from, _amount);
		
		btcFunders[_from] += _amount;
		
		if(btcBalance >= targetBalance) {
			status = PossibleStatus.OpenCall;
		}
		
		return _from;
	}
	
	function fund() forStatus(PossibleStatus.Fundraising) payable returns(address) {
		
		Funded(msg.sender, msg.value);
		
		funders[msg.sender] += msg.value;
		
		if(this.balance >= targetBalance) {
			status = PossibleStatus.OpenCall;
		}
		
		return msg.sender;
	}
	
	
	function addProposal(string url) forStatus(PossibleStatus.OpenCall)  {
		if(bytes(proposals[msg.sender]).length == 0) {
			allProposals.length++ ;
			allProposals[allProposals.length-1] = msg.sender;
		}
		
		proposals[msg.sender] = url;
		
		
	}
	
	function getProposal(uint256 id) constant returns(address _from, string _url, uint _votes) {
		_from = allProposals[id];
		_url = proposals[_from];
		_votes = votes[_from];
	}
	
	function nProposals() constant returns (uint n) {  n+=1-1;
		return allProposals.length;
	}
	
	
	
	function voteProposal(address id) forStatus(PossibleStatus.OpenCall) {
		if(voters[msg.sender]) {throw;}
		
		votes[id] += funders[msg.sender];
		voters[msg.sender] = true;
		
		totalweight += funders[msg.sender];
		
		//   Voted(msg.sender, id, funders[msg.sender]);
		
		
		if(votes[id] > this.balance/2) {  //ADD MORE MATHS
			status = PossibleStatus.ClosedCall;
			winner = id;
		}
		
		
	}
	
	/*    function getWinner() returns(string _url, uint256 _votes) {
		return getProposal(winner);
	}
	*/
	function targetBal() constant returns (uint retVal) {
		return targetBalance;
	}
	
	function Plantoid() {
		//   targetBalance = 2500000000000000000;
		targetBalance = 70000000000000000;
		status = PossibleStatus.Fundraising;
		
	}
}
