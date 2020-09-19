const Discord = require('discord.js');
const Sequelize = require('sequelize');

module.exports = {
	name: 'enable',
	usage: '-enable command',
	guildOnly: true,
	description: 'enables command in this guild',
	async execute(message, args, client) {
        const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		console.log(message.member.roles.cache.map(role => role.name));
		console.log(!message.member.roles.cache.some(role => role.name === 'Admin'))
		console.log(!message.member.roles.cache.some(role => role.name === 'Mod'))
		console.log(!message.member.roles.cache.some(role => role.name === 'Ace-JS Admin'))
		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}
		
		if (!message.member.roles.cache.some(r => r.name === 'Admin') && !message.member.roles.cache.some(r => r.name === 'Mod') && !message.member.roles.cache.some(r => r.name === 'Ace-JS Admin')) {
            return message.channel.send('You dont have permission to use this...');
		}
		
        const sequelize = new Sequelize('database', 'username', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            storage: 'database.sqlite',
        });
        const Disabled = sequelize.define('disabled', {
			guild_id: {
				type: Sequelize.STRING,
            },
            guild_name: {
                type: Sequelize.STRING,
            },
			command: {
                type: Sequelize.STRING,
            },
        });
        
        let disable = await Disabled.destroy({ where: { guild_id: message.guild.id, command: command.name } });
		message.channel.send(`Enabled: ${args[0]}`)
		
	}
};



