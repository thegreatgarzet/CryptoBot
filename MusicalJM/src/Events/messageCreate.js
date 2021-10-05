const Event = require("../Structures/Event.js");

module.exports = new Event("messageCreate", (client, message)=>{
    
        if(!message.content.startsWith(client.prefix)) return;
        const args = message.content.substring(client.prefix.length).split(/ +/); 
    
        const command = client.commands.find(cmd=>cmd.name == args[0]);
    
        if(!command || command.public =="no") return message.reply(`${args[0]} não é um comando válido!`);
    
        const permission = message.member.permissions.has(command.permission);
        if(!permission)return message.reply("Você não tem permissão para usar isto");

        command.run(message, args, client);
    
});