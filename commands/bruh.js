const Discord = require('discord.js');
const Sequelize = require('sequelize');
const mute = require('./mute');

module.exports = {
	name: 'bruh',
	usage: '-bruh number',
	guildOnly: true,
    description: 'bruh spam',
    cooldown: 60,
	async execute(message, args, client, currency, logger, Perms) {
        bruhAmount = args[0]

        if (bruhAmount > 20){
            return message.reply("Bruh amount too **HUGE** to run. 20 is my max.")
        }
        bruhMessage = []
        for (let i = 0; i < bruhAmount; i++){
            bruhMessage.push("Bruh")
        }
        
        message.channel.send(bruhMessage.join('\n'))
                
        
        
        

        
        
        
		
		
	}
};



