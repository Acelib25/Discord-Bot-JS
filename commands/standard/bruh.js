const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class BruhSpam extends Command {
	constructor(client){
        super(client, {
            name: 'bruh',
            memberName: 'bruh',
            aliases: [],
            group: 'standard',
            guildOnly: false,
            description: 'Bruh',
            usage: 'bruh',
            throttling: {
				usages: 1,
				duration: 120,
			},
        })
    }
	async run(message) {        
        message.say("Bruh") 
	}
};



