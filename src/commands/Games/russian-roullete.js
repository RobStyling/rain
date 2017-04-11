const sql = require("sqlite");
sql.open("./db/scores.db");

exports.run = async(client, msg) => {
    const row = await sql.get(`SELECT * FROM scores WHERE userId ='${msg.author.id}'`)
    if (!row) return msg.reply("Well, you dont have any Points to play...");
    if (row.points < 120) return msg.reply("You dont have enough points to play.");
    await msg.channel.sendMessage("A New Game of Russian Roullete has been opened!\nWho also wants to feel the deadly fear of the Gun. Join the Game for 120 Points!\nIf you wanna Join type: ```join```")
    const responsesRaw = await msg.channel.awaitMessages(response => response.content === "join", {
        max: 4,
        time: 20000,
    })
    if (responsesRaw.size < 1) return msg.reply("well no wants to die... Aborting..");
    const responses = Array.from(responsesRaw.values());
    const playerone = msg.author;
    const playertwo = responses[1].author;
    const playerthree = responses[2].author;
    const playerfour = responses[3].author;
    const playerfive = responses[4].author; 
    const rowplayertwo = await sql.get(`SELECT * FROM scores WHERE userId ='${playertwo}'`)
    const rowplayerthree = await sql.get(`SELECT * FROM scores WHERE userId ='${playerthree}'`)
    const rowplayerfour = await sql.get(`SELECT * FROM scores WHERE userId ='${playerfour}'`)
    const rowplayerfive = await sql.get(`SELECT * FROM scores WHERE userId ='${playerfive}'`)
    if (!rowplayertwo) return msg.reply("Well, you dont have any Points to play..." + playertwo);
    if (rowplayertwo.points < 120) return msg.reply("You dont have enough points to play, "+ playertwo);
    if (!rowplayerthree) return msg.reply("Well, you dont have any Points to play..." + playerthree);
    if (rowplayerthree.points < 120) return msg.reply("You dont have enough points to play, "+ playerthree);
    if (!rowplayerfour) return msg.reply("Well, you dont have any Points to play..." + playerfour);
    if (rowplayerfour.points < 120) return msg.reply("You dont have enough points to play, "+ playerfour);
    if (!rowplayerfive) return msg.reply("Well, you dont have any Points to play..." + playerfive);
    if (rowplayerfive.points < 120) return msg.reply("You dont have enough points to play, "+ playerfive);
    msg.reply("DEBUG MESSAGE:\n"+playerone + " can play with " + row.points + "\n"+playertwo+" can play with " + rowplayertwo.points + "\n" + playerthree + " can play with " + rowplayerthree.points + "\n" + playerfour + " can play with " + rowplayerfour.points + "\n" + playerfive + " can play with " + rowplayerfive.points);
}

exports.conf = {
    enabled: true,
    runIn: ["text"],
    permLevel: 0,
    aliases: [],
    botPerms: [],
    requiredFuncs: [],
}

exports.help = {
    name: "russian-roullete",
    description: "Starts a Game of Russisan Roullete.",
    usage: ""
}