
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
var CronJob = require('cron').CronJob;
const coinList = require("../Data/coindata.json");

const indexMax = coinList.length;
let i = 0;
let stonks = '+';
let notstonks = '';
let subiu;
let stonkstext='';
const getData = async (coin) => {
    let valor;

    await CoinGeckoClient.coins.fetch(coin, {})
        .then((response) => {
            data = response.data;
            valor =data.market_data.current_price['usd'];
            subiu = data.market_data.price_change_percentage_24h;
            
        }).catch((error) => {
            console.log(error);
        });

    return valor;
};

const setBotStatus = (client) => {
    const serverCronJob = new CronJob('*/5 * * * * *', async () => {
        if(i>=indexMax){
            i=0;
        }
        const valor = await getData(coinList[i].moeda);
        let text = coinList[i].abreviacao.toUpperCase();
        if(subiu>0){
            stonkstext = stonks;
        }else{
            stonkstext = notstonks;
        }
        //AQUI VAI A FUNÇÃO DO BOT PRA POR NO STATUS
        
        client.user.setActivity(`${text}$ ${valor} ${stonkstext} ${subiu}`,  { type: 'PLAYING' });
        i++;
    }, null, true, 'America/Sao_Paulo');
    
    serverCronJob.start();
}

//Se quiser exportar outras funçoes dai é so mandar por aqui
//Tipo da pra exportar o getData e usar la no index pra outra coisa;
module.exports = {
    setBotStatus,
    getData
};
