const Discord = require("discord.js");

exports.run = async (client, msg, guild) => {
    let name = msg.guild.id
  const embed = new Discord.RichEmbed()
    embed.setColor(3447003)
    embed.setAuthor(`${client.guilds.get(name).name}`, client.guilds.get(name).iconURL)
    embed.setTitle("Server Info")
    embed.setThumbnail(client.guilds.get(name).iconURL)
    embed.addField(`> Server ID`, name, true)
    embed.addField(`> Owner`, `${client.guilds.get(name).owner}`, true)
    embed.addField(`> Region`, `${client.guilds.get(name).region}`, true)
    embed.addField(`> Created On`, `${client.guilds.get(name).createdAt}`, true)
    embed.addField(`> Member Count`, `${client.guilds.get(name).memberCount}`, true)
    embed.addField(`> Default Channel`, `${client.guilds.get(name).defaultChannel}`, true)
    embed.addField(`> Channels`, `${client.guilds.get(name).channels.map(c => c.name).join(", ")}`)
    embed.addField(`> Roles`, `${client.guilds.get(name).roles.map(r => r.name).join(", ")}`)
    embed.setFooter("Serverinfo", client.user.avatarURL)
    return msg.channel.sendEmbed(embed)
    
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "serverinfo",
  description: "Returns information of a server.",
  usage: "",
};