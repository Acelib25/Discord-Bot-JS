const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'grapes',
    aliases: ['grape', 'gs', 'grapespeech'],
	async execute(message, args, client, currency) {
        function isNumeric(num){
			return !isNaN(num)
		}
        function choose(choices) {
            var index = Math.floor(Math.random() * choices.length);
            return choices[index];
        }
        function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        leMessage = [
            "You look great today. :D",
            "Time to twist your vertebrate",
            "Random message is random", 
            "You look tasty. Yum.", 
            "You are going to Brazil.", 
            "Shut up",
            "Your bones are wet.", 
            "You are now losing your kneecap privileges.", 
            "I am coming to fill your sinus with cement.", 
            "I am coming to fill your sinus with piss.", 
            "I will now invert your knees.",
            "The mirror agrees with me. Your sexy. ;D", 
            "2 words, Carpeted Shower", 
            "I will bruck you.", 
            "Pasta Linguini"]
       
        amount = randomInt(1, 100)
        
        let webhooks = await message.channel.fetchWebhooks();
        let webhookName = webhooks.map(t => t.name)
        let webhookClient;
        
        const embed = new Discord.MessageEmbed()
            .setColor('#c6d757')
            .setTitle(`Grapes. will they be sour or sweet?`)
            .addFields(
            { name: 'Message', value: choose(leMessage)},
            )
            .setTimestamp();
        
        if(webhookName.includes("Grapes")){
            grapesIndex = webhooks.find(hook => hook.name === "Grapes")
            webhookClient = new Discord.WebhookClient(grapesIndex.id, grapesIndex.token);
            webhookClient.send('Uh idk what this does...', {
                avatarURL: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg',
                embeds: [embed],
            });
        } else {
            message.channel.createWebhook('Grapes', {
                avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg',
            })
            .then(
                webhookNew => webhookNew.send('Uh idk what this does...', {
                    avatarURL: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg',
                    embeds: [embed],
                }),                          
            ); 
        }
        
        
	},
};
