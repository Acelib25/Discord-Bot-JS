const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff')


module.exports = class ResolveCommand extends Command{
	constructor(client){
        super(client, {
            name: 'resolve',
            memberName: 'resolve',
            aliases: [],
            group: 'admin',
            guildOnly: true,
            description: 'Commit Resolve',
            userPermissions: ['KICK_MEMBERS'],
            usage: 'case reason',
            args: [
				{
                    key: 'resolvecase',
                    prompt: 'Please provide a case id',
                    type: 'integer',  
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
	async run(message, { resolvecase, reason }) {
		let caseVal = resolvecase
        let reasonVal = reason
        
        let embedReason = await Moderation.findAll({ where: { id: caseVal }});
        let embedReason2 = embedReason.map(t => t.reason);
        let embedId = embedReason.map(t => t.embed)
        let userID = embedReason.map(t => t.user_id)
        let timeValue = embedReason.map(t => t.time)
        let isResolved = embedReason.map(t => t.resolved)
        if(isResolved[0] == 1){
            return message.reply("Case already resolved...")
        }
        let modUser = message.guild.members.cache.get(message.author.id);
        let moderator = message.guild.member(modUser).user;
        let storage = await AceStorage.findAll({ where: { guild_id: message.guild.id, value1key: "ModLogChannel"}})
        let targetID = storage.map(t => t.value1);


        Moderation.update({ points: 0 }, { where: { id: caseVal } });
        Moderation.update({ resolved: true }, { where: { id: caseVal } });
        let embedMessage = await message.guild.channels.cache.get(targetID[0]).messages.fetch(embedId);
        let trueMessageId = embedMessage.get(`${embedId}`)
        
        let embedObj = trueMessageId.embeds[0]
        let embedReasonUpdated = await Moderation.findAll({ where: { id: caseVal }});
        let embedReasonUpdated2 = embedReasonUpdated.map(t => t.reason);
        let embedMod2 = await Moderation.findAll({ where: { user_id: userID}});
        let embedPoints = embedMod2.map(t => t.points)
        let embedPointsTotal = embedPoints.reduce((a, b) => parseInt(a) + parseInt(b), 0)
        
        trueMessageId.edit(embedObj.setDescription(`**Case** ${caseVal}\n**Reason** ${embedReasonUpdated2}\n**Points** 0 | **Total** ${embedPointsTotal}\n**Time**: ${timeValue}\n **Embed_ID** ${embedId}\n**Resolve Reason** ${reasonVal}`))
        trueMessageId.edit(embedObj.setTitle(`${embedObj.title}(RESOLVED)`))
        
        message.channel.send(`Case: ${caseVal} resolved. Reason: ${reasonVal}`)
		
		
	}
};



