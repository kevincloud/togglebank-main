var crypto = require('crypto');
const logger = require('./logger');
const LaunchDarkly = require('launchdarkly-node-server-sdk');


const initializeLDClient = () => {

    client = LaunchDarkly.init(process.env.LD_SDK_KEY);
    client.once("ready", () => {
        setLoglevel();
        client.on(`update:${process.env.SERVER_LOGGING_LD_FLAG_KEY}`, () => {
            setLoglevel();
        });
    });
    app.set('ldclient', client);
};

const setLoglevel = () => {

    var User = getLDServerUser();
    client = app.get('ldclient');
    var loglevel = client.variation(process.env.SERVER_LOGGING_LD_FLAG_KEY, User, logger.info);
    loglevel.then(function(result){
       logger.level = result;
       logger.info('Log level set from LaunchDarkly is ' + result)
       console.log('Log level set from LaunchDarkly is ' + result);
    });

};

const getLDServerUser = () => {

    var key = crypto.createHash('md5').update(process.env.SERVER_USER).digest('hex');
    var User = {
        "key": key,
        "custom:": {
            "type": "machine"
        }
    }
    return User;
};

module.exports = {initializeLDClient, setLoglevel, getLDServerUser};