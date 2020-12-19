const Discord = require('discord.js')
const { Command } = require("discord.js-commando");
const Canvas = require('canvas');
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff')

module.exports = class SetPaintCommand extends Command {
	constructor(client){
        super(client, {
            name: 'setpaint',
            memberName: 'setimage',
            aliases: ['imgset'],
            group: 'standard',
            guildOnly: true,
            description: 'Make art',
            usage: 'setpaint ,url/attachment>',
            args: [
				{
                    key: 'url',
                    prompt: 'Please provide a image url',
                    type: 'string',
                    default: 'none'
                }
			],
        })
    }
	async run(message, { url }) {
        let image;
        
        try{
           let past = await AceStorage.findAll({
                where: {
                    value1key: 'User',
                    value2key: 'Image',
                    value1: message.author.id
                }
            }) 
            let pastArray = past.map(t => t.value1)
            if(pastArray.length > 0){
                for(let i = 0; i < pastArray.length; i++){
                    AceStorage.destroy({
                        where: {
                            value1key: 'User',
                            value2key: 'Image',
                            value1: message.author.id
                        }
                    })
                }
            }
        } catch(error){
            console.log(error)
        }
            
        
        
        if(url == 'none'){
            image = message.attachments.first().url
            message.channel.send("Setting image attachment")
        } else {
            image = url
            message.channel.send("Setting image URL")
        }        
        
        let beefIDK = AceStorage.create({
			guild_id: message.guild.id,
			value1key: 'User',
            value1: message.author.id,
            value2key: 'Image',
			value2: image
        });
        message.channel.send("Done")
        
    }
}