let d = new Date();
module.exports = {
	name: 'restart',
	description: 'Restart bot',
	execute(message, args, client, currency, logger, Perms) {
		if (message.author.id == "344143763918159884"){
			logger.info(`Bot restarted at ${d.toLocaleString()}`);
			message.channel.send(`Resarting bot...`)
			.then(process.exit())
		} else {
			message.channel.send(`**ERROR:** "You're not my dad!!!"\nUmm only my creator Ace can tell me to restart.`);
			logger.info(`${message.author} tried to restart me at ${d.toLocaleString()}`)
		}
	},
};














