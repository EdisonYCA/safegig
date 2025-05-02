// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Job {
    address worker;     
    address client;      
    uint256 price;       
    uint256 bank;       
    uint256 paymentDate; 
    bool paid;

    constructor(address _client, uint256 _paymentDate, uint256 _price) payable {
        require(msg.value >= price, "Must have enough ETH to fund the contract");
        worker = msg.sender;
        client = _client;
        price = _price;
        bank = msg.value;
        paymentDate = _paymentDate;
        paid = false;
    }

    function releasePayment() external {
        require(block.timestamp >= paymentDate, "Payment date not reached");
        require(!paid, "Payment already made");

        paid = true;
        payable(client).transfer(bank);
        bank = 0;
    }
}
