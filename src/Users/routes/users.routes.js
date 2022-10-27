module.exports = user => {
  const express = require("express");
  const router = express.Router();
  const users = require ('../controllers/users.controller');

  //CRUD operations
  //Create a new user
  router.post("/", users.create);

  //get all Users
  router.get("/", users.findAll);

  //get user by Id
  router.get("/id/:id", users.findOne);

  //Update a single user
  router.put("/id/:id", users.update);

  //Delete a single user
  router.delete("/id/:id", users.delete);

  //Delete all Users
  router.delete("/", users.deleteAll);
  
  //Login
  router.post("/login", users.loginUser);

  user.use("/users", router);
};
