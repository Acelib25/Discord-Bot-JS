const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const { writelog } = require('../../acelogger');
const { execute } = require('../../old/tag');

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
            
        ]

        let curse = [
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

        let finisher = [
            ' with dogshit ergonomics',
            ' with no life',
            ' that simps for e-girls',
            ' with no bitches',
            ' who even the grinch would find disgusting',
            ' with the guinness world record for ugliest person, if you could even be called human',
            ' who gets off sucking toes',
            ' who will forever be maidenless',
            ', honka honka :clown:',
            ', may you get no bitches',
            '. I hope both sides of your pillow are warm >:) ',
            '. I hope you step on a pile of legos >:) ',
            '. Someone call the tard wranglers cause this retard missed the short bus',
            '. Someone call a number 15 cause this guy is the new foot lettuce',
            ' with zero chance to get laid',
            ' who will die alone, and be buried as such',
            ' just making this insult for you was a waste of my time, and I spend most of my day doing nothing',
            ', just ask your mother when she gets come from the corner of whore and main',
            ', just ask your father, oh wait, he is still getting milk',
            ', I would compare you to a pile of green bricks, ugly, and useless',
            '. If I had hands I would rip your spine out your mouth',
            '. You look like you can suck a golf ball through a garden hose',
            '. Damn, God sneezed when he made you',
            '. Looks like you could suck the chrome off a trailer hitch',
            '. If being a loser was a competition you\'d come in second. Cause your a loser',
            ' and by the way, those female hormones won\'t cure male pattern baldness',
            '. What is your major malfunction, numb-nuts',
            '. Ding dong bitch the chicken in here',
            ', ding ding ding, retard alert, retard alert',
        ]

        let out;
        if(taggedUser == 'none'){
            out = (`${message.author} you are a ${choose(adj)} ${choose(curse)} ${choose(noun)}${choose(finisher)}!`)

        } else {
            out = (`${taggedUser} you are a ${choose(adj)} ${choose(curse)} ${choose(noun)}${choose(finisher)}!`)
  
        }
        
        console.log(out)
        message.channel.send(out)
	}
};
