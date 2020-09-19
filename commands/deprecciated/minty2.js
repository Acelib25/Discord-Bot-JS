const Discord = require('discord.js');
const Intents = require('discord.js');
const Sequelize = require('sequelize');
let d = new Date();
module.exports = {
	name: 'minty2',
	description: 'Minty ver 2 using Sequelize',
	async execute(message, args, client) {
		const commandArgs = args.join(' ');
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
		
		switch(args[0]){
			case('addtag'):
				let splitArgs = commandArgs.split(' ');
				let tagName = splitArgs.shift();
				let tagDescription = splitArgs.join(' ');

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
			case('tag'):
				 tagName = commandArgs;

				// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
				tag = await Tags.findOne({ where: { name: tagName } });
				if (tag) {
					// equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
					tag.increment('usage_count');
					return message.channel.send(tag.get('description'));
				}
				return message.reply(`Could not find tag: ${tagName}`);
			case('edittag'):
				splitArgs = commandArgs.split(' ');
				tagName = splitArgs.shift();
				tagDescription = splitArgs.join(' ');

				// equivalent to: UPDATE tags (descrption) values (?) WHERE name='?';
				const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });
				if (affectedRows > 0) {
					return message.reply(`Tag ${tagName} was edited.`);
				}
				return message.reply(`Could not find a tag with name ${tagName}.`);
			case('taginfo'):
				tagName = commandArgs;

				// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
				tag = await Tags.findOne({ where: { name: tagName } });
				if (tag) {
					return message.channel.send(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
				}
				return message.reply(`Could not find tag: ${tagName}`);
			case('showtags'):
				// equivalent to: SELECT name FROM tags;
				let tagList = await Tags.findAll({ attributes: ['name'] });
				let tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
				return message.channel.send(`List of tags: ${tagString}`);
			case('removetag'):
				tagName = commandArgs;
				// equivalent to: DELETE from tags WHERE name = ?;
				const rowCount = await Tags.destroy({ where: { name: tagName } });
				if (!rowCount) return message.reply('That tag did not exist.');

				return message.reply('Tag deleted.');

		
		}
	},
};