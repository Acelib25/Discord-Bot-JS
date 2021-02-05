const Discord = require('discord.js');
const { Command } = require("discord.js-commando");
const fs = require('fs');
const { type } = require("os");
const { Users, CurrencyShop } = require('../../dbObjects');
const {SyncAllSQL, AceStorage, currency, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame, Desc} = require('../../sqlStuff');

module.exports = class ShopCommand extends Command {
	constructor(client){
        super(client, {
            name: 'shop',
            memberName: 'shop',
            aliases: [],
            group: 'money',
            guildOnly: true,
            description: 'View Shop',
            usage: 'shop',
        })
    }
	async run(message) {
		Reflect.defineProperty(currency, 'add', {
		/* eslint-disable-next-line func-name-matching */
		value: async function add(id, amount) {
			const user = currency.get(id);
			if (user) {
				user.balance += Number(amount);
				return user.save();
			}
			const newUser = await Users.create({ user_id: id, balance: amount });
			currency.set(id, newUser);
			return newUser;
		},
	});

	Reflect.defineProperty(currency, 'getBalance', {
		/* eslint-disable-next-line func-name-matching */
		value: function getBalance(id) {
			const user = currency.get(id);
			return user ? user.balance : 0;
		},
	});

	//Relevent code
	const items = await CurrencyShop.findAll();
	return message.channel.send(items.map(item => `${item.name}: ${item.cost}💰`).join('\n'), { code: true });
	}
};