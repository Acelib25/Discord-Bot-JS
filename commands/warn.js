const Discord = require('discord.js');
const Sequelize = require('sequelize');

module.exports = {
	name: 'warn',
	usage: '-warn name/id reason points',
	guildOnly: true,
	description: 'warn someone',
	async execute(message, args, client, currency, logger, Perms) {
        let userName = args[0].toLowerCase();
        let commandArgs = args.join(' ');
        let splitArgs = commandArgs.split(' ');
        let pointVal = splitArgs.pop();
		let userVal = splitArgs.shift();
        let reasonVal = splitArgs.join(' ');
        logger.info(pointVal)
        logger.info(userVal)
        logger.info(reasonVal)
        
        if (!message.mentions.users.size) {
			try {
                const User = message.client.users.cache.get(args[0]);
				if (User) { // Checking if the user exists.
					userName = User // The user exists.
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
        
        const Moderation = sequelize.define('moderate', {
            guild_id: {
                type: Sequelize.STRING,
            },
            user_id: {
                type: Sequelize.STRING,
            },
            mod_id: {
                type: Sequelize.STRING,
            },
            points: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            reason: {
                type: Sequelize.STRING,
            },
            time: {
                type: Sequelize.STRING,
            },
        });
        
        typeVal = "Warn"

        let warn = await Moderation.create({
            guild_id: message.guild.id,
            user_id: userVal,
            mod_id: message.author.id,
            points: pointVal,
            type: typeVal,
            reason: reasonVal,
        });

        message.channel.send(`<@!${userVal}> You've been warned. Reason: \`${reasonVal}\` Points: \`${pointVal}\``)
        
        
		
		
	}
};



