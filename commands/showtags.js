const Discord = require('discord.js');
const Intents = require('discord.js');
const Sequelize = require('sequelize');
let d = new Date();
module.exports = {
	name: 'showtags',
	description: 'show all tags',
	async execute(message, args, client, currency, logger, Perms) {
		const commandArgs = args.join(' ');
		logger.info(commandArgs)
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
		logger.info(splitArgs)
		logger.info(tagName)
		logger.info(tagDescription)

		// equivalent to: SELECT name FROM tags;
				let tagList = await Tags.findAll({ attributes: ['name'] });
				let tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
				return message.channel.send(`List of tags: ${tagString}`);
	},
};