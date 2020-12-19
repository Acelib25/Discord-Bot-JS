const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class BotReply extends Command{
    constructor(client){
        super(client, {
            name: 'botreply',
            memberName: 'botreply',
            aliases: [],
            group: 'standard',
            guildOnly: false,
            description: 'The bot replies',
            usage: 'None',
            args: [],
        })
    }
	async run(message) {
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
        
        function choose(choices) {
            var index = Math.floor(Math.random() * choices.length);
            return choices[index];
        }

        let e = choose(pingMessage)
        message.say(e)
        console.log(`AceJS said \'${e}\'`)
	}
};
