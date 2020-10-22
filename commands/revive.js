module.exports = {
	name: 'revive',
	usage: '-revive @USER',
	guildOnly: true,
	description: 'Un-Murder someone',
	execute(message, args, client, currency, logger, Perms) {
		
		//Permission Check
        permData = Perms.findAll({ where: { guild_id: message.guild.id, user_id: message.author.id} });
        permPower = permData.map(t => t.power);

        if (!permPower.includes("admin") && !permPower.includes("mod")) {
            return message.channel.send('You dont have permission to use this...');
        }
        //Permission Check
		
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
				logger.info(error);
				message.channel.send(`There was an error while killing someone \`${command.name}\`:\n\`${error.message}\``);
			}
		}
		
		if(message.member.roles.cache.some(r => r.name === 'Ghost') || message.mentions.members.first().roles.cache.some(r => r.name === 'Ghost')){
			const role = message.guild.roles.cache.find(role => role.name === 'Ghost');
			const member = message.mentions.members.first();
			member.roles.remove(role);
			message.channel.send(`${taggedUser}'s soul has been rebuilt using the only finest flex tape from Phil Swift himself.\n\n**By the power of flex tape ${taggedUser.username} is now deadn't.**`)
		} else {
			message.channel.send(`Ummm, I ran out of flex tape, plus they are not dead yet.`)
		}
	}
};
