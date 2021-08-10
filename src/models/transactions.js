const mongoose = require('mongoose')

const transactionsSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        default: 'DEBIT'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Wallet'
    }
}, {
    timestamps: true
})

const Transactions = mongoose.model('Transactions', transactionsSchema)

module.exports = Transactions