module.exports = crypto => {

    const express = require("express");
    const router = express.Router();
    const cryptos = require ('../controllers/crypto.controller');
    
      //get all transaction/s
      router.get("/id/:id", cryptos.get);

      crypto.use("/crypto", router);
  
};