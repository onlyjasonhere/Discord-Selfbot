
const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");

function AaN(args, i) {
  if (args[i] === null || args[i] === "" || args[i] === undefined) return true;
  return false;
}

bot.login(config.token);


bot.on("ready", () => {
  bot.user.setGame("Set-Your-Playing-Game-Here", "https://twitch.tv/beta_rocket")
  console.log(`Logged in as ${bot.user.username}#${bot.user.discriminator}`);
  console.log(`${bot.user.username}, your selfbot is online and ready to rock and roll!`)
  console.log(`${bot.user.username}, you"re on ${bot.guilds.size} servers with ${bot.channels.size} channels and with ${bot.users.size} users`)
});


//////////////////////////////////////////////////////
//                | By Beta             |           //
//                | DISCORD SELFBOT     |           //
//                | v11 Discord.js      |           //
//////////////////////////////////////////////////////


bot.on("message", msg => {
  if (msg.author.id !== bot.user.id) return; //Only allows you to work with it, since it"s called a selfbot :P

  prefix = config.prefix;
  channel = msg.channel;
  guild = msg.guild;
  text = msg.content;
  args = text.split(" ");
  command = text.substring(prefix.length, args[0].length).toLowerCase();
  embedColor = parseInt("0x" + Math.floor(Math.random() * 16777215).toString(16));

  if (!msg.content.startsWith(prefix)) return;

  console.log("Command: " + command + " (" + guild.name + ")[" + guild.id + "]")

  if (command == "ping") {
    msg.delete()
    startTime = Date.now();
    channel.sendMessage("Pinging...").then((msg) => {
      endTime = Date.now();
      msg.edit("Pong **" + Math.round(endTime - startTime) + "**ms!");
    });
  }

  if (command == "purge") {
    var amount = parseInt(args[1]);
    msg.channel.fetchMessages({limit: amount})
    .then(messages => {
      messages.map(msg => msg.delete().catch(console.error) );
    }).catch(console.error);
  } else if (command == "p") { //p delets your messages. purge deletes everyones messages.
    let delamount = parseInt(args[1]) ? parseInt(args[1]) : 1;
    msg.channel.fetchMessages({limit: 100})
    .then(messages => {
      msgar = messages.array();
      msgar = msgar.filter(msg => msg.author.id === bot.user.id);
      msgar.length = delamount + 1;
      msgar.map(msg => msg.delete().catch(console.error));
     });
  }

  if (command == "eval") {
    msg.delete()
      try {
        let com = eval(msg.content.split(" ").slice(1).join(" "));
        var com2 = msg.content.split(" ").slice(1).join(" ");
        channel.sendMessage(":arrow_down:\n```md\n# INPUT\n" + com2 + "```")
          channel.sendMessage(":arrow_up:\n```md\n# OUTPUT\n" + com + "```")
      } catch(e) {
        channel.sendMessage(":arrow_down:\n```md\n# INPUT\n" + com2 + "```")
        channel.sendMessage(":arrow_up:\n```md\n# OUTPUT\n" + e + "```")
      }
  }

  if (command == "block") {
    let Block = msg.mentions.users.first();
    if (!Block) return channel.sendMessage("Please include a mention!")
    Block.block().then(Block => {
      channel.sendMessage(`**${Block.username}** has been successfully blocked!!`)
    }).catch((error) => {
      channel.sendMessage("Opps! There seems to be an error please try again!")
    })
  }

  if (command == "unblock") {
    let unBlock = msg.mentions.users.first();
    if (!unBlock) return channel.sendMessage("Please include a mention!")
    unBlock.unblock().then(unBlock => {
      channel.sendMessage(`**${unBlock.username} has been successfully unblock!**`)
    }).catch((error) => {
      channel.sendMessage("Opps! There seems to be an error please try again!")
    })
  }

  if (command == "help") {
    if (!msg.channel.permissionsFor(bot.user.id).hasPermission("EMBED_LINKS")) {
      return msg.channel.sendMessage("This command needs EMBED_LINKS permission, please ask a Administrator or the Owner to add that permission to your role.")
    }
    channel.sendMessage("", {embed: {
      color: embedColor,
      title: "Selfbot Commands",
      description: "Current commands for my selfbot",
      author: {
        name: bot.user.username,
        icon_url: bot.user.avatarURL
      },
      thumbnail: {
        url: bot.user.avatarURL
      },
      fields: [
        {
          name: "Ping",
          value: "Get a timestamp of how long it takes to send a message."
        },
        {
          name: "Purge",
          value: "Deletes a certain amount of messages."
        },
        {
          name: "P",
          value: "Deletes a certain amount of **MY** messages."
        },
        {
          name: "Eval",
          value: "Evaluate JavaScript"
        },
        {
          name: "Block",
          value: "Blocks the user that you mentioned"
        },
        {
          name: "Unblock",
          value: "Unblocks the user that you mentioned"
        }
      ]
    }})
  }

});
