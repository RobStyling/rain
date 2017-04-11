exports.run = async(client, msg, [nick]) => {
  msg.delete();
  var oldNickname = msg.guild.member(msg.author.id).displayName;
  await msg.guild.member(msg.author.id).setNickname(nick || "").catch((err) => {
    console.log(err)
    msg.reply("There was an Error while changeing your Username!");
    return;
  })
  const embed = {
    "title": "Nickname Changed!",
    "color": 10289421,
    "footer": {
      "icon_url": client.user.avatarURL,
      "text": "Changed Nickname"
    },
    "author": {
      "name": msg.author.username,
      "icon_url": msg.author.displayAvatarURL
    },
    "fields": [{
        "name": "Old Nickname:",
        "value": oldNickname
      },
      {
        "name": "New Nickname",
        "value": nick || msg.author.username
      }
    ]
  };
  msg.channel.sendEmbed(embed);
}

exports.conf = {
  enabled: true,
  runIn: ["text"],
  aliases: [],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
};

exports.help = {
  name: "nick",
  description: "Changes your Nickname",
  usage: "[nick:str]",
  usageDelim: " ",
  extendedHelp: "Changes your Nickname on the Server. Leave Empty to change it your Username."
};