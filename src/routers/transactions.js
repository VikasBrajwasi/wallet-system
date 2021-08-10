const express = require('express')
const Transactions = require('../models/transactions')
const Wallet = require('../models/wallet')
const router = new express.Router()


router.post('/transact/:walletId', async (req, res) => {
    try {
        const wallet = await Wallet.findById(req.params.walletId)

        if (!wallet) {
            res.status(404).send()
        }
        const transaction = new Transactions({ ...req.body, owner: req.params.walletId})
        
        req.body.amount = parseFloat(req.body.amount.toFixed(4))
        if (req.body.amount > 0) {
            transaction.type = 'CREDIT'
        } else {
            transaction.type = 'DEBIT'
        }
        wallet.balance = wallet.balance + req.body.amount;
        wallet.balance = parseFloat(wallet.balance.toFixed(4))
        await wallet.save()
        transaction.balance = wallet.balance
        await transaction.save()
        res.send({
            "balance": wallet.balance,
            "transactionId": transaction._id
        })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/transactions', async (req, res) => {

    try {
        const resposeTransactions = [];
        const wallet = await Wallet.findById(req.query.walletId)

        await wallet.populate({
            path: 'transactions',
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate()

        for (let i = 0; i < wallet.transactions.length; i++) {
            const obj = {}
            obj.id = wallet.transactions[i]._id;
            obj.walletId = wallet.transactions[i].owner;
            obj.amount = wallet.transactions[i].amount;
            obj.balance = wallet.transactions[i].balance;
            obj.description = wallet.transactions[i].description;
            obj.date = wallet.transactions[i].createdAt;
            obj.type = wallet.transactions[i].type;
            resposeTransactions.push(obj);
        }
        res.send(resposeTransactions)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router