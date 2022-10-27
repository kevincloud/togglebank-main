const logger = require("../../../Utils/logger");
const db = require("../models");
const User = db.users;
var request = require('request'); 
require("../config/db.users.config")

    // Create and Save a new User
    exports.create = (req, res) => {

      // Validate request
      if (!req.body.name) {
        res.status(400).send({ message: "User required details can not be empty!" });
        logger.warn(`Status: 400 - User required details can not be empty!`);
        return;
      }

      // Create a User
      const user = new User({
        name: req.body.name,
        phonenumber: req.body.phoneNumber,
        username: req.body.username,
        password: req.body.password,
        state: req.body.state,
        beta: req.body.beta,
        usertype: req.body.usertype,
        acive: req.body.active
      });

      // Save User in the database
      user
        .save(user)
        .then(data => {
          if(process.env.NODE_ENV != 'test'){
            addAccountsData(data['id']);
          }
          res.status(201).send(data);
          logger.info(`Status: 201 - User successfully created`);
        })
        .catch(err => {
          logger.error(`Status: 500 - Error occured while creating the User. Error message from server -> ${err}`);
          res.status(500).send({
            message:
              err.message || `Some error occurred while creating the User. Error message from server -> ${err}`
          });
        });
    };

    // Retrieve all Users from the database.
    exports.findAll = (req, res) => {

      User.find()
        .then(data => {
          logger.info(`Status: 201 - User/s successfully retrieved`);
          res.status(201).send(data);
        })
        .catch(err => {
          logger.error(`Status: 500` + err.message || "Error occurred while retrieving user/s");
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving user/s."
          });
        });
    };

    // Find a single User with an id
    exports.findOne = async (req, res) => {
      const id = req.params.id;

      User.findById(id)
        .then(data => {
          if (!data){
            logger.warn(`Status: 400 - User not found with id ${id}`);
            res.status(400).send({ message: "User not found with id " + id });
          }
          else {
            logger.info(`Status: 201 - User found with id`);
            res.status(201).send(data);
          }
        })
        .catch(err => {
          logger.error(`Status: 500 - Error retrieving User with id= ${id}`);
          res.status(500).send({ message: "Error retrieving User with id=" + id });
        });
    };

    // Update a User by the id in the request
    exports.update = (req, res) => {

      if (!req.body) {
        logger.warn(`Status: 400 - Data to update can not be empty`);
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }

      const id = req.params.id;

      User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            logger.warn(`Status: 400 - Cannot update User with id=${id}. User not found`);
            res.status(400).send({
              message: `Cannot update User with id=${id}. Maybe User was not found!`
            });
          } else{
            logger.info(`Status: 201 - User was update successfully`);
            res.status(201).send({ message: "User was updated successfully." });
          }
        })
        .catch(err => {
          logger.error(`Status: 500 - Error updating user with id= ${id}`);
          res.status(500).send({
            message: "Error updating User with id=" + id
          });
        });
    };

    // Delete a User with the specified id in the request
    exports.delete = (req, res) => {
      const id = req.params.id;

      User.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            logger.warn(`Status: 400 - Cannot delete User with id=${id}. User not found`);
            res.status(400).send({
              message: `Cannot delete User with id=${id}. Maybe User was not found!`
            });
          } else {
            logger.info(`Status: 201 - User was deleted successfully`);
            res.status(201).send({
              message: "User was deleted successfully!"
            });
          }
        })
        .catch(err => {
          logger.error(`Status: 500 - Could not delete user with id= ${id}. User not found`);
          res.status(500).send({
            message: "Could not delete User with id=" + id
          });
        });
    };

    // Delete all Users from the database.
    exports.deleteAll = (req, res) => {
      User.deleteMany({})
      .then(data => {
        logger.info(`Status: 201 - All Users were deleted successfully`);
        res.status(201).send({
          message: `${data.deletedCount} Users were deleted successfully!`
        });
      })
      .catch(err => {
        logger.error(`Status: 500 - Could not delete all users`);
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      });
    };

    // find all active User
    exports.findAllActive = (req, res) => {
      User.find({ active: true })
      .then(data => {
        logger.info(`Status: 201 - All Users were retrieved successfully`);
        res.status(201).send(data);
      })
      .catch(err => {
        logger.error(`Status: 500 - Could not delete all users. Error message from server -> ${err}`);
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
    };

    //Verifies user details for login purposes
    exports.loginUser = (req, res) => {
      User.find({ username: req.body.username, password: req.body.password })
        .then(data => {
          if(data[0]){
            logger.info(`Status: 201 - User verified successfully`);
            res.status(201).send(data);
          }
          else{
            logger.warn(`Status: 400 - User not verified`);
            res.status(400).send({
              message: "User not found"
            });
          }
        })
        .catch(err => {
          console.log(err);
          logger.error(`Status: 500 - Error processing this request. Error message from server -> ${err}`);
          res.status(500).send({
            message:
              err.message || "Error processing this request"
          })
        });
    };

    //Creates mock accounts/transactions for user
    const addAccountsData = (id) => {
      console.log(id);
      host = process.env.ACCOUNTS_SERVER
      request({
          method: 'POST',
          url: 'http://'+ host + ':' + process.env.ACCOUNT_SERVER_PORT + '/demo/addaccounts',
          json: id
      }, (error, response, body) => {
          if(error){
              console.log(error);
              logger.error(`STATUS 500 - Demo Accounts failed to be created. Error -> ${err}`);
          }
          else{
              logger.info(`STATUS: 201 - Demo Accounts Added for the user id: ${id}`);
          }
      });
    };

    