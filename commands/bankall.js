let d = new Date();
module.exports = {
	name: 'bankall',
	description: 'Add monz to EVERYONE',
	aliases: ['balall', 'balanceall'],
	execute(message, args, client, currency, logger) {
		console.log(args)

		if (!message.member.roles.cache.some(r => r.name === 'Admin') && !message.member.roles.cache.some(r => r.name === 'Banker') && !message.member.roles.cache.some(r => r.name === 'Ace-JS Admin')) {
			return message.channel.send('You dont have permission to use this...');
		}
		msg = []
		message.guild.members.cache.array().forEach(member => {
			// do stuff with guild members here
			currency.add(member.user.id, args[0], member.user.username);
			console.log(`added ${args[0]} monz`)
			msg.push(`Added $${args[0]} to ${member.user.username}'s account.\n`)
		});
		message.channel.send(msg.toString())	
	},
};