module.exports = transaction => {

    const express = require("express");
    const router = express.Router();
    const transactions = require ('../controllers/transactions.controller');
    
      //CRUD operations
      //Create a new transaction
      router.post("/", transactions.create);
    
      //get all transaction/s
      router.get("/", transactions.findAll);

      //get specific transaction/s
      router.get("/id/:id", transactions.findOne);
    
      //Update a single transaction
      router.put("/", transactions.update);
    
      //Delete all/specific transaction/s
      router.delete("/", transactions.delete);

      //get transactions by accounts
      router.get("/account/:accountNumber", transactions.getTransactionsByAccount);

      //get total balance for the account
      router.get("/getaccountbalance/:accountNumber", transactions.getAccountBalance);

      //create demo transactions 
      router.post("/demo/addtransactions", transactions.addDemoTransactions);

      transaction.use("/transaction", router);
  
    };