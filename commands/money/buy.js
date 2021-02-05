const { Op } = require('sequelize');
const Discord = require('discord.js');
const { Users, CurrencyShop } = require('../../dbObjects');
const { Command } = require("discord.js-commando");
const fs = require('fs');
const { type } = require("os");
const {SyncAllSQL, AceStorage, currency, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame, Desc} = require('../../sqlStuff');

module.exports = class BuyCommand extends Command {
	constructor(client){
        super(client, {
            name: 'buy',
            memberName: 'buy',
            aliases: [],
            group: 'money',
            guildOnly: true,
            description: 'buy shit',
            usage: 'buy <item>',
            args: [
				{
                    key: 'itemToBuy',
                    prompt: 'Please provide an item name',
                    type: 'string',
                }
			],
        })
    }
	async run(message, { itemToBuy }) {


	//Relevent code
	const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: itemToBuy } } });
	const coffee = await CurrencyShop.findOne({ where: { name: { [Op.like]: 'Coffee' } } });
	if (!item) return message.channel.send(`That item doesn't exist.`);
	if (item.cost > currency.getBalance(message.author.id)) {
		return message.channel.send(`You currently have ${currency.getBalance(message.author.id)}, but the ${item.name} costs ${item.cost}!`);
	}

	const user = await Users.findOne({ where: { user_id: message.author.id } });
	const ace = await Users.findOne({ where: { user_id: '344143763918159884' } });
	currency.add(message.author.id, -item.cost);
	
	if(item.name == "Buy-Ace-a-Coffee"){
		await ace.addItem(coffee);
	} else {
		await user.addItem(item);
	}
	

	message.channel.send(`You've bought: ${item.name}.`);
	}
};