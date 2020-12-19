const { Command } = require("discord.js-commando");

module.exports = class BruckCommand extends Command {
	constructor(client){
        super(client, {
            name: 'bruck',
            memberName: 'bruck',
            aliases: [],
            group: 'standard',
            guildOnly: true,
            description: 'Make someones brain **Smooth**',
            usage: 'bruck <@user>',
            args: [
				{
                    key: 'username',
                    prompt: 'Please provide a mention or id',
                    type: 'user',
                    default: "none",  
				}
			],
			throttling: {
				usages: 1,
				duration: 60,
			},
        })
    }
	async run(message, { username }) {
	var taggedUser = username

		if (taggedUser == "none") {
			message.channel.send(`Bruck.\n https://cdn.discordapp.com/attachments/722116072324595792/743349672034172998/bruck.jpg `)
		}
		else if (taggedUser == message.author) {
			console.log(`${message.author} brucked themself. What a dumbass.`)
			message.channel.send(`${message.author} brucked themself. What a dumbass.\n https://cdn.discordapp.com/attachments/722116072324595792/743349672034172998/bruck.jpg `)
		}
		else {
			console.log(`${message.author} brucked ${taggedUser}. Their brain is now smooth.`)
			message.channel.send(`${message.author} brucked ${taggedUser}. Their brain is now smooth.\n https://cdn.discordapp.com/attachments/722116072324595792/743349672034172998/bruck.jpg `)
		}
	}
};

