const Discord = require("discord.js");

exports.run = (client, msg, [user, ...reason]) => {
	let modlog = msg.guild.channels.find("name", "mod-log");
	let muteRole = msg.guild.roles.find("name", "mute");
	if (!modlog) return msg.reply(":disappointed_relieved: I cannot find a mod-log channel").catch(console.error);
	if (!muteRole) return msg.reply(":disappointed_relieved: I cannot find a mute role").catch(console.error);
	if (reason.length < 1) return msg.reply(":no_entry_sign: You must supply a reason for the mute.").catch(console.error);
	var reasonString = reason.join(" ");
	if (msg.mentions.users.size < 1) return msg.reply("You must mention someone to mute them. :thinking:").catch(console.error);
	const embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0xff00ff)
        .setFooter("Automated Mod-Log msg", client.user.avatarURL)
        .setThumbnail(user.avatarURL)
        .setTitle(":mute:", "User muted!")
        .setTimestamp(new Date())
        .addField("Muted User:", user)
        .addField("User ID:", user.id)
        .addField("Reason:", reasonString)
        .addField("Mute Invoker:", msg.author.username);

	const unmuteembed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0xffff00)
        .setFooter("Automated Mod-Log msg", client.user.avatarURL)
        .setThumbnail(user.avatarURL)
        .setTitle(":loud_sound:", "User unmuted!")
        .setTimestamp(new Date())
        .addField("Unmuted User:", user)
        .addField("User ID:", user.id)
        .addField("Reason:", reasonString)
        .addField("Unmute Invoker:", msg.author.username);

	if (!msg.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return msg.reply("I do not have the correct permissions.").catch(console.error);

	if (msg.guild.member(user).roles.has(muteRole.id)) {
		msg.guild.member(user).removeRole(muteRole).then(() => {
			client.channels.get(modlog.id).sendEmbed(unmuteembed).catch(console.error);
		});
	} else {
		msg.guild.member(user).addRole(muteRole).then(() => {
			client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
		});
	}
};

exports.conf = {
	enabled: true,
	runIn: ["text"],
	aliases: [],
	permLevel: 3,
	botPerms: [],
	requiredFuncs: []
};

exports.help = {
	name: "mute",
	description: "Mutes a User on your Server",
	usage: "[users:mention] [reason:str] [...]",
	usageDelim: " ",
	extendedHelp: "You also need a `mute` Role!"
};
