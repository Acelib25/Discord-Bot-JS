const { Command } = require("discord.js-commando");

module.exports = class StatsCommand extends Command {
	constructor(client){
        super(client, {
            name: 'stats',
            memberName: 'stats',
            aliases: ['server', 'stat'],
            group: 'standard',
            guildOnly: true,
            description: 'View Server Stats',
            usage: 'stats',

        })
    }
	async run(message) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nServer ID: ${message.guild.id}`);
	}
};
