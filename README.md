# 0xGG

## Description

A transparent governance platform for corruption mitigation. A procurement app that operates entirely on the blockchain and ensures that the offers will stay hidden until the selection. The procedure is compliant with the Cypriot procurement laws. A tender can be created from a tender factory smart contract, then anyone can place an offer for it until a predefined date. Then only the unsealers can validate the offers. Once all offers are unsealed the selection can be made by the selectors. When the selection is made everyone can see and validate the offers. The entire process is build on top of secure cryptographic primitives.

## Smart Contract Deployment

First you will need to deploy the tender factory smart contract.
If you don't know how, here is a guide: https://medium.com/mercuryprotocol/dev-highlights-of-this-week-cb33e58c745f

## Update Factory Address

Update the factoryAddress variable in `js/src.js` to the address of the deployed tender factory smart contract.

## Metamask

Install and connect metamask to the network.

## Serve Website

Start a webserver and serve website from `frontend-lite/`

```bash
$ cd frontend-lite/
$ caddy
```
## Visit Website
Go to http://127.0.0.1:2015/
