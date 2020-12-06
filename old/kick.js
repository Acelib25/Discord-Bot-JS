module.exports = {
	name: 'kick',
	usage: '-kick @USER',
	guildOnly: true,
	description: 'kick player',
	async execute(message, args, client, currency, logger, Perms) {
		var taggedUser = message.mentions.users.first();
		
		//Permission Check
        permData = await Perms.findAll({ where: { guild_id: message.guild.id, user_id: message.author.id} });
        permPower = permData.map(t => t.power);

        if (!permPower.includes("admin") && !permPower.includes("mod")) {
            return message.channel.send('You dont have permission to use this...');
        }
        //Permission Check
		
		if (!message.mentions.users.size) {
			try {
				const User = message.client.users.cache.get(args[0]);
				console.log(User)
				if (User) { // Checking if the user exists.
					taggedUser = User // The user exists.
					console.log(user)
				} else {
					message.channel.send("User not found.") // The user doesn't exists or the bot couldn't find him.
				}
			}
			catch (error) {
				console.log(error);
			}
		}

		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
		
	}
};
