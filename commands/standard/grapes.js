let Discord = require('discord.js');
const util = require('util');
let config = require('../../config.json');
let fetch = require('node-fetch');
let { Command } = require('discord.js-commando');
let querystring = require('querystring');
const fs = require('fs');
const { writelog } = require('../../acelogger');

module.exports = class GrapesCommand extends Command {
        constructor(client) {
          super(client, {
            name: 'grapes',
            aliases: ['grape', "5050", 'sour', 'sweet'],
            group: 'standard',
            memberName: 'grapes',
            description: 'Is it sour or sweet',
            /*throttling: {
                usages: 5,
                duration: 120
              }*/
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
            "//SHOW CAT",
            "//DRAWGON",
            "//SHOW CAT",
            "//DRAWGON",
            "//RANDOM ART",
            "//DRAWGON",
            "//RANDOM ART",
            "//SHOW CAT",
            "//DRAWGON",
            "//SHOW CAT",
            "//DRAWGON",
            "//RANDOM ART",
            "//DRAWGON",
            "//RANDOM ART",
            "//SHOW CAT",
            "//DRAWGON",
            "//SHOW CAT",
            "//DRAWGON",
            "//RANDOM ART",
            "//DRAWGON",
            "//RANDOM ART", 
            "Pasta Linguini"]
        
        let msg = choose(leMessage)
        let embed;

        if(msg == "//SHOW CAT"){
            let { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
            let msgFile = file
            
            embed = new Discord.MessageEmbed()
            .setColor('#c6d757')
            .addFields(
            { name: 'Message', value: "Have a Cat"},
            )
            .attachFiles(msgFile)
            .setTimestamp();
        }
        else if(msg == "//DRAWGON"){
            let linkArray = fs
                .readdirSync('commands/commandAssets/drawgon')
            let linkf = linkArray[Math.floor(Math.random() * linkArray.length)];
            let link = 'commands/commandAssets/drawgon/' + linkf
            embed = new Discord.MessageEmbed()
            .setColor('#c6d757')
            .addFields(
            { name: 'Message', value: `My favorite artists... :D\nDrawgon | ${linkf}`},
            )
            .attachFiles(link)
            .setTimestamp();
        }
        
        else if(msg == "//RANDOM ART"){
            let linkArray = fs
                .readdirSync('commands/commandAssets/img')
            let linkf = linkArray[Math.floor(Math.random() * linkArray.length)];
            let link = 'commands/commandAssets/img/' + linkf
            writelog(link)
            embed = new Discord.MessageEmbed()
            .setColor('#c6d757')
            .addFields(
            { name: 'Message', value: linkf},
            )
            .attachFiles(link)
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
