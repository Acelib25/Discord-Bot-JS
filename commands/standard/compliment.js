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
            "firm",
            'soft',
            'pleasant',
            'hospitable',
            'comfy',
            'flashy',
            'ornate',
            'organized',
            'kinky',
            'fuck',
            'steamy',
            'poke-able',
            'curvy',
            'charismatic',
            'ribbed ',
            
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
            'squishy',
            'fun',
            'cuddly',
            'toothy',
            'saucy',
            'twinkly',
            'painted',
            'dorito',
            'pringle',
            'kinky',
            'fucking',
            'oreo',
            'sexy',
            'submissive and breedable',
            'moist',
            
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
            'Sweetheart',
            'social pleasure',
            'meepit',
            'sexy feepit',
            'pet',
            'llama',
            'wonder',
            'saucier',
            'glucose guardian',
            'cornucopia',
            'fuzzy wuzzy',
            'muse',
            'music box',
            'philanthropist',
            'bump',
            'lump',
            'light bulb',
            'chapstick',
            'lipstick',
            'cake',
            'torpedo',
            'fuck',
            'hot pocket',
            'bunny',
            'cookie',
            'docket',
            'princessa',
            'shredded cheese',
            'snack',
            'shrek',
            'cucumber',
            ':eggplant:',
            ':peach:',
            'smooth pebble',
            'sea glass',
            'pretty marble',
            'stained glass window',
            'grim reaper',
            'pixie',
            'bonus track',
            'homie',
            'early bird',
            'drippy brat',

            
            


        ]
        // Thanks Sov for the Variable name
        let moneyshot = [
            ', you are a certified pant precipitation facilitator.',
            ', fuck.',
            ', nice cock!',
            ', I\'m going balls deep.',
            ', you are a tall drink of water',
            ', Are you blue corn syrup? cuz I\'m having a Baja Blast.',
            ', Are you a pretzel, Cuz your twisted exactly how I like it',
        ]

        let out;
        let special = choose(curse)
        if(taggedUser == 'none' && special == 'hung'){
            out = (`${message.author} is a ${choose(adj)} ${special} ${choose(noun)}! Nice cock!`)
        } 
        else if(taggedUser != 'none' && special == 'hung'){
            out = (`${message.author} thinks ${taggedUser} is a ${choose(adj)} ${special} ${choose(noun)}${choose(moneyshot)}! Nice Cock!`)
        }
        else if(taggedUser == 'none'){
            out = (`${message.author} is a ${choose(adj)} ${special} ${choose(noun)}${choose(moneyshot)}!`)

        } else {
            out = (`${message.author} thinks ${taggedUser} is a ${choose(adj)} ${special} ${choose(noun)}${choose(moneyshot)}!`)
  
        }
        
        message.channel.send(out)
	}
};
