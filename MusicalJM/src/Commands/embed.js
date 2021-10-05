const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
module.exports = new Command({
    name: "about",
    description: "Shows about",
    args: "null",
    permission: "SEND_MESSAGES",

    async run(message,args,client){
        const embed = new Discord.MessageEmbed();
        embed.setTitle("Teste de mensagem embutida")
        .setURL("https://garzettdev.itch.io")
        .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}), "https://garzettdev.itch.io")
        .setDescription("Teste apenas amigão, vai tu te fude\nToma um link já: [CLICA AQUI CORNO](https://garzettdev.itch.io)")
        .setColor("AQUA")
        .setThumbnail(message.author.avatarURL({dynamic: true}))
        .setTimestamp(message.createdTimestamp)
        .setImage('https://cdn.discordapp.com/attachments/836038873511493693/892988665339453450/Embed_Teste.png')
        .addFields({
            name: "Bot version",
            value: "1.0.0",
            inline: true
        },{
            name: "Dime?",
            value: " Gordola",
            inline: true
        })
        ;
        message.channel.send({embeds: [embed]});
    }
});