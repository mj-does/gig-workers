// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProjectEscrow {
    enum Status { Requested, Accepted, Submitted, Verified }

    struct Project {
        address payable client;
        address payable developer;
        string metadataURI;
        string submissionURI;
        uint256 amount;
        Status status;
    }

    uint256 public projectCounter;
    mapping(uint256 => Project) public projects;

    event ProjectCreated(uint256 indexed id);
    event ProjectAccepted(uint256 indexed id);
    event WorkSubmitted(uint256 indexed id);
    event WorkVerified(uint256 indexed id);
    event PaymentReleased(uint256 indexed id, address developer);

    function createProjectRequest(address payable _developer, string memory _metadataURI) external payable {
        projectCounter++;
        projects[projectCounter] = Project({
            client: payable(msg.sender),
            developer: _developer,
            metadataURI: _metadataURI,
            submissionURI: "",
            amount: msg.value,
            status: Status.Requested
        });
        emit ProjectCreated(projectCounter);
    }

    function acceptProject(uint256 _id) external {
        Project storage p = projects[_id];
        require(msg.sender == p.developer, "Only developer can accept");
        require(p.status == Status.Requested, "Already accepted");
        p.status = Status.Accepted;
        emit ProjectAccepted(_id);
    }

    function submitWork(uint256 _id, string memory _submissionURI) external {
        Project storage p = projects[_id];
        require(msg.sender == p.developer, "Only developer can submit");
        require(p.status == Status.Accepted, "Project not accepted");
        p.submissionURI = _submissionURI;
        p.status = Status.Submitted;
        emit WorkSubmitted(_id);
    }

    function verifyWork(uint256 _id) external {
        Project storage p = projects[_id];
        require(msg.sender == p.client, "Only client can verify");
        require(p.status == Status.Submitted, "Work not submitted");
        p.status = Status.Verified;
        emit WorkVerified(_id);

        uint256 amount = p.amount;
        p.amount = 0;
        (bool success, ) = p.developer.call{value: amount}("");
        require(success, "Payment failed");
        emit PaymentReleased(_id, p.developer);
    }

    function getProject(uint256 _id) public view returns (Project memory) {
        return projects[_id];
    }
}
