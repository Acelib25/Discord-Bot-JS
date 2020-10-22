const Discord = require('discord.js');
const Sequelize = require('sequelize');
const ms = require("ms");

module.exports = {
	name: 'mute',
	usage: '-mute name/id reason length',
	guildOnly: true,
	description: 'mute someone',
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
        
        typeVal = "Mute"

        let warn = await Moderation.create({
            guild_id: message.guild.id,
            user_id: userVal,
            mod_id: message.author.id,
            time: pointVal,
            points: 5,
            type: typeVal,
            reason: reasonVal,
        });
    
        time = parseInt(pointVal) * 60000;
        timeString = `${time}`
        console.log(timeString)
        message.channel.send(`<@!${userVal}> You've been muted. Reason: \`${reasonVal}\` Time: \`${ms(ms(timeString))}\``)
        const mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        const mem = message.client.users.cache.get(userVal);
        const member = message.guild.member(mem)
        console.log(member)
        console.log(member.roles)
        member.roles.remove(mainRole)
        member.roles.add(muteRole);
        
        
        console.log(time)
        setTimeout(function(){
            Moderation.update({ reason: `${reasonVal}(EXPIRED)` }, { where: { user_id: userVal, reason: reasonVal } });
            member.roles.add(mainRole)
            member.roles.remove(muteRole);
            message.channel.send(`@${member.user.tag} has been unmuted.`)
        }, ms(timeString));
        
        
		
		
	}
};



