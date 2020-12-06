const { Command } = require("discord.js-commando");

module.exports = class NukeCommand extends Command {
	constructor(client){
        super(client, {
            name: 'nuke',
            memberName: 'nuke',
            aliases: ['kaboom'],
            group: 'first',
            guildOnly: true,
            description: 'Make someones brain **NONEXISTANT**',
            usage: 'nuke <@user>',
            args: [
				{
                    key: 'username',
                    prompt: 'Please provide a mention or id',
                    type: 'string',
                    default: "none",  
                }
			],
        })
    }
	async run(message, { username }) {
		var taggedUser = message.mentions.users.first();
		if (!message.mentions.users.size) {
			try {
				const User = message.client.users.cache.get(username);
				if (User) { // Checking if the user exists.
					taggedUser = User // The user exists.
				}
				else throw "empty"
			}
			catch(error) {
				if(error == "empty"){
					taggedUser = "none"
					console.log("Brucked empty user.")
				}
				
			}
		}
		if (message.author == taggedUser || taggedUser == "none") {
			message.channel.send(`${message.author} NUKED THEMSELVES\n https://tenor.com/view/explosion-nuke-boom-nuclear-gif-5791468 `)
		} 
		else {
			message.channel.send(`${message.author} NUKED ${taggedUser} THIS IS WAR!!!\n https://tenor.com/view/explosion-nuke-boom-nuclear-gif-5791468 `)
		}
	}
};
