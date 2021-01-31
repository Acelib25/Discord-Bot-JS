let d = new Date();
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff')
const { Command } = require('discord.js-commando');
const { writelog } = require('../../acelogger');

module.exports = class BankAddCommand extends Command{
	constructor(client){
        super(client, {
            name: 'bankadd',
            memberName: 'bankadd',
            aliases: ['fund'],
            group: 'money',
            guildOnly: true,
            description: 'Commit Gain Money',
			usage: 'bankadd <user> <$$$>',
			userPermissions: ['KICK_MEMBERS'],
            args: [
				{
                    key: 'user',
                    prompt: 'Please provide a mention or id',
					type: 'user',
					default: '',  
                },
				{
                    key: 'amount',
                    prompt: 'Please provide an amount',
                    type: 'integer',  
                }
			],
        })
    }
	async run(message, { user, amount }) {
		const target = user || message.author;
		currency.add(target.id, amount, target.username);
		writelog(`added ${amount} monz`, false)
		message.channel.send(`Added $${amount} to ${target.username}'s account.`)
			
	}
};