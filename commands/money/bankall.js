let d = new Date();
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff')
const { Command } = require('discord.js-commando');

module.exports = class BankAllCommand extends Command{
	constructor(client){
        super(client, {
            name: 'bankall',
            memberName: 'bankall',
            aliases: ['fundall'],
            group: 'money',
            guildOnly: true,
            description: 'Commit Gain Money',
			usage: 'bankall <$$$>',
			userPermissions: ['KICK_MEMBERS'],
            args: [
				{
                    key: 'amount',
                    prompt: 'Please provide an amount',
                    type: 'integer',  
                }
			],
        })
    }
	async run(message, { amount }) {
		let msg = []
		message.guild.members.cache.array().forEach(member => {
			// do stuff with guild members here
			currency.add(member.user.id, amount, member.user.username);
			msg.push(`Added $${amount} to ${member.user.username}'s account.`)
		});
		message.channel.send(msg.join('\n'))	
	}
};