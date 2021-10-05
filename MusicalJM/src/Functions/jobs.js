const joblist = require("../Data/profissoes.json");
const {getRandomIntInclusive} = require("./pokemon.js");
function getJob(){
    let index = getRandomIntInclusive(0, joblist.length-1);
    console.log(joblist[index]);
    return joblist[index];
};
//Se quiser exportar outras funçoes dai é so mandar por aqui
//Tipo da pra exportar o getData e usar la no index pra outra coisa;
module.exports = {
    
    getJob
};