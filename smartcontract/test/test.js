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
    const resp = await tender.submit_sealed_offer.call(web3.sha3(offer), offer_sealed, {from: alice});
    assert.equal(resp, true);
  })

  it("Bob submits a sealed offer", async function() {
    offer = "ekato ena lefta";
    offer_sealed = "|" + offer + "|";
    const resp = await tender.submit_sealed_offer.call(web3.sha3(offer), offer_sealed, {from: bob});
    assert.equal(resp, true);
  })

  it("David submits a sealed offer", async function() {
    offer = "ena lefta";
    offer_sealed = "|" + offer + "|";
    const resp = await tender.submit_sealed_offer.call(web3.sha3(offer), offer_sealed, {from: david});
    assert.equal(resp, true);
  })

  it("Eve submits a sealed offer", async function() {
    offer = "shillia lefta";
    offer_sealed = "|" + offer + "|";
    const resp = await tender.submit_sealed_offer.call(web3.sha3(offer), offer_sealed, {from: eve});
    assert.equal(resp, true);
  })

  it("Carol submits a sealed offer after submission due time and it fails", async function() {
      await timeTravel(31)
      mineBlock()
      offer = "mouxti";
      offer_sealed = "|" + offer + "|";
      let error
      try {
          await tender.submit_sealed_offer.call(web3.sha3(offer), offer_sealed, {from: carol});
      } catch (err) {
          error = err;
      }
      assert.notEqual(error, undefined, 'Error must be thrown');
  })

  it("Alice shares key with unsealer", async function() {
      unsealer_key = "klidi11idilk"
      // try {
      //   const resp = await tender.share_key_with_unsealer.call(unsealer_key, {from: alice});
      // } catch (err) {
      //   console.log(err);
      // }
      const resp = await tender.share_key_with_unsealer.call(unsealer_key, {from: alice});
      assert.equal(resp, true);
  })

  it("Bob shares key with unsealer", async function() {
      unsealer_key = "klidi22idilk"
      const resp = await tender.share_key_with_unsealer.call(unsealer_key, {from: bob});
      assert.equal(resp, true);
  })

  it("Eve shares key with unsealer", async function() {
      unsealer_key = "klidi33idilk"
      const resp = await tender.share_key_with_unsealer.call(unsealer_key, {from: eve});
      assert.equal(resp, true);
  })

  it("David shares key with unsealer after sealing time due", async function() {
      await timeTravel(270)
      mineBlock()
      unsealer_key = "klidi44idilk"
      let error
      try {
          await tender.share_key_with_unsealer.call(unsealer_key, {from: david});
      } catch (err) {
          error = err;
      }
      assert.notEqual(error, undefined, 'Error must be thrown');
  })

  // it("should assert true", function(done) {
  //   var test = test.deployed();
  //   assert.isTrue(true);
  //   done();
  // });
});
