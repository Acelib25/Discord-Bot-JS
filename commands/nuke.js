module.exports = {
	name: 'nuke',
	usage: '-nuke @USER',
	guildOnly: true,
	description: 'Begin a war.',
	execute(message, args) {
		let taggedUser = message.mentions.users.first();
		if (!message.mentions.users.size) {
			try {
				const User = message.client.users.cache.get(args[0]);
				if (User) { // Checking if the user exists.
					taggedUser = User // The user exists.
				} else {
					//message.channel.send("User not found.") // The user doesn't exists or the bot couldn't find him.
					taggedUser = "none"
				}
			}
			catch (error) {
				console.log(error);
				message.channel.send(`There was an error while killing someone \`${command.name}\`:\n\`${error.message}\``);
			}
		}
		else {
			
		}
		if (message.author == taggedUser || taggedUser == "none") {
			message.channel.send(`${message.author} NUKED THEMSELVES\n https://tenor.com/view/explosion-nuke-boom-nuclear-gif-5791468 `)
		} 
		else {
			message.channel.send(`${message.author} NUKED ${taggedUser} THIS IS WAR!!!\n https://tenor.com/view/explosion-nuke-boom-nuclear-gif-5791468 `)
		}
	}
};
