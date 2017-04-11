const sql = require("sqlite");
sql.open("./db/scores.db");

exports.run = (client, msg) => {
    sql.get(`SELECT * FROM scores WHERE userId ='${msg.author.id}'`).then(row => {
        if (!row) return msg.reply('Your current level is 0');
        msg.reply(`Your current level is ${row.level}`);
    });
}

exports.conf = {
    enabled: true,
    runIn: ["text", "dm", "groups"],
    permLevel: 0,
    aliases: [],
    botPerms: [],
    requiredFuncs: [],
}

exports.help = {
    name: "level",
    description: "Show's your current Level!",
    usage: ""
}