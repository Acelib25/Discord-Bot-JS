const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const fs = require('fs');
const config = require("../../config.json")

module.exports = class ImageCap extends Command {
    constructor(client){
        super(client, {
            name: 'imagecap',
            memberName: 'imagecap',
            aliases: ['caption', 'cap'],
            group: 'ai',
            guildOnly: false,
            description: 'Caption a image',
            usage: 'cap <url or attachment>',
            args: [
				{
                    key: 'prompt',
                    prompt: 'Provide a url',
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
        let backup = false;
        let url = 'https://i.imgur.com/tFR5aq8.png';

        function acaiDesc(){
            const linkArray = fs
                .readFileSync('commands/commandAssets/acai.txt', 'utf8')
                .split('\n');
            const link = linkArray[Math.floor(Math.random() * linkArray.length)];
            return link
        }
        
        try {
            let chopped = prompt.match(/(<@(!)?[0-9]*>)+/g)
            chopped = chopped[0].match(/([0-9])+/g)
            prompt = prompt.replace(/(<@(!)?[0-9]*>)+/g, "/replaceme/")
            const User = message.client.users.cache.get(chopped[0]);
            console.log(User)
            if (User) { // Checking if the user exists.
                prompt = prompt.replace("/replaceme/", User.username) // The user exists.
            } else {
                // The user doesn't exists or the bot couldn't find him.
            }
        }
        catch (error) {
            console.log(error);
        }     
        const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

        deepai.setApiKey(config.deepai_key);
        
        
        let webhookClient;
        
        
        message.channel.send("Starting ACAI")
        try {
            let webhooks = await message.channel.fetchWebhooks();
            let webhookName = webhooks.map(t => t.name)
            if(webhookName.includes("ACAI")){
                let grapesIndex = webhooks.find(hook => hook.name === "ACAI")
                webhookClient = new Discord.WebhookClient(grapesIndex.id, grapesIndex.token);
                webhookClient.send("Captioning an image...", {
                    avatarURL: 'https://i.imgur.com/tFR5aq8.png',
                })
            } else {
                message.channel.createWebhook('ACAI', {
                    avatar: 'https://i.imgur.com/tFR5aq8.png',
                })
                .then(
                    webhookNew => webhookNew.send("Captioning an image...", {
                        avatarURL: 'https://i.imgur.com/tFR5aq8.png',
                    }),                          
                )
            }
        } 
        catch (error){
            console.log(error)
            if(error.message == 'Missing Permissions'){
                backup = true
            }
        }
        console.log(backup)
        if(prompt == 'none'){
            url = message.attachments.first().url
            if (backup == true){
                message.channel.send("Setting image attachment")
            } else {
                webhookClient.send("Setting image attachment")
            }
        } else {
            url = prompt
            if (backup == true){
                message.channel.send("Setting image URL")
            } else {
                webhookClient.send("Setting image URL")
            }
        }        

        var resp = await deepai.callStandardApi("neuraltalk", {
            image: url,
        });

        let final = resp.output
        const embed = {
            "color": 10027263,
            "timestamp": "2069-12-10T01:00:00",
            "thumbnail": {
              "url": "https://i.imgur.com/tFR5aq8.png"
            },
            "description": `\`\`\`${acaiDesc()}\`\`\``, 
            "image": {
                "url": url
            },
            "fields": [
              {
                "name": "Prompt",
                "value": url
              },
              {
                "name": "Result",
                "value": final
              }
            ]
        };
        if (backup == true){
            console.log("Tried")
            message.embed(embed)
        } else {
            webhookClient.send({
                avatarURL: 'https://i.imgur.com/tFR5aq8.png',
                embeds: [embed],
            })
        }
        

    }
    
}