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
            description: 'Spam Bruh',
            usage: '0-20',
            args: [
                {
                    key: 'amount',
                    prompt: 'How many times should I say Bruh? (1-20)',
                    type:'string',
                    validate: amount => amount > 0 && amount <= 20 
                }
            ],
            throttling: {
				usages: 1,
				duration: 120,
			},
        })
    }
	async run(message, { amount }) {
        let bruhMessage = []
        for (let i = 0; i < amount; i++){
            bruhMessage.push("Bruh")
        }
        
        message.say(bruhMessage.join('\n')) 
		
	}
};



