const { Op } = require('sequelize');
const Discord = require('discord.js');
const { Users, CurrencyShop } = require('../dbObjects');
const currency = new Discord.Collection();
const Sequelize = require('sequelize');


let d = new Date();
module.exports = {
	name: 'delshop',
	description: 'DELETE SHOP ITEM',
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
	const sequelize = new Sequelize('database', 'username', 'password', {
		host: 'localhost',
		dialect: 'sqlite',
		logging: false,
		storage: 'database.sqlite',
	});
	
	//Permission Check
	permData = await Perms.findAll({ where: { guild_id: message.guild.id, user_id: message.author.id} });
	permPower = permData.map(t => t.power);

	if (!permPower.includes("admin") && !permPower.includes("mod")) {
		return message.channel.send('You dont have permission to use this...');
	}
	//Permission Check

	try {
		sequelize.sync().then(async () => {
			const shop = [
				CurrencyShop.destroy({ where: { name: args[0] } }),
			];
			await Promise.all(shop);
			console.log('Database synced');
			sequelize.close();
		}).catch(console.error);
	}
	catch (e) {
		if (e.name === 'SequelizeUniqueConstraintError') {
			return message.reply('That tag already exists.');
		}
		return message.reply('Something went wrong with adding a tag.');
	}
	},
};