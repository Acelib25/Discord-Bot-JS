const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const fs = require('fs');
const config = require("../../config.json")

module.exports = class MakeAIMS extends Command {
    constructor(client){
        super(client, {
            name: 'makeaims',
            memberName: 'makeaims',
            aliases: ['makeaims', 'aims', 'ask','mka'],
            group: 'aims',
            guildOnly: true,
            description: 'Ask a AIMS question',
            usage: 'aims',
            args: [
				{
                    key: 'prompt',
                    prompt: 'Provide data',
                    type: 'string',
                    default: "none"
                }
			],
			throttling: {
				usages: 5,
				duration: 120
			  }
        })
    }
	async run(message, { prompt }) {
        
        message.send(prompt)

    }
    
}