const Command = require('./Command.js');
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const getData = async (coin) => {
    let valor;

    await CoinGeckoClient.coins.fetch('plant-vs-undead-token', {})
        .then((response) => {
            data = response.data;
        }).catch((error) => {
            console.log(error);
        });

    return data;
};



//Se quiser exportar outras funçoes dai é so mandar por aqui
//Tipo da pra exportar o getData e usar la no index pra outra coisa;
module.exports = {
    
    getData
};