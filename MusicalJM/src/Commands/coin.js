const Command = require("../Structures/Command.js");
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const datac = require("../Data/coindata.json")
module.exports = new Command({
    name: "coin",
    description: "show coin value",
    args: "1º moeda a ser buscada | 2º moeda real para comparar preço (usd, brl...)",
    permission: "SEND_MESSAGES",
    async run(message, args, client){

        const getData = async (coin1, coin2) => {
            let valor;
            if(coin2 == null){
                coin2 = 'usd';
            }
            await CoinGeckoClient.coins.fetch(coin1, {})
                .then((response) => {
                    valor = response.data.market_data.current_price[coin2];
                    let token_name = args[1].toUpperCase();
                    let value_name = coin2.toUpperCase();
                    message.channel.send(`1 ${token_name} equivale a ${valor} ${value_name}`);
                }).catch((error) => {
                    console.log(error);
                });
        
            return valor;
        };
        let token = datac.filter(moeda => moeda.abreviacao === args[1]);
        if(token.length){
            const r = await getData(token[0].moeda, args[2]);
        }
        
    }
});
/*
*/