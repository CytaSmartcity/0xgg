// function init() {
var factoryAddress = "0xb4A3D9566fcDf0124A96A0c0d47B1eb5cB18cA8c" //"0xCC6927405413B9888bb7Aed20CE19Cb60b43345d";
var factoryAbi = [{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getCreated","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"created","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tender_desc","type":"string"},{"name":"_submissions_due","type":"uint256"},{"name":"_sealing_due","type":"uint256"},{"name":"_unsealer","type":"address"},{"name":"_selector","type":"address"},{"name":"_tender_type","type":"uint8"},{"name":"_tender_scope","type":"uint8"},{"name":"_fund_cap","type":"uint256"}],"name":"createTender","outputs":[{"name":"","type":"address"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isTender","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"instantiation","type":"address"}],"name":"ContractInstantiation","type":"event"}]

// var tenderAbi = [{"constant":true,"inputs":[],"name":"tender_type","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sealer_lock","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_unsealer_key","type":"bytes"}],"name":"share_key_with_unsealer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_offer_owner","type":"address"},{"name":"_selector_unlocker_key","type":"bytes"}],"name":"select_offer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"sealed_count","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"offers_count","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tender_scope","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fund_cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isSelected","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_offer_hash","type":"bytes32"},{"name":"_sealed_offer","type":"bytes"}],"name":"submit_sealed_offer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"sealing_due","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"submissions_due","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"selector_unlocker_key","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unsealer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tender_desc","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_offer_owner","type":"address"},{"name":"_selector_key","type":"bytes"},{"name":"_unseal_status","type":"uint8"}],"name":"unseal_offer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"selector","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unsealed_count","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"selected_offer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_tender_desc","type":"string"},{"name":"_submissions_due","type":"uint256"},{"name":"_sealing_due","type":"uint256"},{"name":"_unsealer","type":"address"},{"name":"_selector","type":"address"},{"name":"_tender_type","type":"uint8"},{"name":"_tender_scope","type":"uint8"},{"name":"_fund_cap","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"_offer_hash","type":"bytes32"},{"indexed":false,"name":"_sealed_offer","type":"bytes"}],"name":"NewOffer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"_unsealer_key","type":"bytes"}],"name":"UnsealerKeyShared","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"selector_key","type":"bytes"},{"indexed":false,"name":"unseal_status","type":"uint8"}],"name":"OfferUnsealed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"selector_unlocker_key","type":"bytes"}],"name":"OfferSelected","type":"event"}]

var tenderAbi = [{"constant":true,"inputs":[],"name":"tender_type","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sealer_lock","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_unsealer_key","type":"bytes"}],"name":"share_key_with_unsealer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_offer_owner","type":"address"},{"name":"_selector_unlocker_key","type":"bytes"}],"name":"select_offer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"offers","outputs":[{"name":"owner","type":"address"},{"name":"offer_hash","type":"bytes32"},{"name":"sealed_offer","type":"bytes"},{"name":"unsealer_key","type":"bytes"},{"name":"unseal_status","type":"uint8"},{"name":"selector_key","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sealed_count","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"offers_count","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tender_scope","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fund_cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isSelected","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_offer_hash","type":"bytes32"},{"name":"_sealed_offer","type":"bytes"}],"name":"submit_sealed_offer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"get_offer","outputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"bytes"},{"name":"","type":"bytes"},{"name":"","type":"uint8"},{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sealing_due","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"submissions_due","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"selector_unlocker_key","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unsealer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tender_desc","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_offer_owner","type":"address"},{"name":"_selector_key","type":"bytes"},{"name":"_unseal_status","type":"uint8"}],"name":"unseal_offer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"selector","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unsealed_count","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"selected_offer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_tender_desc","type":"string"},{"name":"_submissions_due","type":"uint256"},{"name":"_sealing_due","type":"uint256"},{"name":"_unsealer","type":"address"},{"name":"_selector","type":"address"},{"name":"_tender_type","type":"uint8"},{"name":"_tender_scope","type":"uint8"},{"name":"_fund_cap","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"_offer_hash","type":"bytes32"},{"indexed":false,"name":"_sealed_offer","type":"bytes"}],"name":"NewOffer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"_unsealer_key","type":"bytes"}],"name":"UnsealerKeyShared","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"selector_key","type":"bytes"},{"indexed":false,"name":"unseal_status","type":"uint8"}],"name":"OfferUnsealed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"selector_unlocker_key","type":"bytes"}],"name":"OfferSelected","type":"event"}]
// }

const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) { reject(err) }
      resolve(res);
    })
  );

function getTransactionReceiptMined(txHash, interval) {
  const transactionReceiptAsync = function(resolve, reject) {
      web3.eth.getTransactionReceipt(txHash, (error, receipt) => {
          if (error) {
              reject(error);
          } else if (receipt == null) {
              setTimeout(
                  () => transactionReceiptAsync(resolve, reject),
                  interval ? interval : 500);
          } else {
              resolve(receipt);
          }
      });
  };

  if (Array.isArray(txHash)) {
      return Promise.all(txHash.map(
          oneTxHash => web3.eth.getTransactionReceiptMined(oneTxHash, interval)));
  } else if (typeof txHash === "string") {
      return new Promise(transactionReceiptAsync);
  } else {
      throw new Error("Invalid Type: " + txHash);
  }
};

async function getTenderInfo(address, temp) {
    var tenderContract = web3.eth.contract(tenderAbi);
    var instance = tenderContract.at(address);
    temp['tender_desc']     = (await promisify(cb => instance.tender_desc.call(cb)))
    temp['submissions_due'] = (await promisify(cb => instance.submissions_due.call(cb))).toNumber()
    temp['sealing_due']     = (await promisify(cb => instance.sealing_due.call(cb))).toNumber()
    temp['unsealer']        = (await promisify(cb => instance.unsealer.call(cb)))
    temp['selector']        = (await promisify(cb => instance.selector.call(cb)))
    temp['tender_type']     = (await promisify(cb => instance.tender_type.call(cb))).toNumber()
    temp['tender_scope']    = (await promisify(cb => instance.tender_scope.call(cb))).toNumber()
    temp['fund_cap']        = (await promisify(cb => instance.fund_cap.call(cb))).toNumber()
    temp['offers_count']    = (await promisify(cb => instance.offers_count.call(cb))).toNumber()
    temp['sealed_count']    = (await promisify(cb => instance.sealed_count.call(cb))).toNumber()
    temp['unsealed_count']  = (await promisify(cb => instance.unsealed_count.call(cb))).toNumber()
    temp['isSelected']      = (await promisify(cb => instance.isSelected.call(cb)))
    temp['owner']           = (await promisify(cb => instance.owner.call(cb)))
    return temp;
}

async function loadTenders() {
  var factoryContract = web3.eth.contract(factoryAbi);
  // instantiate by address
  var factory = factoryContract.at(factoryAddress);
  log = await promisify(cb => factory.ContractInstantiation({}, {fromBlock: 0, toBlock: 'latest'}).get(cb));
  var result = []
  for (var i in log) {
    temp = log[i].args
    temp = await getTenderInfo(log[i].args.instantiation, temp)
    result.push(temp)
  }
  // console.log(result)
  return result
}

// loadTenders()

async function loadTenderOfferDetails(owner, tenderAddress, ownerAddress) {
  var tenderContract = web3.eth.contract(tenderAbi);
  var instance = tenderContract.at(tenderAddress);
  var temp = {}
  temp['offers'] = (await promisify(cb => instance.offers.call(ownerAddress, {from: owner}, cb)))
  console.log(temp)
  return temp
}

// loadTenderOfferDetails(web3.eth.accounts[0], '0xf240086fe5183f74f5e702a27494b83f71c41f3e', '0x000ffcfb081f4397836a6026566988d467fcffe4')

async function loadTenderDetails(tenderAddress) {
  var tenderContract = web3.eth.contract(tenderAbi);
  // instantiate by address
  var instance = tenderContract.at(tenderAddress);
  log2 = await promisify(cb => instance.NewOffer({}, {fromBlock: 0, toBlock: 'latest'}).get(cb));
  // console.log(log2[0].args.owner)
  var result = []
  for (var i in log2) {
    temp = log2[i].args
    // console.log('y' + log2[i]);
    temp = await loadTenderOfferDetails(web3.eth.accounts[0], tenderAddress, log2[i].args.owner)
    result.push(temp)
  }
  // console.log(result)
  return result
}

// loadTenderDetails('0x31Ac0EA17cdF24Ea32fd2597e85a808F980caAdB')


async function createTender(owner, tender_desc, submissions_due, sealing_due, unsealer, selector, tender_type, tender_scope, fund_cap) {
  var factoryContract = web3.eth.contract(factoryAbi);
  // instantiate by address
  var factory = factoryContract.at(factoryAddress);
  console.log(owner);
  console.log(tender_desc);
  console.log(submissions_due);
  console.log(sealing_due);
  console.log(unsealer);
  console.log(selector);
  console.log(tender_type);
  console.log(tender_scope);
  console.log(fund_cap);
  promisify(cb => {
    return factory.createTender.call(
      tender_desc,
      submissions_due,
      sealing_due,
      unsealer,
      selector,
      tender_type,
      tender_scope,
      fund_cap,
      {
        from: owner,
        // value: 1,
        gasPrice: 22000000000
      }, cb
    )
  })
  .then(function (address) {
    promisify(cb => {return factory.createTender(
        tender_desc,
        submissions_due,
        sealing_due,
        unsealer,
        selector,
        tender_type,
        tender_scope,
        fund_cap,
        {
          from: owner,
          // value: 1,
          gasPrice: 22000000000
        }, cb
      )}
    ).then(txHash => {
      return getTransactionReceiptMined(txHash)
    }).
    then(recepient => {
      alert("Tx mined!")
      // window.location = "/insurance.html/?hash=" + address
    })
  })
}

now = Math.round(Date.now()/1000);
var unsealer = web3.eth.accounts[0]
var selector = web3.eth.accounts[0]
// createTender("desc", now+30, now+300, unsealer, selector, 0, 0, 10000000)

async function submit_sealed_offer(owner, tenderAddress, offer_hash, sealed_offer) {
  var tenderContract = web3.eth.contract(tenderAbi);
  var instance = tenderContract.at(tenderAddress);
  console.log(owner);
  console.log(tenderAddress);
  console.log(offer_hash);
  console.log(sealed_offer);
  txHash = await promisify(cb => (instance.submit_sealed_offer(offer_hash, sealed_offer,
      {
        from: owner,
        // value: payout,
        gasPrice: 22000000000,
        gas: 1000000
      }, cb
    ))
  ).then(txHash => {
    return getTransactionReceiptMined(txHash)
  }).
  then(recepient => {
    alert("Tx mined!")
    // window.location = "/insurance.html/?hash=" + address
  })
  console.log(txHash);
}

// submit_sealed_offer(web3.eth.accounts[0], '0xf240086fe5183f74f5e702a27494b83f71c41f3e', '0xabcdabcd', '0xabcdeabcde')

async function shareKeyWithUnsealer(owner, tenderAddress, unsealer_key) {
  var tenderContract = web3.eth.contract(tenderAbi);
  var instance = tenderContract.at(tenderAddress);
  console.log(owner);
  console.log(tenderAddress);
  console.log(unsealer_key);
  txHash = await promisify(cb => (instance.share_key_with_unsealer(unsealer_key,
      {
        from: owner,
        // value: payout,
        gasPrice: 22000000000,
        gas: 1000000
      }, cb
    ))
  ).then(txHash => {
    return getTransactionReceiptMined(txHash)
  }).
  then(recepient => {
    alert("Tx mined!")
    // window.location = "/insurance.html/?hash=" + address
  })
  console.log(txHash);
}

async function unsealOffer(owner, tenderAddress, offer_owner, selector_key, unseal_status) {
  var tenderContract = web3.eth.contract(tenderAbi);
  var instance = tenderContract.at(tenderAddress);
  console.log(owner);
  console.log(tenderAddress);
  console.log(offer_owner);
  console.log(selector_key);
  console.log(unseal_status);
  txHash = await promisify(cb => (instance.unseal_offer(offer_owner, selector_key, unseal_status,
      {
        from: owner,
        // value: payout,
        gasPrice: 22000000000,
        gas: 1000000
      }, cb
    ))
  ).then(txHash => {
    return getTransactionReceiptMined(txHash)
  }).
  then(recepient => {
    alert("Tx mined!")
    // window.location = "/insurance.html/?hash=" + address
  })
  console.log(txHash);
}

async function selectOffer(owner, tenderAddress, offer_owner, selector_unlocker_key) {
  var tenderContract = web3.eth.contract(tenderAbi);
  var instance = tenderContract.at(tenderAddress);
  console.log(owner);
  console.log(tenderAddress);
  console.log(offer_owner);
  console.log(selector_unlocker_key);
  txHash = await promisify(cb => (instance.select_offer(offer_owner, selector_unlocker_key,
      {
        from: owner,
        // value: payout,
        gasPrice: 22000000000,
        gas: 1000000
      }, cb
    ))
  ).then(txHash => {
    return getTransactionReceiptMined(txHash)
  }).
  then(recepient => {
    alert("Tx mined!")
    // window.location = "/insurance.html/?hash=" + address
  })
  console.log(txHash);
}
