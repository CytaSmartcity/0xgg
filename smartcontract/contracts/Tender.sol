pragma solidity ^0.4.18;

contract Tender {

  struct Offer {
      // submit sealed offer
      address owner;
      bytes32 offer_hash;
      bytes  sealed_offer;

      bytes   unsealer_key;
      uint8   unseal_status;
      bytes   selector_key;
  }

  event NewOffer(address owner, bytes32 _offer_hash, bytes _sealed_offer);
  event UnsealerKeyShared(address owner, bytes _unsealer_key);
  event OfferUnsealed(address owner, bytes selector_key, uint8 unseal_status);
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
  uint256 public sealing_due;
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
    uint256 _sealing_due,
    address _unsealer,
    address _selector,
    uint8   _tender_type,
    uint8   _tender_scope,
    uint    _fund_cap
  ) public {
    // constructor
    tender_desc       = _tender_desc;
    submissions_due   = _submissions_due;
    sealing_due       = _sealing_due;
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
  function submit_sealed_offer(bytes32 _offer_hash, bytes _sealed_offer) public returns (bool) {
    require(now <= submissions_due);
    require(owners[msg.sender] == 0x0);
    offers[offers_count].offer_hash = _offer_hash;
    offers[offers_count].sealed_offer = _sealed_offer;
    offers[offers_count].owner = msg.sender;
    owners[msg.sender] = offers_count;
    offers_count++;
    NewOffer(owner, _offer_hash, _sealed_offer);
    return true;
  }

  function share_key_with_unsealer(bytes _unsealer_key) public returns (bool) {
    require(now > submissions_due);                 // submission period is over
    uint32 id = owners[msg.sender];
    /* require(offers[id].offer_hash != 0x0);          // offer exists */
    require(offers[id].unsealer_key.length == 0);   // key not already submitted
    offers[id].unsealer_key = _unsealer_key;
    UnsealerKeyShared(msg.sender, _unsealer_key);
    return true;
  }

  function unseal_offer(address _offer_owner, bytes _selector_key, uint8 _unseal_status) public returns(bool) {
    require(now > submissions_due);       // submission period is over
    require(msg.sender == unsealer);      // sender is unsealer
    uint32 id = owners[_offer_owner];
    require(offers[id].offer_hash != 0x0);   // offer exists
    require(offers[id].unseal_status == AWAITING_UNSEALER);
    require(_unseal_status == UNSEALER_REJECTED || _unseal_status == UNSEALED);
    offers[id].unseal_status = _unseal_status;
    offers[id].selector_key = _selector_key;
    unsealed_count++;
    OfferUnsealed(_offer_owner, _selector_key, _unseal_status);
    return true;
  }

  function select_offer(address _offer_owner) public returns(bool) {
    require(now > sealing_due);
    require(!isSelected);
    require(msg.sender == selector);
    require(sealed_count == unsealed_count);
    require(owners[_offer_owner] != 0x0);
    selected_offer = _offer_owner;
    isSelected = true;
    OfferSelected(_offer_owner);
    return true;
  }

}
