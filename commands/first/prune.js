const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class PruneCommand extends Command {
	constructor(client){
        super(client, {
            name: 'prune',
            memberName: 'prune',
            aliases: ['cut'],
            group: 'first',
            guildOnly: true,
            description: 'Chop chop',
            usage: 'prune <1-99>',
            args: [
                {
                    key: 'amount',
                    prompt: 'How many messages should I cut?',
                    type:'integer',
                    validate: amount => amount > 0 && amount <= 99 
                }
            ],
        })
    }
	async run(message, { amount }) {
		message.delete()
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	}
};