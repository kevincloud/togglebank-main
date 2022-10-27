module.exports = {
  HOST: 'togglebank-transactionsdb.cja9bekbxy1s.us-east-2.rds.amazonaws.com',
  USER: 'postgres',
  PASSWORD: '',
  DB: "transactionsdb",
  dialect: "postgres",
  port: '5432',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};