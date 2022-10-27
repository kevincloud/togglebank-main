const NodeEnvironment = require('jest-environment-node');
const userMemorydatabaseserver = require('./Database/user.memorydatabaseserver');


class CustomEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();

    this.global.__DB_URL__ = await userMemorydatabaseserver.mongodbURI();
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = CustomEnvironment;