const { Op } = require('sequelize');
const Discord = require('discord.js');
const { Users, CurrencyShop } = require('../dbObjects');
module.exports = {
	name: 'user',
	description: 'Display info about a user',
	aliases: ['user-info', 'userinfo'],
	async execute(message, args, client, currency, logger, Perms) {
		Reflect.defineProperty(currency, 'getBalance', {
			/* eslint-disable-next-line func-name-matching */
			value: function getBalance(id) {
				const user = currency.get(id);
				return user ? user.balance : 0;
			},
		});
		var user = message.mentions.users.first();
		if (!message.mentions.users.size) {
			try {
				const User = message.client.users.cache.get(args[0]);
				if (User) { // Checking if the user exists.
					user = User // The user exists.
				}
				else throw "empty"
			}
			catch(error) {
				if(error == "empty"){
					user = message.author
					logger.info("Author user profile.")
				}
				
			}
		}
		stupid = currency.getBalance(user.id);
		power = false;
		if (message.member.roles.cache.some(r => r.name === 'Admin') || message.member.roles.cache.some(r => r.name === 'Mod') || message.member.roles.cache.some(r => r.name === 'Ace-JS Admin')) {
            power = true;
		}
		const userEmbed = new Discord.MessageEmbed()
		.setColor('#00db45')
		.setTitle(`User Information`)
		//.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256}))
		.setImage(user.displayAvatarURL({ dynamic: true, size: 256 * 2}))
		.addFields(
		{ name: 'Username', value: user.username, inline: true},
		{ name: 'Balance', value: `${stupid}💰`, inline: true},
		{ name: 'ID', value: user.id, inline: true},
		{ name: 'Tag', value: user.tag, inline: true },
		{ name: 'Is bot?', value: user.bot, inline: true },
		{ name: 'Admin Commands?', value: power, inline: true },
		)
		.setTimestamp()

		logger.info(user.displayAvatarURL({ dynamic: true}))
		message.channel.send(userEmbed);
	},
};
