## E-Wallet System Web API

## This API has been created for handling e-wallets and its transaction and store data of wallets and transaction in MongoDB.


API Info:

Created below mentione 4 Endpoints for performing different actions for e-wallet.

1. Setup Wallet:
URL:- http://localhost:3000/setup

Method: POST

Headers:-
Content-Type: application/json

Request Body:-
{
    "balance": 100,
    "name": "Wallet A"
}

Expected Response:- (Status 200)
{
    "id": "{Created_ID}",
    "balance": 100,
    "name": "Wallet A",
    "date": "2021-08-10T06:39:30.943Z"
}



2. Get Wallet Details:
URL:- http://localhost:3000/wallet/{id_of_wallet}

Method: GET

Expected Response:- (Status 200)
{
    "id": "{id_of_wallet}",
    "balance": 100,
    "name": "Wallet A",
    "date": "2021-08-10T07:00:25.077Z"
}



3. Make Transactions:
URL:- http://localhost:3000/transact/{id_of_wallet}

Method: POST

Headers:-
Content-Type: application/json

Request Body:-
{
    "description": "Recharge",
    "amount": 10
}

Expected Response:- (Status 200)
{
    "balance": 110,
    "transactionId": "{trasaction_ID}"
}



4. Get transaction details of perticular wallet:
URL:- http://localhost:3000/transactions?walletId={wallet_id}&skip=2&limit=1

Method: GET

Expected Response:- (Status 200)
[
    {
        "id": "{transaction_id}",
        "walletId": "{wallet_id}",
        "amount": 10,
        "balance": 130,
        "description": "Recharge",
        "date": "2021-08-10T06:40:14.829Z",
        "type": "CREDIT"
    }
]