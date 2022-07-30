const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { writelog } = require('../../acelogger');
const { execute } = require('../../old/tag');

module.exports = class PickupCommand extends Command {
	constructor(client){
        super(client, {
            name: 'pickup',
            memberName: 'pickup',
            aliases: ['bang'],
            group: 'standard',
            guildOnly: true,
            description: 'Get in someones pants. :wink:',
            usage: 'pickup <@user>',
            args: [
				{
                    key: 'username',
                    prompt: 'Please provide a mention or id',
                    type: 'string',
                    default: "none",  
                }
            ],
            throttling: {
                usages: 2,
                duration: 120
              }
        })
    }
	async run(message, { username }) {
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

        let taggedUser = message.mentions.users.first();
		if (!message.mentions.users.size) {
			try {
				const User = message.client.users.cache.get(username);
				if (User) { // Checking if the user exists.
					taggedUser = User // The user exists.
				} else {
					//message.channel.send("User not found.") // The user doesn't exists or the bot couldn't find him.
					taggedUser = "none"
				}
			}
			catch (error) {
				writelog(error);
				message.channel.send(`There was an error while killing someone \`${command.name}\`:\n\`${error.message}\``);
			}
		}
		else {
			
		}

        
        // Thanks Sov for the Variable name
        let lines = [
            'are you a cake cause I would take a bite :wink:',
            'damn are you a calcium supliment cause you make my bone strong.',
            'are you blue corn syrup? cuz I\'m having a Baja Blast.',
            'are you a pretzel, Cuz your twisted exactly how I like it',
        ]

        let out;
        if(taggedUser == 'none'){
            out = (`${message.author}, ${choose(lines)}`)

        } else {
            out = (`${message.author}: Hey ${taggedUser}, ${choose(lines)}`)
  
        }
        
        message.channel.send(out)
	}
};
