const request = require('supertest');
const app = require('../../../server');
const { users } = require('../../Users/models');
const { transactions } = require('../../Transactions/models');
const logger = require('../../../Utils/logger');
const agent = request.agent(app);


describe('Users HTTP Routes Test', () => {
    test('It should create a new USER',  async() => {
      try{
        const res = await agent
          .post('/users')
          .send({
              name: "TEST USER",
              phoneNumber: "123-456-7890",
              username: "username@test.com",
              password: "password1234",
              state: "CA",
              beta: true,
              active: true
          })
          expect(res.statusCode).toEqual(201);
          if(res.statusCode == '201'){
            logger.info('TEST: User successfully created');
          }
      }
      catch(err){
        throw err;
      }

    });

    test('It should retrieve the created user', async() => {
        
          const toadd = new users({
            name: "TEST USER",
            phonenumber: "123-456-7890",
            username: "username@test.com",
            password: "password1234",
            state: "CA",
            beta: true,
            active: true
          });
        
       
        const user = await toadd.save();
        expect(user).not.toBeNull();
        
        const res = await agent
          .get('/users')
          expect(res.statusCode).toEqual(201);
          if(res.statusCode == '201'){
            logger.info('TEST: User successfully retrieved');
          }
        });


    test('It should update a user successfully', async() => {
   
      const toadd = new users({
        name: "TEST USER 2",
        phonenumber: "123-456-7890",
        username: "username@test.com",
        password: "password1234",
        state: "CA",
        beta: true,
        active: true
      });
    
   
      const user = await toadd.save();
      expect(user).not.toBeNull();

      const res = await agent
        .put('/users/id/' + user._id)
        expect(res.statusCode).toEqual(201);
        
      if(res.statusCode == '201'){
        logger.info('TEST: User successfully created');
      }
    });

    test('it should login user successfully ', async() => {

      const toadd = new users({
        name: "TEST USER 2",
        phonenumber: "123-456-7890",
        username: "username@test.com",
        password: "password1234",
        state: "CA",
        beta: true,
        active: true
      });

      const user = await toadd.save();
      expect(user).not.toBeNull();
      const res = await agent
      .post('/users/login')
      .send(user._doc);
      expect(res.statusCode).toEqual(201);

    });

    test('It should delete all users successfully', async() => {
      const toadd = new users({
        name: "TEST USER 2",
        phonenumber: "123-456-7890",
        username: "username@test.com",
        password: "password1234",
        state: "CA",
        beta: true,
        active: true
      });
    
   
    const user = await toadd.save();
    expect(user).not.toBeNull();

      const res = await agent
        .delete('/users/id/' + user._id)
        expect(res.statusCode).toEqual(201);

  });
});

describe('Transactions HTTP Routes Test', () => {

  test('it should create a new transaction',  async() => {
    
    try{
      const res = await agent
      .post('/transactions')
      .send({
          name: "LaunchDarkly Pro",
          transactionAmount: "16.67",
          accountNumber: "09488538"
      })
      expect(res.statusCode).toEqual(201);
    }
    catch(err){
      throw err;
    }
  });


  test('it should retrieve the created transaction', async() => {

    try{
      const toadd = new transactions({
          name: "LaunchDarkly Pro",
          transactionAmount: "16.67",
          accountNumber: "09488538",
          transactionNumber: "1640031949039"
      });
      
      const transaction = await toadd.save();
      expect(transaction).not.toBeNull();
      
      const res = await agent
        .get('/transactions/id/' + transaction.id)
        expect(res.statusCode).toEqual(201);
    }
    catch(err){
      throw err;
    }
  
  });

  test('it should update the created transaction', async() => {

    try{
      const toadd = new transactions({
          name: "LaunchDarkly Pro",
          transactionAmount: "16.70",
          accountNumber: "09488539",
          transactionNumber: "1640031949040"
      });
      
      const transaction = await toadd.save();
      expect(transaction).not.toBeNull();
      transaction.transactionAmount = "17.00";
      const res = await agent
        .put('/transactions')
        .send({
          id: transaction.id,
          name: transaction.name,
          transactionAmount: transaction.transactionAmount,
          accountNumber: transaction.accountNumber
      });
        expect(res.statusCode).toEqual(201);
    }
    catch(err){
      throw err;
    }
  
  });

  test('it should delete a transaction', async() => {

    try{
      const toadd = new transactions({
        name: "LaunchDarkly Pro",
        transactionAmount: "16.70",
        accountNumber: "09488539",
        transactionNumber: "1640031949040"
      });
      
      const transaction = await toadd.save();
      expect(transaction).not.toBeNull();
      
      const res = await agent
        .delete('/transactions')
        .send({
          id: transaction.id
        });
        expect(res.statusCode).toEqual(201);
    }
    
    catch(err){
      throw err;
    }
  });

  test('it should delete all transactions', async() => {

    const res = await agent
      .delete('/transactions');
    expect(res.statusCode).toEqual(201);

  });

});

describe('Accounts HTTP Routes Test', () => {

  test('it should create a new account',  async() => {

    try{
      const res = await agent
      .post('/accounts')
      .send({
        name: "Test Account",
        type: "Test",
        userId : "61bb7c4f742c9679a971836e"
      })
      expect(res.statusCode).toEqual(201);
    }
    catch(err){
      throw err;
    }
  });

  test('it should retrieve the accounts', async() => {
    
    try{
      const res = await agent
        .get('/accounts')
        expect(res.statusCode).toEqual(201);
    }
    
    catch(err){
      throw err;
    }

  });

  test('it should update an account', async() => {

    try{

      const res1 = await agent
      .get('/accounts');
      expect(res1.statusCode).toEqual(201);

      if(res1.body[0].type == 'Test'){

        const res = await agent
        .put('/accounts')
        .send({
          name: "Test Account - 2",
          type: "Checking",
          userId : "61bb7c4f742c9679a971836e",
          accountNumber: res1.body[0].accountNumber
        });

        expect(res.statusCode).toEqual(201);
      }
    }
    
    catch(err){
      throw err;
    }

  });

  test('it should delete an account', async() => {

    try{
      const res1 = await agent
      .get('/accounts');
      expect(res1.statusCode).toEqual(201);

      if(res1.body[0].type == 'Test'){

        const res = await agent
        .delete('/accounts')
        .send({
          accountNumber: res1.body[0].accountNumber
        });
        expect(res.statusCode).toEqual(201);
      }
    }
    catch(err){
      throw err;
    }

  });

});