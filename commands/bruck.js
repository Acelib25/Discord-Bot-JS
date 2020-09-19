module.exports = {
	name: 'bruck',
	usage: '-bruck @USER',
	guildOnly: true,
	description: 'Bruck',
	execute(message, args) {
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
					console.log("Brucked empty user.")
				}
				
			}
		}

		if (taggedUser == "none") {
			message.channel.send(`Bruck.\n https://cdn.discordapp.com/attachments/722116072324595792/743349672034172998/bruck.jpg `)
		}
		else if (taggedUser == message.author) {
			message.channel.send(`${message.author} brucked themself. What a dumbass.\n https://cdn.discordapp.com/attachments/722116072324595792/743349672034172998/bruck.jpg `)
		}
		else {
			message.channel.send(`${message.author} brucked ${taggedUser}. Their brain is now smooth.\n https://cdn.discordapp.com/attachments/722116072324595792/743349672034172998/bruck.jpg `)
		}
	}
};

