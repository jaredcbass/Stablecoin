// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Stablecoin is ERC777, Pausable, AccessControl  {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    address[] private _defaultOperatorsArray;

    constructor() ERC777("Bank USD Stablecoin", "BUS", _defaultOperatorsArray){
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(operator, from, to, amount);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function operatorMint(
        address account, 
        uint256 amount, 
        bytes memory userData, 
        bytes memory operatorData
    ) public {
        _mint(account, amount, userData, operatorData);
    }

    function _mint(address account, uint256 amount, bytes memory userData, bytes memory operatorData)
        internal override
        onlyRole(MINTER_ROLE)
    {
        super._mint(account, amount, userData, operatorData);
    }

    function operatorBurn(
        address account,
        uint256 amount,
        bytes memory data,
        bytes memory operatorData
    ) public override {
        _burn(account, amount, data, operatorData);
    }

    function _burn(address account, uint256 amount, bytes memory data, bytes memory operatorData)
        internal override
        onlyRole(BURNER_ROLE) 
    {
        super._burn(account, amount, data, operatorData);
    }
}