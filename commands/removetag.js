const Discord = require('discord.js');
const Intents = require('discord.js');
const Sequelize = require('sequelize');
let d = new Date();
module.exports = {
	name: 'removetag',
	description: 'Remove a tag',
	async execute(message, args, client, currency, logger) {
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

		tagName = commandArgs;
				// equivalent to: DELETE from tags WHERE name = ?;
				const rowCount = await Tags.destroy({ where: { name: tagName } });
				if (!rowCount) return message.reply('That tag did not exist.');

				return message.reply('Tag deleted.');
	},
};