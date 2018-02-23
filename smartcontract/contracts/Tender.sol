pragma solidity ^0.4.18;

contract Tender {

  struct Offer {
      bytes32 offer_hash;
      address owner;
      bytes unsealers;
      bytes selector;
      string offer;
      bool unsealed;
  }

  address public owner;
  mapping(uint32 => Offer) offers;
  mapping(address => uint32) owners;
  uint32 count;
  string tender;
  uint8 tender_type;
  bool selected;
  address unsealer;
  address selector;

  function Tender(string _tender, uint8 _tender_type, address _unsealer, address _selector) public {
    // constructor
    owner = msg.sender;
    tender = _tender;
    tender_type = _tender_type;
    unsealer = _unsealer;
    selector = _selector;
    count = 0;
    selected = false;
  }

  function submit_offer(bytes32 _offer_hash) public returns (bool) {
    offers[count].offer_hash = _offer_hash;
    offers[count].owner = msg.sender;
    owners[msg.sender] = count;
    count++;
    return true;
  }

  function submit_offer_details(string _offer) public returns (bool) {
    uint32 id = owners[msg.sender];
    // require valid time slot
    require(sha256(_offer) == offers[id].offer_hash);
    offers[id].offer = _offer;
    return true;
  }

  function unseal_offer(uint32 _id) public returns(bool) {
    require(msg.sender == unsealer);
    require(owners[_id] != 0x0);
    offers[owners[_id]].unsealed = true;
  }

  function select_offer(uint32 _id) public returns(bool) {
    require(!selected);
    require(msg.sender == selector);
    require(owners[_id] != 0x0);
    selected = true;
  }

  /* function submit_offer_for_selection() {

  } */

}
