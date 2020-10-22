const Discord = require('discord.js');
const Sequelize = require('sequelize');

module.exports = {
	name: 'disable',
	usage: '-disable command',
	guildOnly: true,
	description: 'disables command in this guild',
	async execute(message, args, client, currency, logger, Perms) {
        const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}
        
        //Permission Check
        permData = Perms.findAll({ where: { guild_id: message.guild.id, user_id: message.author.id} });
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
        
        if(args[0] == 'enable'){
            message.channel.send("That is **UNFIXABLE**, you cant re-enable enable since enable is DISABLED, so no. You can not disable enable.")
        } else{
            let disable = await Disabled.create({
                guild_id: message.guild.id,
                guild_name: message.guild.name,
                command: command.name,
            });
            message.channel.send(`Disabled: ${args[0]}`)
        }
        
		
		
	}
};



