const { Op } = require('sequelize');
const Discord = require('discord.js');
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff');
const { Command } = require('discord.js-commando');




let d = new Date();
module.exports = class BalanceCommand extends Command{
	constructor(client){
        super(client, {
            name: 'bal',
            memberName: 'balence',
            aliases: ['money'],
            group: 'money',
            guildOnly: true,
            description: 'Check you bank account',
            usage: 'bal <user>',
            args: [
				{
                    key: 'user',
                    prompt: 'Please provide a mention or ID',
					type: 'user', 
					default: '' 
                }
			],
        })
    }
	async run(message, { user }) {

	//Relevent code
	const target = user || message.author;
	return message.channel.send(`${target.username} has ${currency.getBalance(target.id)}💰`);
	}
};