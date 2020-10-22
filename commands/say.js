const Discord = require('discord.js');
const { execute } = require('./tag');

module.exports = {
    name: 'say',
    aliases: ['simon', 'repeat'],
	async execute(message, args, client, currency, logger, Perms) {
        message.delete()
        argsProssesed = args.join(" ")
        message.channel.send(argsProssesed)
	},
};
