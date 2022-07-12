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
            usage: 'megainsult <@user>',
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
            var index = Math.floor(Math.random() * adj.length);
            arrayRemove(adj, choices[index])
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
            "saggy",
            'butt munching',
            'discount',
            'Kroger brand',
            'bargain bin',
            'yellow',
            'green',
            'pallid',
            'ghastly',
            'maidenless',
            'goldfish brained',
            'tit witted',
            'dog breathed',
            'protein lacking',
            'vertically challenged',
            'soot eating',
            'toaster licking',
            'fucking',
            'shit eating',
            'half brained',
            'half baked',
            'pint sized',
            'whorebagging',
            'grandma-shoving',
            'taxidermy tasting',
            'cat kicking',
            'ball busting ',
            'fictitious',
            "poo", 
            "fuck", 
            "shit", 
            "crap", 
            "bitch", 
            "ass", 
            "sack", 
            "idiotic", 
            "ice", 
            "piss", 
            "bloated", 
            "turd",
            "cunt",
            "toe-sucking",
            "dip-ass",
            'dipshit',
            'dryshite',
            'gobshite',
            'lardass',
            'soot eating',
            'gay',
            'mismatched',
            'simple',
            'lackluster',
            'lying',
            'lippy',
            'crab infested',
            'spider infested ',
            'vacant',
            'rickrolled',
            'short nosed ',
            'crusty',
            'shifty eyed',
            'talentless',
            'fatherless',
            'loveless',
            'loathsome',
            'spawn camping',
            'playdough brained',
            'scandalous',
            'piss soaked',       
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
            'finch fiddler',
            'dipshit',
            'ass-munch',
            'pygmy',
            'pile of used goods',
            'dumpster fire',
            'langer',
            'lickarse',
            'gombeen',
            'has-been, or should I say never-was',
            'sard',
            'lardo',
            'peen',
            'weeny',
            'crybaby bitch boi',
            'wankler',
            'wrinkle',
            'frisbee',
            'clown :clown:',
            'ring dingler',
            'kraft single',
            'lone fuck',
            'fuckler',
            'fuck nugget',
            'bitch brisket',
            'limp noodle',
            'foot lettuce',
            'flat fuck',
            'asshat',
            'dingle donkey',
            'dingle berry',
            'foot enthusiast',
            'wang dangler',
            'truck fucker',
            'milk drinker',
            'paint watcher ',
            'finger-er',
            'simpleton',
            'pimpledick',
            'imp',
            'whorebagger',
            'uncle fucker',
            'nit',
            'angler',
            'cornhole',
            'fictitious spider monkey',
            'factless baseball card',
            'green brick (Ask Ace)',
            'lightless lamp coil',
            'short stop',
            '90\'s reject',
            'voldemort',
            'deflated Beach ball',
            'wannabe dildo',
            'bulldozer',
            'pond scum',
            'spaz',
            'wrench',
            'used condom',
            'great honking fat lump',
            


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
