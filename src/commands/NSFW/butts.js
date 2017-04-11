const request = require("request");
const Client = require("komada");

exports.run = async(client, msg) => {
    msg.delete();

    let NSFWchannel = msg.guild.channels.find("name", "nsfw");
    if (!NSFWchannel) return msg.reply("Hey, there is no NSFW Channel that i can post this on!! ;D");
    if (msg.channel.id != NSFWchannel.id) return msg.reply("Please switch to the #nsfw channel!");
    var m = await client.channels.get(NSFWchannel.id).sendMessage(':arrows_counterclockwise:');

    try {
        var max = 4444;
        var min = 0;
        var MathRan = Math.random() * (max - min) + min;
        var MathLoL = Math.round(MathRan);
        var obj = JSON.parse(await get("http://api.obutts.ru/butts/" + MathLoL));
        await client.channels.get(NSFWchannel.id).sendFile("http://media.obutts.ru/" + obj[0].preview);
        m.delete();
    } catch (err) {
        client.channels.get(NSFWchannel.id).sendMessage(`:no_entry_sign: ${err}`);
    }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["ass"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: "butts",
    description: "You know it ;)",
    usage: "",
    extendedHelp: "Sends an Ass Image to #nsfw. This channel must exist"
};

function get(url) {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            err ? reject(err) : resolve(body);
        });
    });
}