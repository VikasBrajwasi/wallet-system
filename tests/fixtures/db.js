const mongoose = require('mongoose')
const Wallet = require('../../src/models/wallet')
const Transactions = require('../../src/models/transactions')

const walletOneId = new mongoose.Types.ObjectId()
const walletOne = {
    _id: walletOneId,
    name: 'Wallet A',
    balance: 10
}

const walletTwoId = new mongoose.Types.ObjectId()
const walletTwo = {
    _id: walletTwoId,
    name: 'Wallet B',
    balance: 10
}

const transactionOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Recharge 1',
    amount: 1.5,
    owner: walletOne._id
}

const transactionTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Recharge 2',
    amount: 2.5,
    owner: walletOne._id
}

const transactionThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Recharge 3',
    amount: 3.5,
    owner: walletTwo._id
}

const setupDatabase = async () => {
    await Wallet.deleteMany()
    await Transactions.deleteMany()
    await new Wallet(walletOne).save()
    await new Wallet(walletTwo).save()
    await new Transactions(transactionOne).save()
    await new Transactions(transactionTwo).save()
    await new Transactions(transactionThree).save()
}

module.exports = {
    walletOne,
    walletOneId,
    setupDatabase,
    walletTwo,
    walletTwoId,
    transactionOne,
    transactionTwo,
    transactionThree
}