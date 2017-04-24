const Discord = require("discord.js")
const bot = new Discord.Client()
var economy = require("../json/eco.json")

bot.login('token')

bot.on('ready', () => {
    bot.user.setGame("z.help for commands! | Now on JS")
    console.log('Logged in as ${bot.user.username}, running on ${bot.guilds.size} servers!')
})

bot.on('message', msg => {
	let params = msg.content.split(" ").slice(1, (msg.content.split(" ").length - 1));
    if (msg.content === 'z.version') {
        msg.reply('**zi8txBot-JS Version 1.0**\nLanguage: **JavaScript**\nCreated: **9th April 2017**\nz.help for commands\nThanks to TheFox for helping me with some stuff!')
    }

    if (msg.content === 'z.help') {
        msg.reply('**These commands are available at the moment:**\n`z.version\nz.help\nz.smack\nz.dnd\nz.online\nz.rip\nz.8ball\nz.ping\nz$don\nz$eco\nz$claim`')
    }

    if (msg.content.startsWith("z.smack")) {
        if (params[0] !== undefined) {
            msg.channel.sendMessage("**" + msg.author.username + " smacked " + msg.content.replace("z.smack ", "") + "**")
        } else {
            msg.channel.sendMessage("Invalid syntax: `z.smack [person]`")
        }
    }

    if (msg.content.startsWith("z.rip")) {
        if (msg.author.id === "112559794543468544") {
            msg.channel.sendMessage("Rip in peace?").then((m) => {
            process.exit()
			})
        } else {
            messages = ["Run you fools...", "Impossibru!", "Nope", "Negatory!", "Cyka Blyat Idi Nahui!", "You're not zi8tx!!!", "TRAITOR!", "Kill it with fire before it lays eggs!", "This is not the command you are looking for"]
            msg.channel.sendMessage(messages[Math.floor(Math.Random() * messages.size)])
        }
    }

	//ping command (added in by fox)
	if (msg.content === "z.ping")) {
	msg.channel.sendMessage(":hourglass_flowing_sand: Pinging...").then((m) => {
			var ping = m.createdTimestamp-msg.createdTimestamp
			m.edit(":hourglass: **"+ping+"ms**")
		})
	}
	
    if (msg.content.startsWith("z.afk")) {
        if (msg.author.id === "112559794543468544") {
            bot.user.setStatus("dnd")
        } else {
            Afkmessages = ["Run you fools...", "Impossibru!", "Nope", "Negatory!", "Cyka Blyat Idi Nahui!", "You're not zi8tx!!!", "TRAITOR!", "Kill it with fire before it lays eggs!", "This is not the command you are looking for"]
            msg.channel.sendMessage(Afkmessages[Math.floor(Math.Random() * Afkmessages.size)])
        }
    }

    if (msg.content.startsWith("z.online")) {
        if (msg.author.id === "112559794543468544") {
            bot.user.setStatus("online")
        } else {
            Onlinemessages = ["Run you fools...", "Impossibru!", "Nope", "Negatory!", "Cyka Blyat Idi Nahui!", "You're not zi8tx!!!", "TRAITOR!", "Kill it with fire before it lays eggs!", "This is not the command you are looking for"]
            msg.channel.sendMessage(Onlinemessages[Math.floor(Math.Random() * Onlinemessages.size)])
        }
    }

    if (msg.content.startsWith("z.8ball")) {
        if (params[0] !== undefined) {
            ballmsg = ["I don't think so", "Perhaps another time", "My sources say no", "My sources say yes", "Take a sip and repeat"]
            msg.channel.sendMessage(ballmsg[Math.Floor(Math.random() * ballmsg.size)])
        } else {
            msg.channel.sendMessage("Invalid syntax: `z.8ball [question]`")
        }
    }

    if (msg.content === 'z$claim') {
		
		if (economy[msg.author.id] === null) { //checking if a user is even registered
			ecoHandle_userReset(msg.author.id) //registering the acc
		}
		
        economy[msg.author.id].dailyPossible = false
        setTimeout(function () { economy[msg.author.id].dailyPossible = true }, 14400000)
        economy[msg.author.id].money = economy[msg.author.id].money + 400
        msg.reply("You claimed your 4-Hour Money Bonus!")
		fs.writeFile("../json/eco.json", JSON.stringify(economy))
    }

    if (msg.content === 'z$eco') {
		
		if (economy[msg.author.id] === null) { //checking if a user is even registered
			ecoHandle_userReset(msg.author.id) //registering the acc
		}
		
        msg.channel.sendMessage("You have " + economy[msg.author.id].money + "zCoins")
    }

    if (msg.content.startsWith("z$don ")) {
		if (economy[msg.author.id] === null) { //checking if a user is even registered
			ecoHandle_userReset(msg.author.id) //registering the acc
		}
        if (economy[msg.author.id].money > params[0] - 1 && params[0] > 15 && params[0] < 100) {
            if (Math.random() < 0.5000001) {
                msg.reply("You lost...")
                economy[msg.author.id].money = economy[msg.author.id].money - params[0]
                fs.writeFile("../json/eco.json", JSON.stringify(economy))
            } else {
                msg.reply("You won!")
                economy[msg.author.id].money = economy[msg.author.id].money + params[0]
                fs.writeFile("../json/eco.json", JSON.stringify(economy))
            }
        }
        else {
                msg.reply("Either \n1. You don't have enough money...\n2. You entered a text as a bet or...\n3. The bet was over the limit of 100 / lower than 15")
            }
        }
})


// Funcs

function ecoHandle_userReset(userid) {
    try {
        economy[userid] = { name: bot.users.get(userid).username, money: 0, dailyPossible: true}
        fs.writeFile("../json/eco.json", JSON.stringify(economy))
        return "success"
    } catch (err) {
        return "failed"
    }
}