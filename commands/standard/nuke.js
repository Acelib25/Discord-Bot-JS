const { Command } = require("discord.js-commando");

module.exports = class NukeCommand extends Command {
	constructor(client){
        super(client, {
            name: 'nuke',
            memberName: 'nuke',
            aliases: ['kaboom'],
            group: 'standard',
            guildOnly: true,
            description: 'Make someones brain **NONEXISTANT**',
            usage: 'nuke <@user>',
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
		var taggedUser = username;
		if (message.author == taggedUser || taggedUser == "none") {
			message.channel.send(`${message.author} NUKED THEMSELVES\n https://tenor.com/view/explosion-nuke-boom-nuclear-gif-5791468 `)
		} 
		else {
			message.channel.send(`${message.author} NUKED ${taggedUser} THIS IS WAR!!!\n https://tenor.com/view/explosion-nuke-boom-nuclear-gif-5791468 `)
		}
	}
};
