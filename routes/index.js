const path = require('path');
const express = require('express');
const router = express.Router();


// Serve apps related static files
router.use(express.static(path.join(__dirname, '..', 'public')));

//route to different microservices
require("../src/Users/routes/users.routes")(router);
require("../src/Transactions/routes/transactions.middleware")(router);
require("../src/Accounts/routes/accounts.routes")(router);
require("../src/Crypto/routes/crytpo.routes")(router);

//removed dev microservice
//require("../src/Dev/routes/dev.routes")(router);

module.exports = router;
