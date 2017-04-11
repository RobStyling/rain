const Discord = require('discord.js');

exports.run = (client, msg) => 
{
      msg.delete();
      var min = 0
      var max = 1
      var MathMin = Math.random((max * min) - min)
      var MathRound = Math.round(MathMin)
      if (MathRound == 0) {
        var embed = new Discord.RichEmbed();
        embed.setAuthor(msg.author.username, msg.author.avatarURL)
        embed.setFooter("Coinflip")
        embed.setThumbnail("https://upload.wikimedia.org/wikipedia/de/6/69/1_euro_coin_Va_serie_3_%281%29.png")
        embed.addField("Coin flipped!", "Result: Head")
        msg.channel.sendEmbed(embed);
      } else {
        var embed = new Discord.RichEmbed();
        embed.setAuthor(msg.author.username, msg.author.avatarURL)
        embed.setFooter("Coinflip")
        embed.setThumbnail("http://www.pngmart.com/files/3/Euro-Coin-Transparent-Background.png")
        embed.addField("Coin flipped!", "Result: Number")
        msg.channel.sendEmbed(embed);
      }
}

exports.conf = 
{
    enabled: true,
    runIn: ["text"],
    aliases: [],
    permLevel: 0,
    botPerms: [],
    requiredFuncs: [],
}

exports.help = {
    name: "coinflip",
    description: "Flips a Coin",
    usage: ""
}