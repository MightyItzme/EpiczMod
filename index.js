const express = require("express")
const app = express()

app.get("/", (req, res) => {
 res.send("hello hell!")
})

app.listen(3000, () => {
 console.log("Whatever you want to put here")
})

let Discord = require (`discord.js`);
let client = new Discord.Client()

const db = require('quick.db')


client.on( "ready",() => {
  client.user.setPresence({ activity: { name: "Chat"}, status: "idle"
    })
})


client.on("guildMemberAdd",member => {
  if(member.guild.id === "Enter_Your_Server_ID_Here") {
    client.channels.cache.get("Welcome_Channel_ID").send(`Welcome to the server ${member}!`)
  }
})


client.on("guildMemberRemove",member => {
  if(member.guild.id === "Enter_Your_Server_ID_Here") {
    client.channels.cache.get("Left_Channel_ID").send(`Someone left the server`)
  }
})


client.on("message", async message => {
if (message.content === "Ping") {
message.channel.send(`Pong`)
}
if(message.content === "Welcome") {
  message.channel.send("https://tenor.com/view/alan-walker-alanwalker-welcome-discord-gif-17530559")
}
if(message.content === "Hi") {
  message.channel.send("Hello")
}
if(message.content ===  "How are you") {
  message.channel.send( "Good,what about you")
}
if (message.content ===  "Good too") {
  message.channel.send( "Glad to hear that")
}
if(message.content === "${member} moved their freezed fingers to obtain ${level}. GG!") {
 message.channel.send("Gg!")
}

 if(message.content.toLowerCase().startsWith("balance") || message.content.toLowerCase().startsWith("bal")) {
 let balance = await db.get(`wallet_${message.author.id}`)
 let bank = await db.get(`bank_${message.author.id}`)

 if(balance === null) balance = 0
 if(bank === null) bank = 0
 const currency = "$"
 let moneyEmbed = new Discord.MessageEmbed()
 .setTitle(`${currency} ${message.author.username}'s Balance :dollar:`)
 .setDescription(`${currency} Wallet: ${balance} :dollar:\n${currency} Bank: ${bank} :dollar:`)
 .setColor("BLACK")
 .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
 .setTimestamp()
 message.channel.send(moneyEmbed)
};
if(message.content.toLowerCase().startsWith("daily")) {
 let currency = ":dollar:"
 const check = await db.get(`dailyCheck_${message.author.id}`)
 const timeout = 86400000;
 if(check !== null && timeout - (Date.now() - check) > 0) {
const ms = require("pretty-ms")
const timeLeft = ms(timeout - (Date.now() - check))
let fail = new Discord.MessageEmbed()
.setTitle("You've already had your daily!")
.setColor("RED")
.setDescription(`Nice try, but you've already claimed your daily for today!\nCome back after ${timeLeft} for your next daily.`)
.setTimestamp()
message.channel.send(fail)
 } else {
 let reward = 10000
 let currentBalance = await db.get(`wallet_${message.author.id}`)
 let success = new Discord.MessageEmbed()
 .setTitle("You claimed your daily!")
 .setColor("GREEN")
 .setDescription(`Nice job, you just claimed ${currency} ${reward.toLocaleString()}!\nCome back tomorrow for another ${currency} ${reward.toLocaleString()}!`)
 .setTimestamp()
 message.channel.send(success)
 await db.set(`wallet_${message.author.id}`, currentBalance + reward )
 await db.set(`dailyCheck_${message.author.id}`, Date.now())
 }
}

})

client.login(process.env.Token)
