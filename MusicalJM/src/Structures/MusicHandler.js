const ytb = require("../Functions/ytb");
const ytdl = require("ytdl-core");
const play = require('play-dl');
const { createAudioPlayer, createAudioResource , StreamType, demuxProbe, 
joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection }
 = require('@discordjs/voice');
const { getData } = require("../Functions/SetStatus");
const { args } = require("../Commands/play");
const { MessageActionRow } = require("discord.js");

module.exports = class MusicHandler {
    constructor(){
        let streamArray;
        let titlearray;
    }
    streamArray = [];
    titlearray = [];
    getConection = async (message,args,client, getCn = new Boolean(false)) => 
    {
        const cn = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });
        if(getCn == Boolean(true)) return cn;
        args.shift();
        let newArgs = args.join(' ');
        
        
            let yt_info = await play.search(newArgs, { limit : 1 });
            let stream = await play.stream(yt_info[0].url);
            if(stream){
                this.streamArray.push(stream);
                ytdl.getInfo(yt_info[0].url).then(info => {
                    message.reply(`** ${info.videoDetails.title} adicionado a fila!`);
                });
                if(this.streamArray.length==1){
                    this.playStream(cn);
                }
            }
    }
    playStream(cn){
        let resource = createAudioResource(this.streamArray[0].stream, {
            inputType : this.streamArray[0].stream.type
        })
        let player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        })
        player.play(resource)

        cn.subscribe(player)
        this.streamArray[0].stream.on('close', ()=>{
            this.streamArray.shift();
            if(this.streamArray.length>=1){
                this.playStream(cn);
            }
        });
        
    }
    stopStream = async(message, args, client)=>{
        this.streamArray.length = 0;
        let cnRef = await this.getConection(message, args, client, new Boolean(true));
        //cnRef.disconnect();
        cnRef.destroy();
        //cnRef.removeAllListeners();
    }
    skip = async(message, args, client)=>{
        this.streamArray.shift();
        if(this.streamArray.length==0){
            this.stopStream(message, args, client);
            return;
        }
        let cnRef = await this.getConection(message, args, client, new Boolean(true));
        this.playStream(cnRef);
    }
    queue = async(message, args, client)=>{
        //console.log(this.streamArray[0].video_url);
        
        this.titlearray = [];
        for (let index = 0; index < this.streamArray.length; index++) {
            ytdl.getInfo(this.streamArray[index].video_url).then(info => {
                this.titlearray.push(info.videoDetails.title);
                console.log(info.videoDetails.title);
                if(this.titlearray.length == this.streamArray.length){
                    let queuetext = '';
                    if(this.titlearray.length > 1){
                        this.titlearray.shift();
                        queuetext = this.titlearray.join(`\n\n**`);
                    }
                    message.reply(`\nNOW PLAYING - ${this.titlearray[0]}\n\n${queuetext}\n`);
                }
            });

        }
        
    }

}