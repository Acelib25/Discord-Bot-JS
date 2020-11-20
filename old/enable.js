const Discord = require('discord.js');
const Sequelize = require('sequelize');

module.exports = {
	name: 'enable',
	usage: '-enable command',
	guildOnly: true,
	description: 'enables command in this guild',
	async execute(message, args, client, currency, logger, Perms) {
        const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		logger.info(message.member.roles.cache.map(role => role.name));
		logger.info(!message.member.roles.cache.some(role => role.name === 'Admin'))
		logger.info(!message.member.roles.cache.some(role => role.name === 'Mod'))
		logger.info(!message.member.roles.cache.some(role => role.name === 'Ace-JS Admin'))
		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}
		//Permission Check
        permData = await Perms.findAll({ where: { guild_id: message.guild.id, user_id: message.author.id} });
        permPower = permData.map(t => t.power);

        if (!permPower.includes("admin") && !permPower.includes("mod")) {
            return message.channel.send('You dont have permission to use this...');
        }
        //Permission Check
		
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



