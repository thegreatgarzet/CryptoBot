const Command = require("../Structures/Command.js");
const playerBase = require("../Data/player_base.json");
const fs = require("fs");
const rpg = require("../Data/rpg_data.json");
const { newPkmn } = require("../Functions/pokemon.js");
const {getJob} = require("../Functions/jobs.js");
module.exports = new Command({
    name: "createchar",
    description: "Cria personagem para usuario",
    args: "",
    permission: "SEND_MESSAGES",
    async run(message, args, client){
        let p = playerBase;
        let oldSave = rpg;
        let checkdb = oldSave.filter(index => index.id === message.member.id)
        if(checkdb.length){
            return message.reply("Você já possui um personagem!");
        }
        p.id = message.member.id;
        p.nome = message.member.nickname;
        p.profissao.push(getJob());
        p.pokemon.push(newPkmn());
        let newsave = oldSave;
        newsave.push(p);
        let data = JSON.stringify(newsave);
        fs.writeFile('/Users/joaov/Desktop/MusicalJM/src/Data/rpg_data.json', data, err=>{
            if(err){
                console.log(err);
            }else{
                let text = `Seu personagem se chama ${p.nome}!\n\nSua profissão é ${p.profissao[0].nome}!\n\nSeu pokemon inicial é ${p.pokemon[0].name.english}!`;
                message.author.send(text);
            }
        });
    }
});

