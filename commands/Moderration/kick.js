const Discord = require('discord.js');

exports.run = async(client, msg, [user, ...reason]) => {
	var reasonString = reason.join(' ');
	let modlog = msg.guild.channels.find('name', 'mod-log');
	if (user == undefined) return msg.reply(':warning: You need to Mention a User in order to kick them!');
	if (!modlog) return msg.reply(':disappointed_relieved: I cannot find a mod-log channel');
	if (!msg.guild.member(user).kickable) return message.reply(':no_entry_sign: I cannot kick that member');
	if (reason.length < 1) return msg.reply(':warning: You must supply a reason for the kick.');
	await user.sendMessage(`You have been kicked from **${msg.guild.name}**. Please have a better behaviour next Time!`);
	await msg.guild.member(user).kick();
	msg.reply(`Welp, ${user} is kicked.`);
	const embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0xff9933)
        .setFooter('Automated Mod-Log Message', client.user.avatarURL)
        .setTitle(':muscle:', 'User kicked!')
        .setTimestamp(new Date())
        .addField('Kicked User:', user)
        .addField('Kicked User ID:', user.id)
        .addField('Reason:', reasonString)
        .addField('Kick Invoker:', msg.author.username);
	return client.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
	enabled: true,
	runIn: ['text'],
	aliases: [],
	permLevel: 2,
	botPerms: [],
	requiredFuncs: []
};

exports.help = {
	name: 'kick',
	description: 'Kicks a User from your Server',
	usage: '[user:mention] [reason:str] [...]',
	usageDelim: ' ',
	extendedHelp: ''
};
