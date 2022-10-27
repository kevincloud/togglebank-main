module.exports = accounts => {

    const express = require("express");
    const router = express.Router();
    var request = require('request');

    //create an account
    router.post("/", function (req, res, next) {
        makeRequest('POST', req, res, '');
    });

    //get Accounts
    router.get("/", function (req, res, next) {
        makeRequest('GET', req, res, '');
    });

    //get Account
    router.get("/account-number/:accountNumber", function (req, res) {
        makeRequest('GET', req, res, '/account-number');
    });

    //Update an account
    router.put("/", function (req, res) {
        makeRequest('PUT', req, res, '');
    });

    //Delete Account/Accounts
    router.delete("/", function (req, res) {
        makeRequest('DELETE', req, res, '');
    });

    //Get Accounts by user Id
    router.get("/userId/:userId", function (req, res) {
        makeRequest('GET', req, res, '/userId')
    });


    //Helper method to make request
    makeRequest = (httpMethod, req, res, subPath) => {

        if (subPath == '/userId' || subPath == '/account-number') {
            body = req.params;
        }
        else {
            body = req.body;
        }

        host = "fmakapgkxz.us-east-2.awsapprunner.com"

        request({
            method: httpMethod,
            url: 'https://' + host + subPath,
            json: body
        }, (error, response, body) => {
            if (error) {
                console.log(error);
                res.status(response.statusCode).send(error);
            }
            else {
                res.status(response.statusCode).send(body);
            }
        });
    };

    accounts.use("/accounts", router);

};
