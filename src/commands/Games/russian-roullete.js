const sql = require("sqlite");
sql.open("./db/scores.db");

exports.run = async(client, msg) => {
    var playerone;
    var playertwo;
    var playerthree;
    await msg.channel.sendMessage("A New Game of Russian Roullete has been opened!\nWho also wants to feel the deadly fear of the Gun. Join the Game for 120 Pointsn!\nIf you wanna Join type: ```join```");
    await msg.reply("yes you also need to join!");
    const collector = msg.channel.createCollector(m => m.content.startsWith('join'), {
        maxMatches: 3,
        time: 20000
    });
    collector.on('message', async(msg, collected) => {
        if (playerone == undefined) {
            const playeronerow = await sql.get(`SELECT * FROM scores WHERE userId ='${msg.author.id}'`);
            if (!playeronerow) return msg.reply("Well, you dont have any Points to play...");
            if (playeronerow.points < 120) return msg.reply("You dont have enough points to play.");
            playerone = msg.author;
            return
        }
        if (playertwo == undefined) {
            if (playerone != msg.author) {
                const playertworow = await sql.get(`SELECT * FROM scores WHERE userId ='${msg.author.id}'`);
                if (!playertworow) return msg.reply("Well, you dont have any Points to play...");
                if (playertworow.points < 120) return msg.reply("You dont have enough points to play.");
                playertwo = msg.author;
                return
            }
        }
        if (playerthree == undefined) {
            if (playerone != msg.author && playertwo != msg.author) {
                const playerthreerow = await sql.get(`SELECT * FROM scores WHERE userId ='${msg.author.id}'`);
                if (!playerthreerow) return msg.reply("Well, you dont have any Points to play...");
                if (playerthreerow.points < 120) return msg.reply("You dont have enough points to play.");
                playerthree = msg.author;
                return
            }
        }
    });

    collector.on('end', collected => {
        if(playertwo == undefined && playerthree == undefined) return msg.channel.sendMessage("no want to die.. sad.");
        var players = [playerone, playertwo];
        if(playerthree != undefined) { players.push(playerthree);}
        var winner = players[Math.floor(Math.random()*players.length)];
        msg.reply("AND THE WINNER IS: " + winner);
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
    name: "russian-roullete",
    description: "Starts a Game of Russisan Roullete.",
    usage: ""
}