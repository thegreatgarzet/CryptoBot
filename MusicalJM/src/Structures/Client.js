const Discord = require("discord.js");

const Command = require("./Command.js");

const Event = require("./Event.js");

const config = require("../Data/Config.json");

const status =require("../Functions/SetStatus");

const fs = require("fs");
const MusicArray = require("./MusicHandler");


const intents = new Discord.Intents(32767);

class Client extends Discord.Client{
    constructor(){
        
        super({intents, allowedMentions: {repliedUser: false}});
        
        /**
         * @type {Discord.Collection<String, Command>}
         */
        this.musichandler = new MusicArray();
        this.commands = new Discord.Collection();
        this.prefix = config.prefix;

        
        
    }
    start(token){
        //LISTA TODOS OS COMANDOS
        
        fs.readdirSync("./src/Commands").filter(file => file.endsWith(".js")).forEach(file => {
            /** 
             * @type {Command}  
             */
            const command = require(`../Commands/${file}`);

            this.commands.set(command.name, command);

            console.log(`Command ${command.name} loaded`);
        });
        //LISTA TODOS OS EVENTOS
        fs.readdirSync("./src/Events").filter(file => file.endsWith(".js")).forEach(file=>{
            /**
             * @type {Event}
             */
             const event = require(`../Events/${file}`);
             console.log(`Event ${event.event} loaded`);
             this.on(event.event, event.run.bind(null, this));
        });
        
        this.login(token);
        status.setBotStatus(this);
    }
}

module.exports = Client;