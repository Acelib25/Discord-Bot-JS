const Sequelize = require('sequelize');
const Discord = require('discord.js');
const { Users, CurrencyShop } = require('../../dbObjects.js');
const { Command } = require('discord.js-commando');
const main = require('../../bot.js')


module.exports = class UserInfo extends Command {
	constructor(client){
        super(client, {
            name: 'user',
            memberName: 'userinfo',
            aliases: ['userinfo', 'user-info'],
            group: 'standard',
            guildOnly: false,
            description: 'Display User Information',
            usage: 'username',
            args: [
				{
                    key: 'username',
                    prompt: 'Please provide a mention or id',
                    type: 'string',
                    default: "none",  
                }
			],
        })
    }
	async run(message, { username }) {
		const sequelize = new Sequelize('database', 'user', 'password', {
			host: 'localhost',
			dialect: 'sqlite',
			logging: false,
			// SQLite only
			storage: 'database.sqlite',
		});
		const Perms = sequelize.define('permisions', {
			guild_id: {
				type: Sequelize.STRING,
			},
			user_id: {
				type: Sequelize.STRING,
			},
			power: {
				type: Sequelize.STRING,
			},
		});
		var user = message.mentions.users.first();
		//like
		if (!message.mentions.users.size) {
			try {
				const User = message.client.users.cache.get(username);
				if (User) { // Checking if the user exists.
					user = User // The user exists.
				}
				else throw "empty"
			}
			catch(error) {
				if(error == "empty"){
					user = message.author
					console.log("Author user profile.")
				}
				
			}
		}
		//let stupid = currency.getBalance(user.id);

		//Permission Check
		let permData = await Perms.findAll({ where: { guild_id: message.guild.id, user_id: message.author.id} });
		let permPower = permData.map(t => t.power);
		//Permission Check

		const userEmbed = new Discord.MessageEmbed()
		.setColor('#00db45')
		.setTitle(`User Information`)
		//.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256}))
		.setImage(user.displayAvatarURL({ dynamic: true, size: 256 * 2}))
		.addFields(
		{ name: 'Username', value: user.username, inline: true},
		//{ name: 'Balance', value: `${stupid}💰`, inline: true},
		{ name: 'ID', value: user.id, inline: true},
		{ name: 'Tag', value: user.tag, inline: true },
		{ name: 'Is bot?', value: user.bot, inline: true },
		{ name: 'Power Level', value: permPower, inline: true },
		)
		.setTimestamp()

		console.log(user.displayAvatarURL({ dynamic: true}))
		message.embed(userEmbed);
	}
};