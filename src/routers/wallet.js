const express = require('express')
const Wallet = require('../models/wallet')
const router = new express.Router()


router.post('/setup', async (req, res) => {
    const wallet = new Wallet(req.body)
    try {
        wallet.balance = parseFloat(wallet.balance.toFixed(4))
        await wallet.save()
        res.send({
            "id": wallet._id,
            "balance": wallet.balance,
            "name": wallet.name,
            "date": wallet.createdAt
        })
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/wallet/:id', async (req, res) => { 
    try {
        const wallet = await Wallet.findById(req.params.id)

        if (!wallet) {
            res.status(404).send()
        }
        res.send({
            "id": wallet._id,
            "balance": wallet.balance,
            "name": wallet.name,
            "date": wallet.createdAt
        })
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router