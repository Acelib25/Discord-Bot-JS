let d = new Date();
module.exports = {
	name: 'bankall',
	description: 'Add monz to EVERYONE',
	aliases: ['balall', 'balanceall'],
	async execute(message, args, client, currency, logger, Perms) {
		logger.info(args)

		//Permission Check
        permData = await Perms.findAll({ where: { guild_id: message.guild.id, user_id: message.author.id} });
        permPower = permData.map(t => t.power);

        if (!permPower.includes("admin") && !permPower.includes("mod")) {
            return message.channel.send('You dont have permission to use this...');
        }
        //Permission Check
		msg = []
		message.guild.members.cache.array().forEach(member => {
			// do stuff with guild members here
			currency.add(member.user.id, args[0], member.user.username);
			logger.info(`added ${args[0]} monz`)
			msg.push(`Added $${args[0]} to ${member.user.username}'s account.\n`)
		});
		message.channel.send(msg.toString())	
	},
};