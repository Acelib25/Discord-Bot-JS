const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const Sequelize = require('sequelize');

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
                    type: 'string',  
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
        
        typeVal = "Warn"

        let warn = await Moderation.create({
            guild_id: message.guild.id,
            user_id: userVal,
            mod_id: message.author.id,
            points: pointVal,
            type: typeVal,
            reason: reasonVal,
            embed: "failed"
        });

        message.channel.send(`<@!${userVal}> You've been warned. Reason: \`${reasonVal}\` Points: \`${pointVal}\``)

        member = message.guild.members.cache.get(userVal);
        user = message.guild.member(member).user;


        embedMod = await Moderation.findAll({ where: { user_id: userVal, reason: reasonVal,}});
        embedMod2 = await Moderation.findAll({ where: { user_id: userVal}});
        
        modUser = message.guild.members.cache.get(message.author.id);
        moderator = message.guild.member(modUser).user;

        caseVal = embedMod.map(t => t.id);
        embedPoints = embedMod2.map(t => t.points)
        embedPointsTotal = embedPoints.reduce((a, b) => parseInt(a) + parseInt(b), 0)
        trueCase = Math.max(...caseVal)

        const embed = new Discord.MessageEmbed()
        .setColor('#fffb00')
        .setAuthor(`${user.username}#${user.discriminator} (${user.id})`, user.avatarURL())
        .setTitle(`**WARNED**`)
        .setDescription(`**Case** ${trueCase}\n**Reason** ${reasonVal}\n**Points** ${pointVal} | **Total** ${embedPointsTotal}`)
		.setFooter(`${moderator.username}#${moderator.discriminator} (STAFF)`, moderator.avatarURL());
        
        msg = await client.guilds.cache.get('344146800942383104').channels.cache.get('766703230008688700').send(embed)
        msg.edit(embed.setDescription(`**Case** ${trueCase}\n**Reason** ${reasonVal}\n**Points** ${pointVal} | **Total** ${embedPointsTotal}\n **Embed_ID** ${msg.id}`))
        Moderation.update({ embed: msg.id }, { where: { user_id: userVal, reason: reasonVal, id: trueCase } });

		
		
	}
};



