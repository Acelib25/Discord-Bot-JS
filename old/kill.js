module.exports = {
	name: 'kill',
	usage: '-kill @USER',
	guildOnly: true,
	description: 'Murder someone',
	async execute(message, args, client, currency, logger, Perms) {
		
		//Permission Check
        permData = await Perms.findAll({ where: { guild_id: message.guild.id, user_id: message.author.id} });
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
		
		message.channel.send(`${taggedUser} is fucking dead. They are now a ghost.`)

		if(!message.guild.roles.cache.some(r => r.name === 'Ghost')){
			message.guild.roles.create({
				data: {
				  name: 'Ghost',
				  color: '#00abff',
				},
			})
			const role = message.guild.roles.cache.find(role => role.name === 'Ghost');
			const member = message.mentions.members.first();
			member.roles.add(role);
		} else {
			const role = message.guild.roles.cache.find(role => role.name === 'Ghost');
			const member = message.mentions.members.first();
			member.roles.add(role);
		}
	}
};
