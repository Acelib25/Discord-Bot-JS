const { Op } = require('sequelize');
const Discord = require('discord.js');
const { Users, CurrencyShop } = require('../../dbObjects');
const { Command } = require("discord.js-commando");
const fs = require('fs');
const { type } = require("os");
const {SyncAllSQL, AceStorage, currency, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame, Desc} = require('../../sqlStuff');

module.exports = class InvCommand extends Command {
	constructor(client){
        super(client, {
            name: 'inv',
            memberName: 'inv',
            aliases: ['inventory', 'bag'],
            group: 'money',
            guildOnly: true,
            description: 'see shit',
            usage: 'inv',
        })
    }
	async run(message) {

	//Relevent code
	const target = message.mentions.users.first() || message.author;
	const user = await Users.findOne({ where: { user_id: target.id } });
	const items = await user.getItems();

	if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
	return message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
	}
};