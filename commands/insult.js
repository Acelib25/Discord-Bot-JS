const Discord = require('discord.js');
const { execute } = require('./tag');

module.exports = {
    name: 'insult',
    aliases: ['salt', 'roast'],
	async execute(message, args, client, currency, logger, Perms) {
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
				const User = message.client.users.cache.get(args[0]);
				if (User) { // Checking if the user exists.
					taggedUser = User // The user exists.
				} else {
					//message.channel.send("User not found.") // The user doesn't exists or the bot couldn't find him.
					taggedUser = "none"
				}
			}
			catch (error) {
				logger.info(error);
				message.channel.send(`There was an error while killing someone \`${command.name}\`:\n\`${error.message}\``);
			}
		}
		else {
			
		}

        adj = [
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

        curse = [
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
            "turd"
        ]

        noun = [
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
            "crack"
        ]
        
        out = (`${ message.mentions.users.first()} you are a ${choose(adj)} ${choose(curse)} ${choose(noun)}!`)

        message.channel.send(out)
	},
};
