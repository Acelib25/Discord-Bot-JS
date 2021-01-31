const { Command } = require("discord.js-commando");
const fs = require('fs');
const { type } = require("os");
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame, Desc} = require('../../sqlStuff');

module.exports = class AddDescCommand extends Command {
	constructor(client){
        super(client, {
            name: 'adddesc',
            memberName: 'adddesc',
            aliases: ['adddescription', "add-desc"],
            group: 'standard',
            guildOnly: true,
            description: 'Secret codes?',
            usage: 'adddesc <term> <description>',
            args: [
				{
                    key: 'term',
                    prompt: 'Please provide a term, if the term is multiple words use %s for spaces',
                    type: 'string', 
                },
                {
                    key: 'type',
                    prompt: 'Please provide a type',
                    type: 'string', 
                },
                {
                    key: 'def',
                    prompt: 'Please provide a term definition',
                    type: 'string',
				}
			],

        })
    }
	async run(message, { term, def, type }) {
        term = term.toLowerCase()
        term = term.replace(/%s+/g, " ")
        let tag = await Desc.create({
            term: term,
            type: type,
            value: def,
            uses: 0,
        });
        return message.reply(`Description for ${tag.term} added.`);
	}
};
