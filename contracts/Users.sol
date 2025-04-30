// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Users {
    struct User {
        bool registered;
        uint8 rating;
        uint256[] pendingWorkRequests;
        uint256[] pendingJobRequests;
        uint256[] workInProgress;
        uint256[] jobInProgress;
        uint256[] workCompleted;
        uint256[] jobCompleted;
        uint256[] workRejected;
        uint256[] jobRejected;
    }

    mapping(address => User) users;

    function createNewUser() external {
        require(!users[msg.sender].registered, "User already registered");
        users[msg.sender].registered = true;
    }

    function setRating(uint8 newRating) public {
        require(users[msg.sender].registered, "User not registered");
        users[msg.sender].rating = newRating;
    }

    function getRating() public view returns (uint8) {
        require(users[msg.sender].registered, "User not registered");
        return users[msg.sender].rating;
    }

    function addPendingWorkRequest(uint256 id) public {
        require(users[msg.sender].registered, "User not registered");
        users[msg.sender].pendingWorkRequests.push(id);
    }

    function getPendingWorkRequests() public view returns (uint256[] memory) {
        require(users[msg.sender].registered, "User not registered");
        return users[msg.sender].pendingWorkRequests;
    }

    function addPendingJobRequest(uint256 id) public {
        require(users[msg.sender].registered, "User not registered");
        users[msg.sender].pendingJobRequests.push(id);
    }

    function getPendingJobRequests() public view returns (uint256[] memory) {
        require(users[msg.sender].registered, "User not registered");
        return users[msg.sender].pendingJobRequests;
    }

    function addWorkInProgress(uint256 id) public {
        require(users[msg.sender].registered, "User not registered");
        users[msg.sender].workInProgress.push(id);
    }

    function getWorkInProgress() public view returns (uint256[] memory) {
        require(users[msg.sender].registered, "User not registered");
        return users[msg.sender].workInProgress;
    }

    function addJobInProgress(uint256 id) public {
        require(users[msg.sender].registered, "User not registered");
        users[msg.sender].jobInProgress.push(id);
    }

    function getJobInProgress() public view returns (uint256[] memory) {
        require(users[msg.sender].registered, "User not registered");
        return users[msg.sender].jobInProgress;
    }

    function addWorkCompleted(uint256 id) public {
        require(users[msg.sender].registered, "User not registered");
        users[msg.sender].workCompleted.push(id);
    }

    function getWorkCompleted() public view returns (uint256[] memory) {
        require(users[msg.sender].registered, "User not registered");
        return users[msg.sender].workCompleted;
    }

    function addJobCompleted(uint256 id) public {
        require(users[msg.sender].registered, "User not registered");
        users[msg.sender].jobCompleted.push(id);
    }

    function getJobCompleted() public view returns (uint256[] memory) {
        require(users[msg.sender].registered, "User not registered");
        return users[msg.sender].jobCompleted;
    }

    function addWorkRejected(uint256 id) public {
        require(users[msg.sender].registered, "User not registered");
        users[msg.sender].workRejected.push(id);
    }

    function getWorkRejected() public view returns (uint256[] memory) {
        require(users[msg.sender].registered, "User not registered");
        return users[msg.sender].workRejected;
    }

    function addJobRejected(uint256 id) public {
        require(users[msg.sender].registered, "User not registered");
        users[msg.sender].jobRejected.push(id);
    }

    function getJobRejected() public view returns (uint256[] memory) {
        require(users[msg.sender].registered, "User not registered");
        return users[msg.sender].jobRejected;
    }
}
