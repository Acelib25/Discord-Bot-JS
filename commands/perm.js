const Discord = require('discord.js');
const Sequelize = require('sequelize');

module.exports = {
	name: 'perm',
	usage: '-perm name/id super/mod/admin',
	guildOnly: true,
	description: 'perm someone',
	async execute(message, args, client, currency, logger, Perms) {
        
        if (!message.mentions.users.size) {
			try {
                const User = message.client.users.cache.get(args[0]);
				if (User) { // Checking if the user exists.
					userVal = args[0] // The user exists.
				} else {
					//message.channel.send("User not found.") // The user doesn't exists or the bot couldn't find him.
					taggedUser = "none"
				}
			}
			catch (error) {
				logger.info(error);
            }
        } else {
            userVal = message.mentions.users.first().id;
            logger.info(userVal)
        }
        
        const sequelize = new Sequelize('database', 'username', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
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
        
        //Permission Check
        permData = Perms.findAll({ where: { guild_id: message.guild.id, user_id: message.author.id} });
        permPower = permData.map(t => t.power);

        if (!permPower.includes("admin") && !permPower.includes("mod") && message.author,id != '344143763918159884') {
            return message.channel.send('You dont have permission to use this...');
        }
        //Permission Check



        let permAdd = await Perms.create({
            guild_id: message.guild.id,
            user_id: userVal,
            power: args[1].toLowercase(),
        });

        message.channel.send(`<@!${userVal}> You've been permed. You are now a ${args[1]}`)
        
        
		
		
	}
};



