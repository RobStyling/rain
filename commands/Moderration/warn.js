const Discord = require("discord.js");

exports.run = (client, msg, [user, ...reason]) => {
	let modlog = msg.guild.channels.find("name", "mod-log");
	if (user == undefined) return msg.reply(":warning: You need to Mention a User in order to warn them!");
	if (!modlog) return msg.reply(":disappointed_relieved: I cannot find a mod-log channel");
	if (reason.length < 1) return msg.reply(":warning: You must supply a reason for the warn.");
	var reasonString = reason.join(" ");
	msg.reply(`${user} was warned!`);
	const embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x336600)
        .setFooter("Automated Mod-Log Message", client.user.avatarURL)
        .setTitle(":warning:", "User warned!")
        .setTimestamp(new Date())
        .addField("Warned User:", user)
        .addField("Reason:", reasonString)
        .addField("Warn Invoker:", msg.author.username);
	return client.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
	enabled: true,
	runIn: ["text"],
	aliases: [],
	permLevel: 2,
	botPerms: [],
	requiredFuncs: []
};

exports.help = {
	name: "warn",
	description: "Warns a User on your Server",
	usage: "[user:mention] [reason:str] [...]",
	usageDelim: " ",
	extendedHelp: ""
};
