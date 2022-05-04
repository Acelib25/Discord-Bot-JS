const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { writelog } = require('../../acelogger');
const { execute } = require('../../old/tag');

module.exports = class ComplimentCommand extends Command {
	constructor(client){
        super(client, {
            name: 'compliment',
            memberName: 'compliment',
            aliases: ['sugar', 'bake'],
            group: 'standard',
            guildOnly: true,
            description: 'Make someone happy boi. :)',
            usage: 'compliment <@user>',
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

        let adj = [
            "smart", 
            "sexy", 
            "tasty", 
            "lucid", 
            "hansome", 
            "beautiful", 
            "advanced", 
            "wonderful", 
            "productive", 
            "sharp", 
            "holy", 
            "kind", 
            "patient",
            "firm"
        ]

        let curse = [
            "cake", 
            "cuddle", 
            "chocolate", 
            "fudge", 
            "loving", 
            "thicc", 
            "hung", 
            "genius", 
            "cool", 
            "sweet", 
            "fluffy", 
            "cute",
            "yummy",
            "lollypop",
        ]

        let noun = [
            "nugget", 
            "ball",  
            "llama", 
            "dog", 
            "cat", 
            "donkey", 
            "cup", 
            "brain", 
            "mouse", 
            "butt", 
            "genius",
            "hat", 
            "head", 
            "pile", 
            'elf',
            'king',
            'queen',


        ]
        let out;
        let special = choose(curse)
        if(taggedUser == 'none' && special == 'hung'){
            out = (`${message.author} is a ${choose(adj)} ${special} ${choose(noun)}! Nice cock!`)
        } 
        else if(taggedUser != 'none' && special == 'hung'){
            out = (`${message.author} thinks ${taggedUser} is a ${choose(adj)} ${special} ${choose(noun)}! Nice Cock!`)
        }
        else if(taggedUser == 'none'){
            out = (`${message.author} is a ${choose(adj)} ${special} ${choose(noun)}!`)

        } else {
            out = (`${message.author} thinks ${taggedUser} is a ${choose(adj)} ${special} ${choose(noun)}!`)
  
        }
        
        message.channel.send(out)
	}
};
