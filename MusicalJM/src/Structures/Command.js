const Discord = require("discord.js");
const Client = require("./Client.js");

/**
 * 
 * @param {Discord.Message | Discord.Interaction} message 
 * @param {String[]} args 
 * @param {Client} client 
 */
function RunFunction(message, args, client){

}

class Command{
    /**
	 * @type {{name: string, description: string, permission: Disscord.PermissionString / string, run: RunFunction}} CommandOptions
	 * @param {CommandOptions} options
	 */
    constructor(options){
        this.name = options.name;
		this.description = options.description;
		this.args = options.args;
		this.public = options.public;
		this.permission = options.permission;
		this.run = options.run;
    }
}

module.exports = Command;