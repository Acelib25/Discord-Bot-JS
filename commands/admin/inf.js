const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff')

module.exports = class InfList extends Command{
	constructor(client){
        super(client, {
            name: 'inf',
            memberName: 'inf',
            aliases: [],
            group: 'admin',
            guildOnly: true,
            description: 'View a persons sins',
            //userPermissions: ['KICK_MEMBERS'],
            usage: '-inf <@user>',
            args: [
				{
                    key: 'username',
                    prompt: 'Please provide a mention or id',
                    type: 'string',  
                },
                {
                    key: 'page',
                    prompt: 'Please provide a page number',
                    type: 'string',  
                    default: '0',
                }
			],
        })
    }
	async run(message, { username, page }) {
        let userVal = username;
        if (!message.mentions.users.size) {
			try {
                const User = message.client.users.cache.get(username);
				if (User) { // Checking if the user exists.
                    userVal = userVal // The user exists.
                }
			}
			catch (error) {
				console.error(error);
            }
        } else {
            userVal = message.mentions.users.first().id;
        }
        
        
        let infractions = await Moderation.findAll({ where: { guild_id: message.guild.id, user_id: userVal } })
        let userID = infractions.map(t => t.user_id)
        let infType = infractions.map(t => t.type)
        let infPoints = infractions.map(t => t.points)
        let infReason = infractions.map(t => t.reason)
        let infTime = infractions.map(t => t.time)
        
        let infList = []
        let infList2 = []
        let infList3 = []
        let infList4 = []
        let infList5 = []

        


        for (let i = 0; i < userID.length; i++){
            let mem = message.client.users.cache.get(userID[i]);
            let member = message.guild.member(mem);
            let warnMsg = `**User:** ${member.user.tag}\n**Type:** ${infType[i]} | **Points:** ${infPoints[i]}\n**Reason:** ${infReason[i]}`
            let muteMsg = `**User:** ${member.user.tag}\n**Type:** ${infType[i]} | **Time:** ${infTime[i]}\n**Reason:** ${infReason[i]}`

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
        
        switch(page){
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



