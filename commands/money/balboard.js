const { Op } = require('sequelize');
const Discord = require('discord.js');
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff');
const { Command } = require('discord.js-commando');




let d = new Date();
module.exports = class BalanceCommand extends Command{
	constructor(client){
        super(client, {
            name: 'baltop',
            memberName: 'balboard',
            aliases: [],
            group: 'money',
            guildOnly: true,
            description: 'Who you sould rob next',
            usage: 'baltop',
            args: [],
        })
    }
	async run(message) {
	//Relevent code
	return message.channel.send(
		currency.sort((a, b) => b.balance - a.balance)
			.filter(user => message.guild.members.cache.has(user.user_id))
			.first(15)
			.map((user, position) => `(${position + 1}) ${(message.guild.members.cache.get(user.user_id).user.username)}: ${user.balance}💰`)
			.join('\n'),
		{ code: true }
	);
	}
};