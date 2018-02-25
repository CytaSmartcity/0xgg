const web3 = global.web3

var Tender = artifacts.require("./Tender.sol")

contract('Tender', function(accounts) {

  let alice = accounts[0]
  let bob = accounts[1]
  let carol = accounts[2]
  let david = accounts[3]
  let eve = accounts[4]
  let governor = accounts[5]
  let unsealer = accounts[6]
  let selector = accounts[7]

  const timeTravel = function (time) {
    return new Promise((resolve, reject) => {
      web3.currentProvider.sendAsync({
        jsonrpc: "2.0",
        method: "evm_increaseTime",
        params: [time], // 86400 is num seconds in day
        id: new Date().getSeconds()
      }, (err, result) => {
        if(err){ return reject(err) }
        return resolve(result)
      });
    })
  }

  const mineBlock = function () {
    web3.currentProvider.send({jsonrpc: "2.0", method: "evm_mine", params: [], id: 0})
  }

  before(async function () {
      //Create contract instances
      tender = await Tender.new({from: governor})

      now = (await web3.eth.getBlock('latest')).timestamp

      tender = await Tender.new(
          "best tender ever", // tender_desc
          now + 30,           // submissions_due
          now + 300,          // sealing_due
          unsealer,           // unsealer
          selector,           // selector
          0,                  // tender_type
          0,                  // tender_scope
          web3.toWei(10000),  // fund_cap
          {from: governor}    // value: web3.toWei(200)
      )
  })

  it("Governor is the owner of Tender", async function() {
      const ownerAddress = await tender.owner.call({from: governor});
      assert.equal(ownerAddress, governor);
  })

  it("Check initial state", async function() {
      const offers_count = await tender.offers_count.call({from: governor})
      const sealed_count = await tender.sealed_count.call({from: governor})
      const unsealed_count = await tender.unsealed_count.call({from: governor})
      const selected_offer = await tender.selected_offer.call({from: governor})
      const isSelected = await tender.isSelected.call({from: governor})
      assert.equal(offers_count, 0);
      assert.equal(sealed_count, 0);
      assert.equal(unsealed_count, 0);
      assert.equal(selected_offer, 0x0);
      assert.equal(isSelected, false);
  })


  it("Alice submits a sealed offer", async function() {
    offer = "ekato lefta";
    offer_sealed = "|" + offer + "|";

    let newOffer = tender.NewOffer()
    await tender.submit_sealed_offer(web3.sha3(offer), offer_sealed, {from: alice});
    let newOfferLog = await new Promise(
        (resolve, reject) => newOffer.get(
        (error, log) => error ? reject(error) : resolve(log)));
    assert.equal(newOfferLog.length, 1, 'Only 1 event should have fired');
  })

  it("Bob submits a sealed offer", async function() {
    offer = "ekato ena lefta";
    offer_sealed = "|" + offer + "|";
    let newOffer = tender.NewOffer();
    await tender.submit_sealed_offer(web3.sha3(offer), offer_sealed, {from: bob});
    let newOfferLog = await new Promise(
        (resolve, reject) => newOffer.get(
        (error, log) => error ? reject(error) : resolve(log)));
    assert.equal(newOfferLog.length, 1, 'Only 1 event should have fired');
  })

  it("Bobs stored offer should match the offer fetched from chain", async function() {
      offer = "ekato ena lefta";
      offer_sealed = "|" + offer + "|";
      const bobs_offer = await tender.offers.call(bob, {from: bob})
      assert.equal(bobs_offer[0], bob)                        // owner
      assert.equal(bobs_offer[1], web3.sha3(offer))           // offer_hash
      assert.equal(web3.toAscii(bobs_offer[2]), offer_sealed) // sealed_offer
      assert.equal(bobs_offer[3].length, 2)                   // unsealer_key
      assert.equal(bobs_offer[4].toNumber(), 0)               // unseal_status
      assert.equal(bobs_offer[5].length, 2)                   // selector_key
  })

  it("David submits a sealed offer", async function() {
    offer = "ena lefta";
    offer_sealed = "|" + offer + "|";
    let newOffer = tender.NewOffer();
    const resp = await tender.submit_sealed_offer(web3.sha3(offer), offer_sealed, {from: david});
    let newOfferLog = await new Promise(
        (resolve, reject) => newOffer.get(
        (error, log) => error ? reject(error) : resolve(log)));
    assert.equal(newOfferLog.length, 1, 'Only 1 event should have fired');
  })

  it("Eve submits a sealed offer", async function() {
    offer = "shillia lefta";
    offer_sealed = "|" + offer + "|";
    let newOffer = tender.NewOffer();
    const resp = await tender.submit_sealed_offer(web3.sha3(offer), offer_sealed, {from: eve});
    let newOfferLog = await new Promise(
        (resolve, reject) => newOffer.get(
        (error, log) => error ? reject(error) : resolve(log)));
    assert.equal(newOfferLog.length, 1, 'Only 1 event should have fired');
  })

  it("Carol submits a sealed offer after submission due time and it fails", async function() {
      await timeTravel(31);
      mineBlock();
      offer = "mouxti";
      offer_sealed = "|" + offer + "|";
      let error
      try {
          await tender.submit_sealed_offer(web3.sha3(offer), offer_sealed, {from: carol});
      } catch (err) {
          error = err;
      }
      assert.notEqual(error, undefined, 'Error must be thrown');
  })

  it("Alice shares key with unsealer", async function() {
      symetric_key = "klidi11idilk"
      unsealer_key = "+" + symetric_key + "+"
      let unsealerKeyShared = tender.UnsealerKeyShared();
      const resp = await tender.share_key_with_unsealer(unsealer_key, {from: alice});
      let unsealerKeySharedLog = await new Promise(
          (resolve, reject) => unsealerKeyShared.get(
          (error, log) => error ? reject(error) : resolve(log)));
      assert.equal(unsealerKeySharedLog.length, 1, 'Only 1 event should have fired');
  })

  it("Bob shares key with unsealer", async function() {
      symetric_key = "klidi22idilk"
      unsealer_key = "+" + symetric_key + "+"
      let unsealerKeyShared = tender.UnsealerKeyShared();
      const resp = await tender.share_key_with_unsealer(unsealer_key, {from: bob});
      let unsealerKeySharedLog = await new Promise(
          (resolve, reject) => unsealerKeyShared.get(
          (error, log) => error ? reject(error) : resolve(log)));
      assert.equal(unsealerKeySharedLog.length, 1, 'Only 1 event should have fired');
  })

  it("Eve shares key with unsealer", async function() {
      symetric_key = "klidi33idilk"
      unsealer_key = "+" + symetric_key + "+"
      let unsealerKeyShared = tender.UnsealerKeyShared();
      const resp = await tender.share_key_with_unsealer(unsealer_key, {from: eve});
      let unsealerKeySharedLog = await new Promise(
          (resolve, reject) => unsealerKeyShared.get(
          (error, log) => error ? reject(error) : resolve(log)));
      assert.equal(unsealerKeySharedLog.length, 1, 'Only 1 event should have fired');
  })

  AWAITING_UNSEALER = 0;
  UNSEALER_REJECTED = 1;
  UNSEALED = 2;

  it("Unsealer unseals Alices offer", async function() {
      secret_key = "klidi11idilk"
      selector_key = "*" + secret_key + "*"
      unseal_status = UNSEALED
      let offerUnsealed = tender.OfferUnsealed();
      const resp = await tender.unseal_offer(alice, selector_key, unseal_status, {from: unsealer});
      let offerUnsealedLog = await new Promise(
          (resolve, reject) => offerUnsealed.get(
          (error, log) => error ? reject(error) : resolve(log)));
      assert.equal(offerUnsealedLog.length, 1, 'Only 1 event should have fired');
  })

  it("Eve fails to unseal Bobs offer", async function() {
      secret_key = "random11modnar"
      selector_key = "*" + secret_key + "*"
      unseal_status = UNSEALED
      let error
      try {
          await tender.unseal_offer(bob, selector_key, unseal_status, {from: eve});
      } catch (err) {
          error = err;
      }
      assert.notEqual(error, undefined, 'Error must be thrown');
  })

  it("Unsealer unseals Bobs offer", async function() {
      secret_key = "klidi22idilk"
      selector_key = "*" + secret_key + "*"
      unseal_status = UNSEALED
      let offerUnsealed = tender.OfferUnsealed();
      const resp = await tender.unseal_offer(bob, selector_key, unseal_status, {from: unsealer});
      let offerUnsealedLog = await new Promise(
          (resolve, reject) => offerUnsealed.get(
          (error, log) => error ? reject(error) : resolve(log)));
      assert.equal(offerUnsealedLog.length, 1, 'Only 1 event should have fired');
  })

  it("Unsealer unseals and rejects Eves offer", async function() {
      secret_key = "klidi33idilk"
      selector_key = "*" + secret_key + "*"
      unseal_status = UNSEALER_REJECTED
      let offerUnsealed = tender.OfferUnsealed();
      const resp = await tender.unseal_offer(eve, selector_key, unseal_status, {from: unsealer});
      let offerUnsealedLog = await new Promise(
          (resolve, reject) => offerUnsealed.get(
          (error, log) => error ? reject(error) : resolve(log)));
      assert.equal(offerUnsealedLog.length, 1, 'Only 1 event should have fired');
  })

  it("David shares key with unsealer after sealing time due", async function() {
      await timeTravel(301);
      mineBlock();
      symetric_key = "klidi44idilk"
      unsealer_key = "+" + symetric_key + "+"
      let error
      try {
          await tender.share_key_with_unsealer(unsealer_key, {from: david});
      } catch (err) {
          error = err;
      }
      assert.notEqual(error, undefined, 'Error must be thrown');
  })

  it("Selector selects rejected and fails", async function() {
      unlocker = "**"
      let offerUnsealed = tender.OfferUnsealed();
      let error
      try {
          await tender.unseal_offer(eve, selector_key, unseal_status, {from: selector});
      } catch (err) {
          error = err;
      }
      assert.notEqual(error, undefined, 'Error must be thrown');
  })

  it("Unsealer selects offer and fails", async function() {
      unlocker = "--"
      let offerUnsealed = tender.OfferUnsealed();
      let error
      try {
          await tender.unseal_offer(bob, selector_key, unseal_status, {from: unsealer});
      } catch (err) {
          error = err;
      }
      assert.notEqual(error, undefined, 'Error must be thrown');
  })

  it("Selector selects offer", async function() {
      unlocker_key = "**"
      let offerSelected = tender.OfferSelected();
      const resp = await tender.select_offer(bob, unlocker_key, {from: selector});
      let offerSelectedLog = await new Promise(
          (resolve, reject) => offerSelected.get(
          (error, log) => error ? reject(error) : resolve(log)));
      assert.equal(offerSelectedLog.length, 1, 'Only 1 event should have fired');
  })
});
