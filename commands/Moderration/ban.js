const Discord = require('discord.js');

exports.run = async(client, msg, [user, ...reason]) => {
	console.log(reason);
	let modlog = msg.guild.channels.find('name', 'mod-log');
	if (user == undefined) return msg.reply(':warning: You need to Mention a User in order to ban them!');
	if (!modlog) return msg.reply(':disappointed_relieved: I cannot find a mod-log channel');
	if (!msg.guild.member(user).bannable) return msg.reply(':no_entry_sign: I cannot ban that member');
	if (reason.length < 1) return msg.reply(':warning: You must supply a reason for the ban.');
	var reasonString = reason.join(' ');
	await user.sendMessage(`You have been permanently banned from **${msg.guild.name}**. Please, dont come back! ~GLaDOS, 2011`);
	await user.sendMessage(`You're banned because ${reasonString} .`);
	await user.sendMessage(`If you feel misstreated than please contract:${msg.author}`);
	await msg.guild.ban(user, 0);
	msg.reply(`Welp, ${user} is banned.`);
	const embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0xff9933)
        .setFooter('Automated Mod-Log Message', client.user.avatarURL)
        .setTitle(':no_entry_sign:', 'User banned!')
        .setTimestamp(new Date())
        .addField('Banned User:', user)
        .addField('Ban ID', user.id)
        .addField('Reason:', reasonString)
        .addField('Ban Time', 'Permanent')
        .addField('Ban Invoker:', msg.author.username);
	return client.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
	enabled: true,
	runIn: ['text'],
	aliases: [],
	permLevel: 3,
	botPerms: [],
	requiredFuncs: []
};

exports.help = {
	name: 'ban',
	description: 'Bans a User from your Server!',
	usage: '[user:mention] [reason:str] [...]',
	usageDelim: ' ',
	extendedHelp: ''
};
