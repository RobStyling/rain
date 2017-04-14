const request = require('request');
const Client = require('komada');

exports.run = async(client, msg) => {
	msg.delete();

	let NSFWchannel = msg.guild.channels.find('name', 'nsfw');
	if (!NSFWchannel) return msg.reply('Hey, there is no NSFW Channel that i can post this on!! ;D');
	if (msg.channel.id != NSFWchannel.id) return msg.reply('Please switch to the #nsfw channel!');
	var m = await client.channels.get(NSFWchannel.id).sendMessage(':mag:');

	try {
		var max = 10330;
		var min = 0;
		var MathRan = Math.random() * (10330 - 0) + 0;
		var MathLoL = Math.round(MathRan);
		var obj = JSON.parse(await get(`http://api.oboobs.ru/boobs/${MathLoL}`));
		var nudes = await client.channels.get(NSFWchannel.id).sendFile(`http://media.oboobs.ru/${obj[0].preview}`);
		m.delete();
	} catch (err) {
		client.channels.get(NSFWchannel.id).sendMessage(`:no_entry_sign: ${err}`);
	}
};

exports.conf = {
	enabled: true,
	runIn: ['text'],
	aliases: [],
	permLevel: 0,
	botPerms: [],
	requiredFuncs: []
};

exports.help = {
	name: 'boobs',
	description: 'You know it ;)',
	usage: '',
	extendedHelp: 'Sends a Boobie Image to #nsfw. This channel must exist'
};

function get(url) {
	return new Promise((resolve, reject) => {
		request(url, (err, res, body) => {
			err ? reject(err) : resolve(body);
		});
	});
}
