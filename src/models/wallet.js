const mongoose = require('mongoose')
const Transactions = require('./transactions');

const walletSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

walletSchema.virtual('transactions', {
    ref: 'Transactions',
    localField: '_id',
    foreignField: 'owner'
})

walletSchema.methods.toJSON = function() {
    const wallet = this
    const walletObject = wallet.toObject()

    return walletObject
}

const Wallet = mongoose.model('Wallet', walletSchema)


module.exports = Wallet