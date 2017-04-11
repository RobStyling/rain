const sql = require("sqlite");
sql.open("./db/scores.db");

exports.run = (client, msg) => 
{
    sql.run(`SELECT * FROM scores WHERE userId ='${msg.author.id}'`).then(row => 
    {
        if(!row) return msg.reply("Well, you dont have any Points to play...");
        if(row.points > 120) return msg.reply("You dont have enough points to play.");
        console.log(row.points);
        msg.reply(row.points);
        msg.reply("You can play!"); 
    })
}

exports.conf = {
    enabled: true,
    runIn: ["text"],
    permLevel: 0,
    aliases: [],
    botPerms: [],
    requiredFuncs: [],
}

exports.help = 
{
    name: "russian-roullete",
    description: "Starts a Game of Russisan Roullete.",
    usage: ""   
}