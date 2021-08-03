const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff')

module.exports = class Cripple extends Command{
	constructor(client){
        super(client, {
            name: 'cripple',
            memberName: 'cripple',
            aliases: [],
            group: 'admin',
            guildOnly: true,
            description: 'Commit cripple',
            userPermissions: ['KICK_MEMBERS'],
            usage: 'username reason',
            ownerOnly: true,
            args: [
				{
                    key: 'username',
                    prompt: 'Please provide a mention or id',
                    type: 'user',  
                },
                {
                    key: 'command',
                    prompt: 'Please provide a command',
                    type: 'command',  
                },
                {
                    key: 'reason',
                    prompt: 'Please provide a reason',
                    type: 'string',
                    default: "none",  
                }
			],
        })
    }
    async check(){
        
    }
	async run(message, { username, command, reason}) {
        let pointVal = points
		let userVal = username
        let reasonVal = reason

        let typeVal = "cripple"

        let criple = await Moderation.create({
            guild_id: message.guild.id,
            user_id: userVal,
            mod_id: message.author.id,
            points: "0",
            type: typeVal,
            reason: `${reasonVal} | Command: ${command}`,
            embed: "failed",
            resolved: false,
        });
        let crip = await AceStorage.create({
            guild_id: message.guild.id,
            value1key: "crippledCommand",
            value1: command,
            value2key: "crippledUser",
            value2: username.id
        });

        message.channel.send(`<@!${userVal}> You've been crippled. Reason: \`${reasonVal}\` Command: \`${command}\``)

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
        .setTitle(`**cripleED**`)
        .setDescription(`**Case** ${trueCase}\n**Reason** ${reasonVal}\n**Points** 0 | **Total** ${embedPointsTotal}`)
		.setFooter(`${moderator.username}#${moderator.discriminator} (STAFF)`, moderator.avatarURL());
        
        let msg = await message.guild.channels.cache.get(targetID[0]).send(embed)

        msg.edit(embed.setDescription(`**Case** ${trueCase}\n**Reason** ${reasonVal}\n**Points** 0 | **Total** ${embedPointsTotal}\n **Embed_ID** ${msg.id}`))
        Moderation.update({ embed: msg.id }, { where: { user_id: userVal, reason: reasonVal, id: trueCase } });

		
		
	}
};



