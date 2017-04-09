const Discord = require("discord.js");
const bot = new Discord.Client();
const data = require("../json/credentials.json");

bot.login(data);

bot.on('ready', () => {
    console.log('Logged in as ${client.user.username}!');
});

bot.on('message', msg => {
    if (msg.content === '')
})