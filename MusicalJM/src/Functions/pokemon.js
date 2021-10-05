const pokedex = require("../Data/pkmn.json");
function newPkmn(){
    let index = getRandomIntInclusive(0, pokedex.length-1);
    return pokedex[index];
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

//Se quiser exportar outras funçoes dai é so mandar por aqui
//Tipo da pra exportar o getData e usar la no index pra outra coisa;
module.exports = {
    
    newPkmn,getRandomIntInclusive
};