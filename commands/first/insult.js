const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { execute } = require('../../old/tag');

module.exports = class SaltyCommand extends Command {
	constructor(client){
        super(client, {
            name: 'insult',
            memberName: 'insult',
            aliases: ['salt', 'roast'],
            group: 'first',
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
				console.log(error);
				message.channel.send(`There was an error while killing someone \`${command.name}\`:\n\`${error.message}\``);
			}
		}
		else {
			
		}

        let adj = [
            "stupid", 
            "disgusting", 
            "putrid", 
            "lucid", 
            "haggard", 
            "dense", 
            "sub-par", 
            "terrible", 
            "lazy", 
            "idiot", 
            "profain", 
            "aggressive", 
            "desperate",
            "saggy"
        ]

        let curse = [
            "poo", 
            "fuck", 
            "shit", 
            "crap", 
            "bitch", 
            "ass", 
            "sack", 
            "idiot", 
            "ice", 
            "piss", 
            "bloated", 
            "turd",
            "cunt",
            "toe-sucking",
        ]

        let noun = [
            "nugget", 
            "ball", 
            "pole", 
            "wall", 
            "llama", 
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


        ]
        let out;
        if(taggedUser == 'none'){
            out = (`${message.author} you are a ${choose(adj)} ${choose(curse)} ${choose(noun)}!`)

        } else {
            out = (`${taggedUser} you are a ${choose(adj)} ${choose(curse)} ${choose(noun)}!`)
  
        }
        
        message.channel.send(out)
	}
};
