const Discord = require('discord.js');
const Intents = require('discord.js');
const Sequelize = require('sequelize');
let d = new Date();
module.exports = {
	name: 'addtag',
	description: 'Add a tag',
	aliases: ['maketag', 'newtag'],
	async execute(message, args, client, currency, logger, Perms) {
		const commandArgs = args.join(' ');
		console.log(commandArgs)
		const sequelize = new Sequelize('database', 'user', 'password', {
			host: 'localhost',
			dialect: 'sqlite',
			logging: false,
			// SQLite only
			storage: 'database.sqlite',
		});
		const Tags = sequelize.define('tags', {
			name: {
				type: Sequelize.STRING,
				unique: true,
			},
			description: Sequelize.TEXT,
			username: Sequelize.STRING,
			usage_count: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
		});
		
		let splitArgs = commandArgs.split(' ');
		let tagName = splitArgs.shift();
		let tagDescription = splitArgs.join(' ');
		console.log(splitArgs)
		console.log(tagName)
		console.log(tagDescription)

		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			let tag = await Tags.create({
				name: tagName,
				description: tagDescription,
				username: message.author.username,
			});
			return message.reply(`Tag ${tag.name} added.`);
		}
		catch (e) {
			if (e.name === 'SequelizeUniqueConstraintError') {
				return message.reply('That tag already exists.');
			}
			return message.reply('Something went wrong with adding a tag.');
		}
			
	},
};