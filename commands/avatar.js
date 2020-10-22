const Discord = require('discord.js');
module.exports = {
	name: 'avatar',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	aliases: ['icon', 'pfp'],
	execute(message, args, client, currency, logger, Perms) {
		var user = message.mentions.users.first();
		if (!message.mentions.users.size) {
			try {
				const User = message.client.users.cache.get(args[0]);
				if (User) { // Checking if the user exists.
					user = User // The user exists.
				}
				else throw "empty"
			}
			catch(error) {
				if(error == "empty"){
					user = message.author
					logger.info("Author user profile.")
				}
				
			}
		}
		const avatarEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(`${user.username}'s avatar:`)
		.setURL(user.displayAvatarURL({ dynamic: true }))
		.setDescription('Users Avatar')
		.setImage(user.displayAvatarURL({ dynamic: true, size: 256 * 2}))
		.setTimestamp()

		logger.info(user.displayAvatarURL({ dynamic: true}))
		message.channel.send(avatarEmbed);
	},
};
