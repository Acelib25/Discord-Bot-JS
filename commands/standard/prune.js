const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { writelog } = require('../../acelogger');

module.exports = class PruneCommand extends Command {
	constructor(client){
        super(client, {
            name: 'prune',
            memberName: 'prune',
            aliases: ['cut', 'trim'],
            group: 'standard',
            guildOnly: true,
            description: 'Chop chop',
            usage: 'prune <1-99>',
            args: [
                {
                    key: 'amount',
                    prompt: 'How many messages should I cut?',
                    type:'integer',
                    validate: amount => amount > 0 && amount <= 98 
                }
            ],
        })
    }
	async run(message, { amount }) {
		message.delete()
		message.channel.bulkDelete(amount + 1, true).catch(err => {
			writelog(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	}
};