const CoinGecko = require('coingecko-api');
const logger = require('../../../Utils/logger');


exports.get = async (req, res) => {

    if(req.params.id == 'all'){
        coins = ['BTC','ETH','LTC'];
    }
    else{
        coins = [req.params.id];
    }
    try
    {
        const CoinGeckoClient = new CoinGecko();
            let data = await CoinGeckoClient.exchanges.fetchTickers('bitfinex', {
                coin_ids: ['bitcoin', 'ethereum', 'litecoin']
            });
            var _coinList = [];
            var _datacc = data.data.tickers.filter(t => t.target == 'USD');
            coins
            .forEach((i) => {
                var _temp = _datacc.filter(t => t.base == i);
                var _res = _temp.length == 0 ? [] : _temp[0];
                _coinList.push({name: i, price: Math.round(_res.last * 100) / 100});
            })
            if(_coinList){
                logger.info(`Status: 201 - Crypto feed successfully retrieved`);
                res.status(201).send(_coinList);
            }
            else{
                res.status(400).send({ message: "No live crypto feed received" });
            }
    }
    catch(err){
        res.status(500).send({message: `Error receiving crypto feed. Error from sever -> ${err}`});
        logger.error(`Status: 500 - Error receiving crypto feed. Error from server -> ${err}`)
        throw(err);
    }
};