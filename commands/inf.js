const Discord = require('discord.js');
const Sequelize = require('sequelize');
const mute = require('./mute');

module.exports = {
	name: 'inf',
	usage: '-inf name/id',
	guildOnly: true,
	description: 'warn someone',
	async execute(message, args, client, currency, logger, Perms) {
        console.log(args)
        
        if (!message.mentions.users.size) {
			try {
                const User = message.client.users.cache.get(args[0]);
				if (User) { // Checking if the user exists.
					userVal = User.id // The user exists.
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
        
        infractions = await Moderation.findAll({ where: { guild_id: message.guild.id, user_id: userVal } })
        userID = infractions.map(t => t.user_id)
        infType = infractions.map(t => t.type)
        infPoints = infractions.map(t => t.points)
        infReason = infractions.map(t => t.reason)
        infTime = infractions.map(t => t.time)
        
        infList = []
        infList2 = []
        infList3 = []
        infList4 = []
        infList5 = []

        


        for (let i = 0; i < userID.length; i++){
            mem = message.client.users.cache.get(userID[i]);
            member = message.guild.member(mem);
            warnMsg = `**User:** ${member.user.tag}\n**Type:** ${infType[i]} | **Points:** ${infPoints[i]}\n**Reason:** ${infReason[i]}`
            muteMsg = `**User:** ${member.user.tag}\n**Type:** ${infType[i]} | **Time:** ${infTime[i]}\n**Reason:** ${infReason[i]}`

            if(infList.length >= 15){
                
                if(infList2.length >= 15){
                    
                    if(infList3.length >= 15){
                       
                        if(infList4.length >= 15){
                            if(infType[i] == "Mute"){infList5.push(muteMsg)}else{infList5.push(warnMsg)}
                        } else {
                            if(infType[i] == "Mute"){infList4.push(muteMsg)}else{infList4.push(warnMsg)}
                        }

                    } else {
                        if(infType[i] == "Mute"){infList3.push(muteMsg)}else{infList3.push(warnMsg)}
                    }

                } else {
                    if(infType[i] == "Mute"){infList2.push(muteMsg)}else{infList2.push(warnMsg)}
                } 

            } else{
                if(infType[i] == "Mute"){infList.push(muteMsg)}else{infList.push(warnMsg)}
            }
            
        }
        
        switch(args[1]){
            case('2'):
                message.channel.send(infList2.join('\n\n'))
                message.channel.send(`\n\n**Total inf: ${userID.length} | Page: 2/${Math.ceil(userID.length / 15)}**`)
                break;
            case('3'):
                message.channel.send(infList3.join('\n\n'))
                message.channel.send(`\n\n**Total inf: ${userID.length} | Page: 3/${Math.ceil(userID.length / 15)}**`)
                break;
            case('4'):
                message.channel.send(infList4.join('\n\n'))
                message.channel.send(`\n\n**Total inf: ${userID.length} | Page: 4/${Math.ceil(userID.length / 15)}**`)
                break;
            case('5'):
                message.channel.send(infList5.join('\n\n'))
                message.channel.send(`\n\n**Total inf: ${userID.length} | Page: 5/${Math.ceil(userID.length / 15)}**`)
                break;
            default:
                message.channel.send(infList.join('\n\n'))
                message.channel.send(`\n\n**Total inf: ${userID.length} | Page: 1/${Math.ceil(userID.length / 15)}**`)
                break;
        }
        
        
        

        
        
        
		
		
	}
};



