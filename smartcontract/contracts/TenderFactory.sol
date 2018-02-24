pragma solidity ^0.4.18;

import './Tender.sol';

contract TenderFactory {

    mapping(address => address[]) public created;
    mapping(address => bool) public isTender;

    event ContractInstantiation(address indexed sender, address indexed instantiation);

    function TenderFactory() public  {
        // constructor
    }

    function createTender(
        string  _tender_desc,
        uint256 _submissions_due,
        uint256 _sealing_due,
        address _unsealer,
        address _selector,
        uint8   _tender_type,
        uint8   _tender_scope,
        uint    _fund_cap
    ) public payable returns (address) {
        Tender newContract = new Tender(
            _tender_desc,
            _submissions_due,
            _sealing_due,
            _unsealer,
            _selector,
            _tender_type,
            _tender_scope,
            _fund_cap
        );
        created[msg.sender].push(address(newContract));
        ContractInstantiation(msg.sender, address(newContract));
        /* newContract.transferOwnership(msg.sender); */
        isTender[address(newContract)] = true;
        return address(newContract);
    }

    function getCreated(address _address) view public returns (address[]) {
        return created[_address];
    }
}
