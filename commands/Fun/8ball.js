exports.run = (client, msg) => {
	var answers = ["Yup", "I guess", "Well Maybe", "Hmmm...", "I would say... Tree", "No", "Oh HELL No.", "Absolutely not.", "You are not ready for the Answer, my child"];
	var answer = answers[Math.floor(Math.random() * answers.length)];
	msg.reply(`I say ${answer} :8ball:`);
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
	name: "8ball",
	description: "Answers a Question!",
	usage: ""
};
