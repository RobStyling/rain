exports.run = (client, msg, [args]) => {
	msg.delete();
	msg.channel.sendMessage(args);
};

exports.conf
= {
	enabled: true,
	runIn: ["text"],
	aliases: [],
	permLevel: 0,
	botPerms: [],
	requiredFuncs: []
};

exports.help
= {
	name: "sayd",
	description: "Says the following, deletes command message.",
	usage: "[args:str] [...]"
};
