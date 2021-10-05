const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "help",
    description: "help info",
    args: "null",
    permission: "SEND_MESSAGES",
    async run(message, args, client){
        let text='';
        message.author.send("Segue abaixo lista de comandos.")
        client.commands.forEach(element => {
            if(element.public != "no"){
                text+=(`Comando -${element.name} \nDescrição ${element.description}
                \nArgumentos: ${element.args}\n-------------------------------\n\n`);    
            }
            
        });
        message.author.send(text);

    }
});