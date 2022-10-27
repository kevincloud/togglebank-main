const userMemorydatabaseserver = require("./Database/user.memorydatabaseserver");

module.exports = async () => {
    await userMemorydatabaseserver.close();
  };