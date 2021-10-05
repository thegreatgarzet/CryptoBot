const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "queue",
    description: "lista todas as musicas",
    args: "",
    permission: "SEND_MESSAGES",
    async run(message, args, client){
        const vc = message.member.voice.channel;
        if(!vc) return message.reply("Você precisa estar conectado a um canal de voz!");
        const permissions = vc.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT')) return message.reply("Você não tem permissão para isto");
        if(!permissions.has('SPEAK')) return message.reply("Você não tem permissão para isto");
        //if(args.lengtj <=1) return message.reply("Você precisa me dizer o que procurar");
        
        const session = await client.musichandler.queue(message, args, client);
    }
});