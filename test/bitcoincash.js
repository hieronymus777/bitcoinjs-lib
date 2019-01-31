/* global describe, it */

const assert = require('assert')
const ECPair = require('../src/ecpair')
const NETWORKS = require('../src/networks')
const pubKey = require('../src/templates/pubkey')
const TransactionBuilder = require('../src/transaction_builder')
const Transaction = require('../src/transaction')

describe('TransactionBuilder', function () {
  const network = NETWORKS['testnet']

  it('cashtestcase3', function () {
    const value = 50 * 1e8
    const txid = '40c8a218923f23df3692530fa8e475251c50c7d630dccbdfbd92ba8092f4aa13'
    const vout = 0

    const wif = 'cTNwkxh7nVByhc3i7BH6eaBFQ4yVs6WvXBGBoA9xdKiorwcYVACc'
    const keyPair = ECPair.fromWIF(wif, network)

    const pk = keyPair.publicKey
    const spk = pubKey.output.encode(pk)

    const txb = new TransactionBuilder(network)
    txb.addInput(txid, vout, Transaction.DEFAULT_SEQUENCE, spk)
    txb.addOutput('mzDktdwPcWwqg8aZkPotx6aYi4mKvDD7ay', value)
    txb.enableBitcoinCash(true)
    txb.setVersion(2)

    const hashType = Transaction.SIGHASH_ALL | Transaction.SIGHASH_BITCOINCASHBIP143

    txb.sign(0, keyPair, null, hashType, value)

    const tx = txb.build()
    const hex = tx.toHex()
    assert.equal('020000000113aaf49280ba92bddfcbdc30d6c7501c2575e4a80f539236df233f9218a2c8400000000049483045022100c5874e39da4dd427d35e24792bf31dcd63c25684deec66b426271b4043e21c3002201bfdc0621ad4237e8db05aa6cad69f3d5ab4ae32ebb2048f65b12165da6cc69341ffffffff0100f2052a010000001976a914cd29cc97826c37281ac61301e4d5ed374770585688ac00000000', hex)
  })
})
