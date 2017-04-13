const request = require("request");
const Discord = require("discord.js");

exports.run = async(client, msg) => {
    msg.delete();

    var m = await msg.channel.sendMessage(':arrows_counterclockwise:');

    try {
        var res = JSON.parse(await get('http://random.cat/meow'));
        await msg.channel.sendFile(res.file);
        m.delete();
    } catch (err) {
        msg.channel.sendMessage(`:no_entry_sign: ${err}`);
    }
};

exports.conf = {
    enabled: true,
    runIn: ["text"],
    aliases: ["meow", "pussy"],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
};

exports.help = {
    name: "cat",
    description: "Sends a Random Cat Picture",
    usage: ""
};

function get(url) {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            err ? reject(err) : resolve(body);
        });
    });
}