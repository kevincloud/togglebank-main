const express = require('express');
const cors = require("cors");
require('dotenv').config();
const logger = require('./Utils/logger');
const ldHelper = require('./Utils/ld.helper.js');
const e = require('express');

const PORT = process.env.MAIN_SERVER_PORT;
global.app = express();

 //Initialize LD Client
if(process.env.NODE_ENV != 'test'){
    ldHelper.initializeLDClient();
}

var corsOptions = {
    "origin": ["https://togglebank.pse.launchdarklydemos.com", "http://togglebank-monolith.pse.launchdarklydemos.com"]
  };

// Logs every incoming HTTP requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} over ${req.protocol}`);
    logger.debug(`HTTP REQUEST: ${req.method} ${req.originalUrl} over ${req.protocol}`);
    next();
});

app.use(cors(corsOptions));
app.use(express.json({ type: 'application/json' }))
app.use(express.urlencoded({extended: true})); 

// Routes assignment
app.use(require('./routes'));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Demo-Site 2.0 Backend API" });
});

// Any route that isn't defined will be caught in the route
app.all('*', function(req, res, next){
  res.status(404).send({ message: "This route does not exist." });
  next();
});

const server = app.listen(PORT, () => {

    console.log('Backend Server running at port:' + PORT);
    logger.info('Backend Server running at port:' + PORT);
});

module.exports = server
