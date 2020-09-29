module.exports = {
	name: 'server',
	description: 'Display info about this server.',
	execute(message, args, client, currency, logger) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nServer ID: ${message.guild.id}`);
	},
};
