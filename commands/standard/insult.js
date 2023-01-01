const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { writelog } = require('../../acelogger');
const { execute } = require('../../old/tag');
const acelib = require('../../../aceslib.js');

module.exports = class SaltyCommand extends Command {
	constructor(client){
        super(client, {
            name: 'insult',
            memberName: 'insult',
            aliases: ['salt', 'roast'],
            group: 'standard',
            guildOnly: true,
            description: 'Make someone sad boi. :(',
            usage: 'insult <@user>',
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

        let out;
        if(taggedUser == 'none'){
            out = (`${message.author} you are a ${choose(acelib.salt.adjectives)} ${choose(acelib.salt.curses)} ${choose(acelib.salt.nouns)}${choose(acelib.salt.finishers)}!`)

        } else {
            out = (`${taggedUser} you are a ${choose(acelib.salt.adjectives)} ${choose(acelib.salt.curses)} ${choose(acelib.salt.nouns)}${choose(acelib.salt.finishers)}!`)
  
        }
        
        console.log(out)
        message.channel.send(out)
	}
};
