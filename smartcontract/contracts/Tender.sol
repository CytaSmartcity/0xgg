pragma solidity ^0.4.18;

contract Tender {

  struct Offer {
      bytes32 offer_hash;
      address owner;

      string  sealed_offer;

      string  unsealed_offer;
      uint8   unseal_state;
  }

  event NewOffer(address owner, bytes32 _offer_hash);
  event OfferUnsealed(address owner);
  event OfferSelected(address owner);

  uint8 private constant AWAITING_UNSEALER = 0;
  uint8 private constant UNSEALER_REJECTED = 1;
  uint8 private constant UNSEALED = 2;

  // smart contruct info
  address public owner;
  mapping(uint32 => Offer)   offers;
  mapping(address => uint32) owners;
  uint32  public offers_count;
  uint32  public sealed_count;
  uint32  public unsealed_count;

  // Tender creation pubic info
  string  public tender_desc;
  uint256 public submissions_due;
  address public unsealer;
  address public selector;
  uint8   public tender_type;
  uint8   public tender_scope;
  uint    public fund_cap;
  bytes   public sealer_lock;

  // Tender state public info
  bool    public isSelected;
  address public selected_offer;

  function Tender(
    string  _tender_desc,
    uint256 _submissions_due,
    address _unsealer,
    address _selector,
    uint8   _tender_type,
    uint8   _tender_scope,
    uint    _fund_cap
  ) public {
    // constructor
    tender_desc       = _tender_desc;
    submissions_due   = _submissions_due;
    unsealer          = _unsealer;
    selector          = _selector;
    tender_type       = _tender_type;
    tender_scope      = _tender_scope;
    fund_cap          = _fund_cap;

    owner             = msg.sender;
    offers_count      = 0;
    sealed_count      = 0;
    unsealed_count    = 0;
    selected_offer    = 0x0;
    isSelected        = false;
  }

  // submit undisclosed offer by submitting the sha256 of the offer
  function submit_offer(bytes32 _offer_hash) public returns (bool) {
    offers[offers_count].offer_hash = _offer_hash;
    offers[offers_count].owner = msg.sender;
    owners[msg.sender] = offers_count;
    offers_count++;
    NewOffer(owner, _offer_hash);
    return true;
  }

  /* function submit_offer_details(string _offer) public returns (bool) {
    require(now <= submissions_due);
    uint32 id = owners[msg.sender];
    require(sha256(_offer) == offers[id].offer_hash);
    offers[id].offer = _offer;
    return true;
  } */

  function submit_sealed_offer(string _sealed_offer) public returns(bool) {
    require(now > submissions_due);       // submission period is over
    require(owners[msg.sender] != 0x0);   // sender owns a submission
    offers[owners[msg.sender]].sealed_offer = _sealed_offer;
    sealed_count++;
    return true;
  }

  function unseal_offer(address _offer_owner, string _unsealed_offer, uint8 _unseal_state) public returns(bool) {
    require(now > submissions_due);       // submission period is over
    require(msg.sender == unsealer);      // sender is unsealer
    uint32 id = owners[_offer_owner];
    require(offers[id].offer_hash != 0x0);   // offer exists
    require(offers[id].unseal_state == AWAITING_UNSEALER);
    require(_unseal_state == UNSEALER_REJECTED || _unseal_state == UNSEALED);
    offers[id].unseal_state = _unseal_state;
    offers[id].sealed_offer = _unsealed_offer;
    unsealed_count++;
    return true;
  }

  function select_offer(address _offer_owner) public returns(bool) {
    require(!isSelected);
    require(msg.sender == selector);
    require(sealed_count == unsealed_count);
    require(owners[_offer_owner] != 0x0);
    selected_offer = _offer_owner;
    isSelected = true;
    return true;
  }

  /* function submit_offer_for_selection() {

  } */

}
