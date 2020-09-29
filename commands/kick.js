module.exports = {
	name: 'kick',
	usage: '-kick @USER',
	guildOnly: true,
	description: 'kick player',
	execute(message, args, client, currency, logger) {
		var taggedUser = message.mentions.users.first();
		
		if (!message.member.roles.cache.some(r => r.name === 'Admin') && !message.member.roles.cache.some(r => r.name === 'Mod') && !message.member.roles.cache.some(r => r.name === 'Ace-JS Admin')) {
            return message.channel.send('You dont have permission to use this...');
		}
		
		if (!message.mentions.users.size) {
			try {
				const User = message.client.users.cache.get(args[0]);
				logger.info(User)
				if (User) { // Checking if the user exists.
					taggedUser = User // The user exists.
					logger.info(user)
				} else {
					message.channel.send("User not found.") // The user doesn't exists or the bot couldn't find him.
				}
			}
			catch (error) {
				logger.info(error);
			}
		}

		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
		
	}
};
