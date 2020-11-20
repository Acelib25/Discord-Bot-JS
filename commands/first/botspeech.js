const Discord = require('discord.js');
const { Command } = require('discord.js-commando');


module.exports = class BotSpeech extends Command {
    constructor(client){
        super(client, {
            name: 'botspeech',
            memberName: 'botspeech',
            aliases: ['bs'],
            group: 'first',
            guildOnly: true,
            description: 'The bot speaks',
            usage: 'None',
            args: [
                {
                    key: 'mode',
                    prompt: 'Pick mode(nsfw, safe, ping, test)',
                    type:'string',
                    oneOf: ['nsfw', 'safe', 'ping', 'test'], 
                    default: 'safe',
                }
            ],
        })
    }
	async run(message, { mode }) {
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

        let testMessage = [
            "A little birdie told me you have never experienced Cock and Ball torture, **I AM HERE TO CHANGE THAT**"
        ]

        let safeMessage = [
            "|This is a message|",
            `What kind of idiot would say "${message.content}"? Oh ya ${message.author} would.`,
            "Time to twist your vertebrate",
            "Random message is random", 
            "Do the Ace", 
            "You are going to Brazil.", 
            "Shut up",
            "Your bones are wet.", 
            "You are now losing your kneecap privileges.", 
            "I am coming to fill your sinus with cement.", 
            "I am coming to fill your sinus with piss.", 
            "I will now invert your knees.",
            "Imagine showering with your clothes on.", 
            "2 words, Carpeted Shower", 
            "Your toenails are now teeth.", 
            "Pasta Linguini"]
        
        let pingMessage = [
            "Why did you ping me cuck?",
            "Just for that your vertabre are now frizbees",
            "Random message is random", 
            "**WHOMST SUMMONED ME.**", 
            "You are going to Brazil.", 
            "Shut up",
            "Your bones are wet.", 
            "You are now losing your kneecap privileges.",  
            "I am coming to fill your sinus with piss.", 
            "I will now invert your knees.",
            "Next time you shower leave your clothes on.",
            "I don't need to take this slander from someone who sucks toes. :eyes:",
            `What kind of idiot would say "${message.content}"? Oh ya ${message.author} would.`,  
            "Who ever pinged me, your face is ugly.",
            "I dont need to take this slander from someone who sucks toes. :eyes:"
        ]
       
        let nsfwMessage = [ 
            "You are going in the jar.",
            "I can, and will, change your gender.",
            "A little birdie told me you have never experienced Cock and Ball torture, **I AM HERE TO CHANGE THAT**", 
            "Nice Cock"]
        
        
        let amount = randomInt(1, 150)

        if(mode == 'nsfw'){
            let e = choose(nsfwMessage)
            message.channel.send(e)
            console.log(`AceJS said \'${e}\'`)
        }
        if(mode == 'safe'){
            let e = choose(safeMessage)
            message.channel.send(e)
            console.log(`AceJS said \'${e}\'`)
        }
        if(mode == 'test'){
            let e = choose(testMessage)
            message.channel.send(e)
            console.log(`AceJS said \'${e}\'`)
        }
        if (mode == "ping"){
            let e = choose(pingMessage)
            message.channel.send(e)
            console.log(`AceJS said \'${e}\'`)
        }     
	}
};
