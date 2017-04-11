const Discord = require("discord.js");

exports.run = (client, msg) => {
    if (!client.config.selfbot) {
        const embed = new Discord.RichEmbed()
            .setAuthor("Invite Link", client.user.avatarURL)
            .setColor(0x99b3ff)
            .setURL("https://discordapp.com/oauth2/authorize?client_id=" + client.config.clientID + "&scope=bot&permissions=8")
            .addField("Invites the Bot to your Discord Server", "Thanks for adding us!")
        return msg.channel.sendEmbed(embed);
    } else {
        msg.reply("Why would you need an invite link for a selfbot...");
    }
};

exports.help = {
    name: "invite",
    description: "Displays the join server link of the bot.",
    usage: "",
    usageDelim: "",
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};