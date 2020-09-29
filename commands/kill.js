module.exports = {
	name: 'kill',
	usage: '-kill @USER',
	guildOnly: true,
	description: 'Murder someone',
	execute(message, args, client, currency, logger) {
		
		if (!message.member.roles.cache.some(r => r.name === 'Admin') && !message.member.roles.cache.some(r => r.name === 'Mod') && !message.member.roles.cache.some(r => r.name === 'Ace-JS Admin')) {
            return message.channel.send('You dont have permission to use this...');
		}
		
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
