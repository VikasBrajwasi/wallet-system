const express = require('express')
require('./db/mongoose')
const walletRouter = require('./routers/wallet')
const transactionsRouter = require('./routers/transactions')

const app = express()

app.use(express.json())
app.use(walletRouter)
app.use(transactionsRouter)

module.exports = app