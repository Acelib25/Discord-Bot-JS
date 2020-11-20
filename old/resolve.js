const Discord = require('discord.js');
const Sequelize = require('sequelize');

module.exports = {
	name: 'resolve',
	usage: '-resolve case-id',
	guildOnly: true,
	description: 'resolve case',
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
					userVal = userVal // The user exists.
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
            embed: {
                type: Sequelize.STRING,
            },
        });

        embedReason = await Moderation.findAll({ where: { id: pointVal }});
        embedReason2 = embedReason.map(t => t.reason);
        embedId = embedReason.map(t => t.embed)
        userID = embedReason.map(t => t.user_id)
        timeValue = embedReason.map(t => t.time)
        console.log(embedReason)
        console.log(embedReason2)
        modUser = message.guild.members.cache.get(message.author.id);
        moderator = message.guild.member(modUser).user;
        


        Moderation.update({ reason: `${embedReason2}(RESOLVED)` }, { where: { id: args[0] } });
        Moderation.update({ points: 0 }, { where: { id: args[0] } });
        let embedMessage = await client.guilds.cache.get('344146800942383104').channels.cache.get('766703230008688700').messages.fetch(embedId);
        trueMessageId = embedMessage.get(`${embedId}`)
        embedObj = trueMessageId.embeds[0]

        console.log(embedMessage)
        console.log(trueMessageId)
        console.log(embedObj)

        embedReasonUpdated = await Moderation.findAll({ where: { id: pointVal }});
        embedReasonUpdated2 = embedReasonUpdated.map(t => t.reason);
        embedMod2 = await Moderation.findAll({ where: { user_id: userID}});
        embedPoints = embedMod2.map(t => t.points)
        embedPointsTotal = embedPoints.reduce((a, b) => parseInt(a) + parseInt(b), 0)
        
        trueMessageId.edit(embedObj.setDescription(`**Case** ${pointVal}\n**Reason** ${embedReasonUpdated2}\n**Points** 0 | **Total** ${embedPointsTotal}\n**Time**: ${timeValue}\n **Embed_ID** ${embedId}`))
        
        
        message.channel.send(`Case: ${args[0]} resolved.`)
		
		
	}
};



