const sql = require("sqlite");
sql.open("./db/scores.db");

exports.run = (client, msg) => {
    sql.get(`SELECT * FROM scores WHERE userId ='${msg.author.id}'`).then(row => {
        if (!row) return msg.reply('Your current points is 0');
        msg.reply(`Your current points is ${row.points}`);
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
    name: "points",
    description: "Shows your Points",
    usage: ""
}