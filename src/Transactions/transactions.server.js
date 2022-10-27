const express = require('express');
const router = express.Router();
const cors = require("cors");
const logger = require('../../Utils/logger');
require('dotenv').config();

const transactionApp = express();

var corsOptions = {
  "origin": ["http://localhost:3000", "http://localhost:4000", "http://localhost:5000", "http://localhost:6000", "https://zapfmikpgp.us-east-2.awsapprunner.com", "https://rupvpath4c.us-east-2.awsapprunner.com", "https://togglebank-monolith.pse.launchdarklydemos.com"]
};

// Logs every incoming HTTP requests
transactionApp.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} over ${req.protocol}`);
  logger.debug(`HTTP REQUEST: ${req.method} ${req.originalUrl} over ${req.protocol}`);
  next();
});

transactionApp.use(cors(corsOptions));
transactionApp.use(express.json({ type: 'application/json' }))
transactionApp.use(express.urlencoded({extended: true}));

// Routes assignment
require('./routes/transactions.routes')(transactionApp);

// Any route that isn't defined will be caught in the route
transactionApp.all('*', function(req, res){
  res.status(404).send({ message: "This route does not exist." });
});

transactionApp.get("/", (req, res) => {
  res.json({ message: "Welcome to Transaction API" });
});

// Any route that isn't defined will be caught in the route
transactionApp.all('*', function(req, res, next){
  res.status(404).send({ message: "This route does not exist." });
  next();
});


module.exports = transactionApp
