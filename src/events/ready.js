exports.run = (client) => {
    console.log("Rain started up!");
    client.user.setGame(client.config.prefix + "help | Indev Phase");
}