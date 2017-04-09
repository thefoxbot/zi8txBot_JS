const Discord = require("discord.js");
const bot = new Discord.Client();
const data = require("../json/credentials.json");

bot.login(data);

bot.on('ready', () => {
    bot.user.setGame("something")
    console.log('Logged in as ${bot.user.username}, running on ${bot.guilds.size} servers!'); //client isn't defined in here
    bot.channels.get("channel id").sendMessage("Started up!") //requested
});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace("@","@ ");
  else
      return text;
}

bot.on('message', msg => {
    let params = msg.content.split(" ").splice(1);
    if (msg.content === "!ping") { 
        msg.reply("Pong! (calculating...)").then(m => {
            var ping = m.createdTimestamp-msg.createdTimestamp
            m.edit("Pong! ("+ping+"ms)")
        })
})
