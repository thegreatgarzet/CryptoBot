
console.clear();
const Client = require("./Structures/Client.js");
const Command = require("./Structures/Command.js");
const config = require("./Data/config.json");



const client = new Client();

client.start(config.token);




