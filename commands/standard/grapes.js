const Discord = require('discord.js');
const config = require('../../config.json');
const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');
const querystring = require('querystring');

module.exports = class GrapesCommand extends Command {
        constructor(client) {
          super(client, {
            name: 'grapes',
            aliases: ['grape', "5050", 'sour', 'sweet'],
            group: 'standard',
            memberName: 'grapes',
            description: 'Is it sour or sweet',
            throttling: {
                usages: 2,
                duration: 120
              }
          });
        }
    async run(message) {
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

        let leMessage = [
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
            "Every bone you have is now spaghetti", 
            "2 words, Carpeted Shower", 
            "I will bruck you. :eyes:",
            "//SHOW CAT", 
            "Pasta Linguini"]
       
        let amount = randomInt(1, 100)
        
        let msg = choose(leMessage)
        let embed;

        if(msg == "//SHOW CAT"){
            const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
            let msgFile = file
            
            embed = new Discord.MessageEmbed()
            .setColor('#c6d757')
            .setTitle(`Grapes. will they be sour or sweet?`)
            .addFields(
            { name: 'Message', value: msg},
            )
            .attachFiles(msgFile)
            .setTimestamp();
        } 
        else {
            embed = new Discord.MessageEmbed()
            .setColor('#c6d757')
            .setTitle(`Grapes. will they be sour or sweet?`)
            .addFields(
            { name: 'Message', value: msg},
            )
            .setTimestamp();
        }

        let webhooks = await message.channel.fetchWebhooks();
        let webhookName = webhooks.map(t => t.name)
        let webhookClient;
        
        
        if(webhookName.includes("Grapes")){
            let grapesIndex = webhooks.find(hook => hook.name === "Grapes")
            webhookClient = new Discord.WebhookClient(grapesIndex.id, grapesIndex.token);
            webhookClient.send('', {
                avatarURL: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg',
                embeds: [embed],
            });
        } else {
            message.channel.createWebhook('Grapes', {
                avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg',
            })
            .then(
                webhookNew => webhookNew.send({
                    avatarURL: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg',
                    embeds: [embed],
                }),                          
            ); 
        }
        
        
	}
};
