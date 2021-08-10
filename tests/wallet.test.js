const request = require('supertest')
const app = require('../src/app')
const Wallet = require('../src/models/wallet')
const {walletOne, walletOneId, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should setup new wallet', async () => {
    const response = await request(app).post('/setup').send({
        name: 'Wallet A',
        balance: 10
    }).expect(200)

    //Assert that the database was changed correctly
    const wallet = await Wallet.findById(response.body.id)
    expect(wallet).not.toBeNull()
})
