const logger = require("../../../Utils/logger");
const db = require("../models");

if(process.env.NODE_ENV != 'test'){

  mongodbURL = process.env.USERS_DB_URL

  db.mongoose
    .connect(mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      logger.info(`Connected to Users Database`);
      console.log("Connected to the User database!");
    })
    .catch(err => {
      logger.error(`Cannot connect to Users Database. Error from server ${err}`)
      console.log("Cannot connect to the database!", err);
      process.exit();
    });
}

module.exports = {
  db
};