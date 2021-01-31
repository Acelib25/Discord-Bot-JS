const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const fs = require('fs');
const { writelog } = require("../../acelogger");
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame, Desc} = require('../../sqlStuff');

module.exports = class DescCommand extends Command {
	constructor(client){
        super(client, {
            name: 'desc',
            memberName: 'desc',
            aliases: ['description', 'describe'],
            group: 'standard',
            guildOnly: true,
            description: 'Secret codes?',
            usage: 'desc <term>',
            args: [
				{
                    key: 'term',
                    prompt: 'Please provide a term to search',
                    type: 'string',
                    default: "none",  
				}
			],

        })
    }
	async run(message, { term }) {
        let query = term.toLowerCase()
        let preTag = await Desc.findAll({ where: { term: query } });
        let tag = preTag[Math.floor(Math.random() * preTag.length)]
            if (tag) {
                // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
                if(tag.get('uses') == 420){
                    writelog("420")
                } else {
                    tag.increment('uses')
                }
                let descEmbed; 
                if (tag.get("type") == "image"){
                    descEmbed = new Discord.MessageEmbed()
                    .setColor('#778e89')
                    .setTitle(`Describe ${query}`)
                    .setImage(tag.get('value'))
                    .addFields(
                        { name: 'Uses', value: tag.get('uses')},
                        )
                    .setTimestamp()
                } else {
                    descEmbed = new Discord.MessageEmbed()
                    .setColor('#778e89')
                    .setTitle(`Describe ${query}`)
                    .addFields(
                    { name: 'Description', value: tag.get('value')},
                    { name: 'Uses', value: tag.get('uses')},
                    )
                    .setTimestamp()
                }
                return message.embed(descEmbed);
            }
            return message.reply(`Could not find term: ${term}`);
        
	}
};
