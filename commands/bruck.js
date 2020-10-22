module.exports = {
	name: 'bruck',
	usage: '-bruck @USER',
	guildOnly: true,
	description: 'Bruck',
	execute(message, args, client, currency, logger, Perms) {
	var taggedUser = message.mentions.users.first();
		if (!message.mentions.users.size) {
			try {
				const User = message.client.users.cache.get(args[0]);
				if (User) { // Checking if the user exists.
					taggedUser = User // The user exists.
				}
				else throw "empty"
			}
			catch(error) {
				if(error == "empty"){
					taggedUser = "none"
					logger.info("Brucked empty user.")
				}
				
			}
		}

		if (taggedUser == "none") {
			message.channel.send(`Bruck.\n https://cdn.discordapp.com/attachments/722116072324595792/743349672034172998/bruck.jpg `)
		}
		else if (taggedUser == message.author) {
			logger.info(`${message.author} brucked themself. What a dumbass.`)
			message.channel.send(`${message.author} brucked themself. What a dumbass.\n https://cdn.discordapp.com/attachments/722116072324595792/743349672034172998/bruck.jpg `)
		}
		else {
			logger.info(`${message.author} brucked ${taggedUser}. Their brain is now smooth.`)
			message.channel.send(`${message.author} brucked ${taggedUser}. Their brain is now smooth.\n https://cdn.discordapp.com/attachments/722116072324595792/743349672034172998/bruck.jpg `)
		}
	}
};

