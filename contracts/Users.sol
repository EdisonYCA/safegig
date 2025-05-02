// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Users {
    struct User {
        bool registered;
        mapping(uint => address) deployedContracts; // job ID → contract address
    }

    mapping(address => User) public users;

    function createNewUser() external {
        require(!users[msg.sender].registered, "User already registered");
        users[msg.sender].registered = true;
    }

    function saveDeployedContract(uint jobId, address contractAddress) external {
        require(users[msg.sender].registered, "User not registered");
        users[msg.sender].deployedContracts[jobId] = contractAddress;
    }

    function getDeployedContract(address user, uint jobId) external view returns (address) {
        require(users[user].registered, "User not registered");
        return users[user].deployedContracts[jobId];
    }
}
