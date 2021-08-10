const request = require('supertest')
const app = require('../src/app')
const Transactions = require('../src/models/transactions')
const {walletOne, walletOneId, setupDatabase, walletTwo, walletTwoId, transactionOne, transactionTwo, transactionThree} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create transaction', async () => {
    const response = await request(app)
    .post(`/transact/${walletOneId}`)
    .send({
        description: 'Recharge',
        amount: 2.4
    })
    .expect(200)

    const transaction = await Transactions.findById(response.body.transactionId)
    expect(transaction).not.toBeNull()
})