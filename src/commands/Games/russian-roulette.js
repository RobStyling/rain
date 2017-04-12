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

    collector.on('end', async(collected) => {
        if (playertwo == undefined && playerthree == undefined) return msg.channel.sendMessage("no want to die.. sad.");
        var players = [playerone, playertwo];
        if (playerthree != undefined) {
            players.push(playerthree);
        }
        var winner = players[Math.floor(Math.random() * players.length)];
        await msg.channel.sendMessage("AND THE WINNER IS: " + winner + ". well and everyone else is dead.");
        const winnerrow = await sql.get(`SELECT * FROM scores WHERE userId ='${winner.id}'`);
        await sql.run(`UPDATE scores SET points = ${winnerrow.points + 240} WHERE userId = ${winner.id}`);
        const playeronerows = await sql.get(`SELECT * FROM scores WHERE userId ='${playerone.id}'`);
        await sql.run(`UPDATE scores SET points = ${playeronerows.points - 120} WHERE userId = ${playerone.id}`);
        const playertworows = await sql.get(`SELECT * FROM scores WHERE userId ='${playertwo.id}'`);
        await sql.run(`UPDATE scores SET points = ${playertworows.points - 120} WHERE userId = ${playertwo.id}`);
        if (playerthree != undefined) {
            const playerthreerows = await sql.get(`SELECT * FROM scores WHERE userId ='${playerthree.id}'`);
            await sql.run(`UPDATE scores SET points = ${playerthreerows.points + 120} WHERE userId = ${playerthree.id}`);
        }
        const finalrow = await sql.get(`SELECT * FROM scores WHERE userId ='${winner.id}'`);
        await msg.channel.sendMessage(winner + " scores is now " + finalrow.points);
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
    name: "russian-roulette",
    description: "Starts a Game of Russisan Roulette.",
    usage: ""
}