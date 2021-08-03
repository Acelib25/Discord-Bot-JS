const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff');
const { writelog } = require('../../acelogger');
const Pagination = require('discord-paginationembed');

module.exports = class StatsCommand extends Command {
	constructor(client){
        super(client, {
            name: 'ambience',
            memberName: 'ambience',
            aliases: ['amb', 'mood'],
            group: 'settings',
            guildOnly: true,
            description: 'Set Ambience',
            usage: 'amb <true/false>',
            args: [
				{
                    key: 'option',
                    prompt: 'Set ambience to true(on) or false(off)',
                    type: 'boolean',
                }
			],

        })
    }
	async run(message, { option }) {
		let current = await AceStorage.findAll({ where: { guild_id: message.guild.id, value1key: "Ambience"}});
        if(option == true){
            if(current.length === 0){
                console.log("Make True");
                let setSetting = AceStorage.create({
                    guild_id: message.guild.id,
                    value1key: 'Ambience',
                    value1: true
                });
            } else {
                console.log("Update True");
                AceStorage.update({ value1: true }, { where: { guild_id: message.guild.id, value1key: "Ambience" } });
            }
            message.channel.send("Ambience turned on!")
        } else if (option == false){
            if(current.length === 0){
                console.log("Make False");
                let setSetting = AceStorage.create({
                    guild_id: message.guild.id,
                    value1key: 'Ambience',
                    value1: false
                });
            } else {
                console.log("Update False");
                AceStorage.update({ value1: false }, { where: { guild_id: message.guild.id, value1key: "Ambience" } });
            }
            message.channel.send("Ambience turned off!")
        } /* else {
            let storage = await AceStorage.findAll({ where: { guild_id: message.guild.id, value1key: "Ambience"}})
            let option = storage.map(t => t.value1);
            let guildID = storage.map(t => t.guild_id)

            const queueEmbed = new Pagination.FieldsEmbed()
                .setArray(option)
                .setAuthorizedUsers([message.author.id])
                .setChannel(message.channel)
                .setElementsPerPage(10)
                .formatField('Guild ID - Value', function(e) {
                    return `**${guildID[option.indexOf(e)]}**: ${option[e].toString().replace('0', 'Ambience Off').replace('1', 'Ambience On' )}`;
            });

            queueEmbed.embed.setColor('#ff7373').setTitle('Abience Values');
            queueEmbed.build();

        } */
        
        
	}
};

