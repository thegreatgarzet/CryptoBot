const Command = require("../Structures/Command.js");
const ytb = require("../Functions/ytb");
const play = require('play-dl');const { createAudioPlayer, createAudioResource , StreamType, demuxProbe, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice');
/*const { joinVoiceChannel,
    createAudioPlayer,
    createAudioResource } = require('@discordjs/voice');*/
module.exports = new Command({
    name: "play",
    description: "play song",
    args: "URL or text to search on youtube",
    permission: "SEND_MESSAGES",
    async run(message, args, client){
        const vc = message.member.voice.channel;
        if(!vc) return message.reply("Você precisa estar conectado a um canal de voz!");
        const permissions = vc.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT')) return message.reply("Você não tem permissão para isto");
        if(!permissions.has('SPEAK')) return message.reply("Você não tem permissão para isto");
        //if(args.lengtj <=1) return message.reply("Você precisa me dizer o que procurar");
        
        const session = await client.musichandler.getConection(message, args, client);

	}
    
});