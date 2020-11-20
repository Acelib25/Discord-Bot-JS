const { prefix } = require('../config.json');

module.exports = {
	name: 'discord',
	description: 'He he advertising',
	aliases: ['aceserver'],
	usage: 'Yes',
	cooldown: 5,
	guildOnly: false,
	execute(message, args, client, currency, logger, Perms) {
		message.channel.send("Ace likes to have frens. Here is his server. https://discord.gg/q8qVCAq")
		logger.ace(`${message.author} asked for server`)
	},
};
