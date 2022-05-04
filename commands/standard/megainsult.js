const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { writelog } = require('../../acelogger');
const { execute } = require('../../old/tag');

module.exports = class MegaSaltyCommand extends Command {
	constructor(client){
        super(client, {
            name: 'megainsult',
            memberName: 'megainsult',
            aliases: ['megasalt', 'megaroast'],
            group: 'standard',
            guildOnly: true,
            description: 'Make someone very sad boi. :(',
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
        function arrayRemove(arr, value) { 
    
            return arr.filter(function(ele){ 
                return ele != value; 
            });
        }
        function isNumeric(num){
			return !isNaN(num)
		}
        function choose(choices) {
            var index = Math.floor(Math.random() * adj2.length);
            arrayRemove(adj2, choices[index])
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
            "stupid", 
            "disgusting", 
            "putrid", 
            "anime-loving", 
            "haggard", 
            "dense", 
            "sub-par", 
            "terrible", 
            "lazy", 
            "idiotic", 
            "profain",  
            "desperate",
            "saggy",
            "trap-fucking",
            "gay",
            "cock-sucking",
            "extra-chromosome-having",
            "never-touched-grass-before" 
        ]

        let adj2 = [
            "stupid", 
            "disgusting", 
            "putrid", 
            "anime-loving", 
            "haggard", 
            "dense", 
            "sub-par", 
            "terrible", 
            "lazy", 
            "idiotic", 
            "profain",  
            "desperate",
            "saggy",
            "trap-fucking",
            "gay",
            "cock-sucking",
            "extra-chromosome-having",
            "never-touched-grass-before" 
        ]


        let noun = [
            "bitch-nugget", 
            "dung-ball", 
            "slut-pole", 
            "wall", 
            "homosexual, llama", 
            "dog", 
            "cat", 
            "donkey", 
            "cup", 
            "brain", 
            "mouse", 
            "butt", 
            "idiot",
            "hat", 
            "head", 
            "pile", 
            "crack",
            'goblin',
            'consumer',
            'eater',
            'enjoyer',
            'simp',
            'slut',
            'bitch',
        ]



        let out;
        if(taggedUser == 'none'){
            out = (`${message.author} you are a ${choose(adj)}, ${choose(adj)}, ${choose(adj)}, ${choose(adj)}, ${choose(adj)}, ${choose(adj)}, ${choose(adj)}, ${choose(adj)}, ${choose(adj)}, ${choose(noun)}!`)

        } else {
            out = (`${taggedUser} you are a ${choose(adj)}, ${choose(adj)}, ${choose(adj)}, ${choose(adj)}, ${choose(adj)}, ${choose(adj)}, ${choose(adj)}, ${choose(adj)}, ${choose(adj)}, ${choose(noun)}!`)
  
        }
        
        message.channel.send(out)
	}
};
