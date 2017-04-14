const Client = require("komada");
const Settings = require("./config/settings.json");


Client.start({
	botToken: Settings.token,
	ownerID: Settings.ownerID,
	clientID: Settings.clientID,
	prefix: Settings.prefix,
	clientOptions: { fetchAllMembers: true }
});
