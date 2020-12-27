const { Command } = require("discord.js-commando");

module.exports = class SayCommand extends Command {
	constructor(client){
        super(client, {
            name: 'say',
            memberName: 'say',
            aliases: ['repeat'],
            group: 'standard',
            guildOnly: true,
            description: 'Make the bot say something stupid.',
            userPermissions: ['KICK_MEMBERS'],
            usage: 'say <text>',
            ownerOnly: true,
            args: [
				{
                    key: 'text',
                    prompt: 'Please provide text to say',
                    type: 'string',
                    default: 'Bruh saying nothing is lame.'
                }
			],

        })
    }
	async run(message, { text }) {
        message.delete()        
        message.channel.send(text)
	}
};
