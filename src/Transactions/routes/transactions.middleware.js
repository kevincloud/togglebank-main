module.exports = transaction => {

    const express = require("express");
    const router = express.Router(); 
    var request = require('request');
    const transactions = require ('../controllers/transactions.controller'); 
    
    //create an transaction
    router.post("/", function(req, res) {  
        if(typeof app.get('transactionServer') !== 'undefined'){
            makeTransactionRequest('POST', req, res, '');
        }
        else{
            transactions.create(req, res);
        }
    });
      
    //get transactions
    router.get("/", function(req, res) {
        if(typeof app.get('transactionServer') !== 'undefined'){
            makeTransactionRequest('GET', req, res, '');
        }
        else{
            transactions.findAll(req, res);
        }
    });

    //get transaction
    router.get("/id/:id", function(req, res) {
        if(typeof app.get('transactionServer') !== 'undefined'){
            makeTransactionRequest('GET', req, res, '');
        }
        else{
            transactions.findOne(req, res);
        }
    });
    
    //Update a transaction
    router.put("/", function(req, res) {
        if(typeof app.get('transactionServer') !== 'undefined'){
            makeTransactionRequest('PUT', req, res, '');
        }
        else{
            transactions.update(req, res);
        }
    });
    
    //Delete transaction/s
    router.delete("/", function(req, res) {
        if(typeof app.get('transactionServer') !== 'undefined'){
            makeTransactionRequest('DELETE', req, res, '');
        }
        else{
            transactions.delete(req, res);
        }
    });
    
    //Get transactions by account number
    router.get("/account/:accountNumber", function(req, res){
        if(typeof app.get('transactionServer') !== 'undefined'){
            subPath = '/account/' + req.params.accountNumber
            makeTransactionRequest('GET', req, res, subPath);
        }
        else{
            transactions.getTransactionsByAccount(req, res);
        }
    });
    
    //get account balance by account number
    router.get("/getaccountbalance/:accountNumber", function(req, res){
        if(typeof app.get('transactionServer') !== 'undefined'){
            subPath = '/getaccountbalance/' + req.params.accountNumber
            makeTransactionRequest('GET', req, res, subPath);
        }
        else{
            transactions.getAccountBalance(req, res);
        }
        
    });

    router.post("/demo/addtransactions", function(req, res){
        if(typeof app.get('transactionServer') !== 'undefined'){
            makeTransactionRequest('POST', req, res, '/demo/addtransactions');
        }
        else{
            transactions.addDemoTransactions(req, res);
        }
    })

    //Helper method to make request
    makeTransactionRequest = (httpMethod, req, res, subPath) => {

        var body;
        if(subPath == '/account' || subPath == '/getaccountbalance'){
            body = req.params;
        }
        else{
            body = req.body;
        }
        host = process.env.MAIN_SERVER || 'localhost'
                
        request({
            method: httpMethod,
            url: 'http://' + host + ':' + process.env.TRANSACTION_PORT + '/transaction' + subPath,
            json: body
        }, (error, response, body) => {
            if(error){
                console.log(error);
                res.status(response.statusCode).send(error);
            }
            else{
                res.status(response.statusCode).send(body);
            }
        });
    };
    
    transaction.use("/transactions", router);

    };
