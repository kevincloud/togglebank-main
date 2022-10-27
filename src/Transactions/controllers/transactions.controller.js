const logger = require("../../../Utils/logger");
const db = require("../models");
db.sequelize.sync();
const Transaction = db.transactions;
const fs = require('fs');

exports.create = (req, res) => {

    if(!req.body.name && !req.body.transactionAmount){
        res.status(400).send({ message: "Content can not be empty!" });
        logger.warn(`Status:400 - Transaction required details can not be empty!`);
        return;
    }

    tempTransactionNumber = Date.now() + Math.floor( + Math.random());

    const transaction = {
        name: req.body.name,
        transactionNumber: tempTransactionNumber,
        transactionAmount: req.body.transactionAmount,
        accountNumber: req.body.accountNumber
    };
    
    Transaction.create(transaction)
      .then(data => {
      res.status(201).send(data);
      logger.info(`Status: 201 - Transaction successfully created`);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Transaction."
        });
        logger.error(`Status: 500 - Some error occurred while creating the Transaction. Error from server -> ${err}`);
      });
};

exports.findAll = (req, res) => {

  if(!req.params.id){
    Transaction.findAll()
      .then(data => {
        logger.info(`Status: 201 - Transactions successfully retrieved`);
        res.status(201).send(data);
      })
      .catch(err => {
        logger.error(`Status: 500 - Error occurred while retrieving transactions. Error from server -> ${err}`);
        res.status(500).send({
          message: `Some error occurred while retrieving transactions. Error from server -> ${err}`
        });
      });
  }
};

exports.findOne = (req, res) => {

    const id = req.params.id;
    Transaction.findByPk(id)
    .then(data => {
        if(data){
          res.status(201).send(data);
          logger.info(`Status: 201 - Transaction successfully retrieved`);
        }
        else{
          res.status(400).send({ message: "No Transaction found " });
        }
    })
    .catch(err => {
        res.status(500).send({
        message: "Error retrieving Transaction with id=" + id
        });
        logger.error(`Status: 500 - Error occurred while retrieving transaction ID: ${id}. Error from server -> ${err}`)
    });

}

exports.update = (req, res) => {
  const id = req.body.id;
  Transaction.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(201).send({
            message: "Transaction was updated successfully in the database."
          });
        } else {
          res.status(400).send({
            message: `Cannot update Transaction with id=${id}. Maybe Transaction was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error occured while updating Transaction with id=" + id + ` Error from server -> ${err}`
        });
      });
};

exports.delete = (req, res) => {

  if(!req.body.id){
    Transaction.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.status(201).send({ message: `${nums} Transactions were deleted successfully!` });
        logger.info(`Status 201: Transactions were successfully deleted`);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error occurred while processing this request"
        });
        logger.error(`Status: 500 - Error while deleting transactions. Error from server -> ${err}`);
      });
  }

  else{
    const id = req.body.id;

    Transaction.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(201).send({
            message: "Transaction was deleted successfully!"
          });
          logger.info(`Status: 201 - Transaction was successfully deleted with id : ${id}`);
        } else {
          res.status(400).send({
            message: `Cannot delete Transaction with id=${id}. Try Again or Transaction do not exists`
          });
          logger.warn(`Status: 400 - Transaction not found wtih id ${id}`);
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Transaction with id=" + id
        });
        logger.error(`Status 500 - Error while deleting transaction. Error from server -> ${err}`);
      });
  }
};

exports.getTransactionsByAccount = (req, res) => {
  const accountNumber = req.params.accountNumber;

  Transaction.findAll({where: {accountNumber: accountNumber}})
  .then(data => {
    logger.info(`Status: 201 - Transactions successfully retrieved from Account Number: ${accountNumber}`);
    res.status(201).send(data);
  })
  .catch(err => {
    logger.error(`Status: 500 - Error occurred while retrieving transactions from Account Number ${accountNumber}. Error from server -> ${err}`);
    res.status(500).send({
      message:
        err.message || `Some error occurred while retrieving transactions from Account Number ${accountNumber}. Error from server -> ${err}`
    });
  });
}

exports.getAccountBalance = (req, res) => {
  const accountNumber = req.params.accountNumber;

  Transaction.findAll({
    where: {accountNumber: accountNumber}, 
    attributes: [
      [db.sequelize.fn('SUM', db.sequelize.col('transactionAmount')), 'accountBalance']
    ]
  })
  .then(data => {
      res.status(201).send(data);
      logger.info(`Status: 201 - Account balace successfully retrieved`);
  })
  .catch(err => {
    logger.error(`Status: 500 - Error occurred while retrieving account balance from Account Number ${accountNumber}. Error from server -> ${err}`);
    res.status(500).send({
      message:
        err.message || `Some error occurred while retrieving account balance from Account Number ${accountNumber}. Error from server -> ${err}`
    });
  });


}

exports.addDemoTransactions = (req, res) => {
  
  fs.readFile('./src/Transactions/transactions.json', function(error, content){
    var data = JSON.parse(content);

    for(i = 0; i < data.length; ++i){
      if(req.body.type == data[i].type)
      {
        tempTransactionNumber = Date.now() + Math.floor( + Math.random());
        const transaction = {
          name: data[i].name,
          transactionNumber: tempTransactionNumber,
          transactionAmount: data[i].transactionAmount,
          accountNumber: req.body.accountNumber
        };
    
        Transaction.create(transaction)
          .then(data => {
            logger.info(`Status: 201 - Demo Transaction successfully created`);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Transaction."
            });
            logger.error(`Status: 500 - Some error occurred while creating the Transaction. Error from server -> ${err}`);
          });
      }
    }
    res.status(201).send('Transactions successfully created for Demo Account');
  

  });
}