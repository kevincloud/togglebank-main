require('dotenv').config();


const server = require('../../server');
const databaseHelper = require('../__tests__/Database/user.memorydatabaseserver');

beforeAll(() => {
  return databaseHelper.connect();
});

beforeEach(() => {
  return databaseHelper.clear();
});

afterAll(() => {
  databaseHelper.close();
  return server.close();
});

