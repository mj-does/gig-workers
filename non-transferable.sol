// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SoulboundToken is ERC721URIStorage {
    constructor() ERC721("SoulboundToken", "MTK") {}

    // Disable all transfer functionality
    function _transfer(address from, address to, uint256 tokenId) internal pure override {
        revert("SoulboundToken: Transfers are disabled");
    }

    // Disable approval functionality
    function approve(address to, uint256 tokenId) public pure override {
        revert("SoulboundToken: Approvals are disabled");
    }

    function setApprovalForAll(address operator, bool approved) public pure override {
        revert("SoulboundToken: Approvals are disabled");
    }

    function getApproved(uint256 tokenId) public pure override returns (address) {
        return address(0);
    }

    function isApprovedForAll(address owner, address operator) public pure override returns (bool) {
        return false;
    }
}
