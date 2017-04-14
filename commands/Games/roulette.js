const sql = require("sqlite");
sql.open("./db/scores.db");

exports.run = async(client, msg) => {
    var playerone;
    const zahlen = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];
    var zahl = zahlen[Math.floor(Math.random() * zahlen.length)];
    if(zahl != 0) 
    {
        if(!(zahl % 2)) { var color = "Red"}
        if(zahl % 2) {var color = "Black"}
    }
    else if (zahl == 0)
    {
        var color = "Green";
    }
    var spun = [zahl, color];
    console.log(spun);
    await msg.channel.sendMessage("nun ja join zum joinen des Spieles.");
    await msg.channel.sendMessage("du kannst zwischen 100, 200, 300, 400 und 500 Punkten wählen");
    const collector = msg.channel.createCollector(m => m.content.startsWith('join'), {
        maxMatches: 1,
        time: 20000
    });
    collector.on('message', async(msg, collected) => {
        if (playerone == undefined) {
            playerone = msg.author;
            return
        }
    });
    collector.on('end', async(collected) => {
        if (!playerone) return msg.reply("You dont wanna play?");
        await msg.channel.sendMessage("Ok, " + playerone + " how much do you wanna bet?");
        const playeronebetinput = await msg.channel.awaitMessages(response => response.content == "100" || response.content == "200" || response.content == "300" || response.content == "400" || response.content == "500" && msg.author.id == playerone.id, {
            max: 1,
            time: 30000,
        });
        if (!playeronebetinput.size) {
            msg.channel.sendMessage("Ok " + playerone + " left, i guess...");
            playerone = undefined
        }
        if (playerone != undefined) {
            const playerOneBet = playeronebetinput.first().content
            const playerOneBetRequiment = await sql.run(`SELECT * FROM scores WHERE userId = '${playerone.id}'`);
            if(playerOneBetRequiment.points < playerOneBet) return msg.reply("You cant play, because you have Infucent Points!");
            msg.channel.sendMessage("Please choose: Color or Number.")
            const playeroneChoseInput = await msg.channel.awaitMessages(response => response.content == "Color" || response.content == "Number" && msg.author.id == playerone.id, {
                max: 1,
                time: 30000,
            });
            if(!playeroneChose.size) 
            {
                msg.reply("ok than not.");
                playerone = undefined;
            }
            if(playeroneChose.first().content == "Number" && playerone != undefined) 
            {
                //if he chose Number
            }
            else if (playeroneChose.first().content == "Color" && playerone != undefined)
            {
                //if he chose color
            }
            else 
            {
                msg.reply("Than i end the Game here.\nThanks for Playing!");
            }
        }
    });
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
    name: "roulette",
    description: "Rolls the Roulette",
    usage: ""
}