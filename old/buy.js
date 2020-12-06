const { Op } = require('sequelize');
const Discord = require('discord.js');
const { Users, CurrencyShop } = require('../dbObjects');
const currency = new Discord.Collection();



let d = new Date();
module.exports = {
	name: 'buy',
	description: 'Buy fun stuff',
	async execute(message, args, client, currency, logger, Perms) {
		const PREFIX = '-';
		const input = message.content.slice(PREFIX.length).trim();
		if (!input.length) return;
		const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);
		
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
	const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
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
	console.log(item.name)
	},
};