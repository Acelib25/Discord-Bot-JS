const Discord = require('discord.js');
const ms = require("ms");
const { Command } = require('discord.js-commando');
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff');
const { writelog } = require('../../acelogger');

module.exports = class MuteCommand extends Command{
	constructor(client){
        super(client, {
            name: 'mute',
            memberName: 'mute',
            aliases: [],
            group: 'admin',
            guildOnly: true,
            description: 'Commit mute',
            userPermissions: ['KICK_MEMBERS'],
            usage: 'mute <@user> <time> <reason>',
            args: [
				{
                    key: 'username',
                    prompt: 'Please provide a mention or id',
                    type: 'user',  
                },
                {
                    key: 'timeAmmount',
                    prompt: 'Please provide a time value',
                    type: 'integer',  
                },
                {
                    key: 'reason',
                    prompt: 'Please provide a reason',
                    type: 'string',
                    default: "no reason",  
                }
			],
        })
    }
	async run(message, { username, timeAmmount, reason}) {
        let timeVal = timeAmmount
		let userVal = username
        let reasonVal = reason;
        
        if (!message.mentions.users.size) {
			try {
                const User = message.client.users.cache.get(username);
				if (User) { // Checking if the user exists.
					userVal = userVal // The user exists.
				} else {
					//message.channel.send("User not found.") // The user doesn't exists or the bot couldn't find him.
					taggedUser = "none"
				}
			}
			catch (error) {
				writelog(error, true);
            }
        } else {
            userVal = message.mentions.users.first().id;
        }
        
        let typeVal = "Mute"

        let mute = await Moderation.create({
            guild_id: message.guild.id,
            user_id: userVal,
            mod_id: message.author.id,
            time: timeVal,
            points: 5,
            type: typeVal,
            reason: reasonVal,
            embed: 'failed',
            resolved: false,
        });
    
        let time = parseInt(timeVal) * 60000;
        let timeString = `${time}`
        message.channel.send(`<@!${userVal}> You've been muted. Reason: \`${reasonVal}\` Time: \`${ms(ms(timeString))}\``)
        const mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        const mem = message.client.users.cache.get(userVal);
        const member = message.guild.member(mem)
        member.roles.remove(mainRole)
        member.roles.add(muteRole);


        let member2 = message.guild.members.cache.get(userVal);
        let user = message.guild.member(member2).user;


        let embedMod = await Moderation.findAll({ where: { user_id: userVal, reason: reasonVal,}});
        let embedMod2 = await Moderation.findAll({ where: { user_id: userVal}});
        
        let modUser = message.guild.members.cache.get(message.author.id);
        let moderator = message.guild.member(modUser).user;

        let caseVal = embedMod.map(t => t.id);
        let embedPoints = embedMod2.map(t => t.points)
        let embedPointsTotal = embedPoints.reduce((a, b) => parseInt(a) + parseInt(b), 0)

        let trueCase = Math.max(...caseVal)

        let storage = await AceStorage.findAll({ where: { guild_id: message.guild.id, value1key: "ModLogChannel"}})
        let targetID = storage.map(t => t.value1);


        const embed = new Discord.MessageEmbed()
        .setColor('#00a6ff')
        .setAuthor(`${user.username}#${user.discriminator} (${user.id})`, user.avatarURL())
        .setTitle(`**MUTED**`)
        .setDescription(`**Case** ${trueCase}\n**Reason** ${reasonVal}\n**Points** 5 | **Total** ${embedPointsTotal}\n**Time** ${ms(ms(timeString))}`)
		.setFooter(`${moderator.username}#${moderator.discriminator} (STAFF)`, moderator.avatarURL());
        
        let msg = await message.guild.channels.cache.get(targetID[0]).send(embed)
        msg.edit(embed.setDescription(`**Case** ${trueCase}\n**Reason** ${reasonVal}\n**Points** 5 | **Total** ${embedPointsTotal}\n**Time**: ${timeVal}\n **Embed_ID** ${msg.id}`))
        Moderation.update({ embed: msg.id }, { where: { user_id: userVal, reason: reasonVal, id: trueCase } });
        
        setTimeout(function(){
            Moderation.update({ reason: `${reasonVal}(EXPIRED)` }, { where: { user_id: userVal, reason: reasonVal, id: trueCase } });
            msg.edit(embed.setDescription(`**Case** ${trueCase}\n**Reason** ${reasonVal}\n**Points** 5 | **Total** ${embedPointsTotal}\n**Time**: ${timeVal} (EXPIRED, User Unmuted)\n **Embed_ID** ${msg.id}`))
            member.roles.add(mainRole)
            member.roles.remove(muteRole);
        }, ms(timeString));
        
        
		
		
	}
};



