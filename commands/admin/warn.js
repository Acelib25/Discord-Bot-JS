const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff')

module.exports = class Warn extends Command{
	constructor(client){
        super(client, {
            name: 'warn',
            memberName: 'warn',
            aliases: [],
            group: 'admin',
            guildOnly: true,
            description: 'Commit Warn',
            userPermissions: ['KICK_MEMBERS'],
            usage: 'username reason points',
            args: [
				{
                    key: 'username',
                    prompt: 'Please provide a mention or id',
                    type: 'user',  
                },
                {
                    key: 'reason',
                    prompt: 'Please provide a reason',
                    type: 'string',
                    default: "none",  
                },
                {
                    key: 'points',
                    prompt: 'Please provide a point value',
                    type: 'integer',  
                }
			],
        })
    }
	async run(message, { username, reason, points}) {
        let pointVal = points
		let userVal = username
        let reasonVal = reason
        
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
				console.log(error);
            }
        } else {
            userVal = message.mentions.users.first().id;

        }
        
        
        let typeVal = "Warn"

        let warn = await Moderation.create({
            guild_id: message.guild.id,
            user_id: userVal,
            mod_id: message.author.id,
            points: pointVal,
            type: typeVal,
            reason: reasonVal,
            embed: "failed",
            resolved: false,
        });

        message.channel.send(`<@!${userVal}> You've been warned. Reason: \`${reasonVal}\` Points: \`${pointVal}\``)

        let member = message.guild.members.cache.get(userVal);
        let user = message.guild.member(member).user;


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
        .setColor('#fffb00')
        .setAuthor(`${user.username}#${user.discriminator} (${user.id})`, user.avatarURL())
        .setTitle(`**WARNED**`)
        .setDescription(`**Case** ${trueCase}\n**Reason** ${reasonVal}\n**Points** ${pointVal} | **Total** ${embedPointsTotal}`)
		.setFooter(`${moderator.username}#${moderator.discriminator} (STAFF)`, moderator.avatarURL());
        
        let msg = await message.guild.channels.cache.get(targetID[0]).send(embed)

        msg.edit(embed.setDescription(`**Case** ${trueCase}\n**Reason** ${reasonVal}\n**Points** ${pointVal} | **Total** ${embedPointsTotal}\n **Embed_ID** ${msg.id}`))
        Moderation.update({ embed: msg.id }, { where: { user_id: userVal, reason: reasonVal, id: trueCase } });

		
		
	}
};



