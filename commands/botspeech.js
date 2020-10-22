const Discord = require('discord.js');
const { execute } = require('./tag');

module.exports = {
    name: 'botspeech',
    aliases: ['bs', 'speech', ''],
	async execute(nsfw, message, args, logger, mode) {
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

        testMessage = [
            "A little birdie told me you have never experienced Cock and Ball torture, **I AM HERE TO CHANGE THAT**"
        ]

        safeMessage = [
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
        
        pingMessage = [
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
       
        nsfwMessage = [ 
            "You are going in the jar.",
            "I can, and will, change your gender.",
            "A little birdie told me you have never experienced Cock and Ball torture, **I AM HERE TO CHANGE THAT**", 
            "Nice Cock"]
        
        
        amount = randomInt(1, 150)

        if(args[0] == 'nsfw'){
            e = choose(nsfwMessage)
            message.channel.send(e)
            logger.info(`AceJS said \'${e}\'`)
        }
        if(args[0] == 'safe'){
            e = choose(safeMessage)
            message.channel.send(e)
            logger.info(`AceJS said \'${e}\'`)
        }
        if(args[0] == 'test'){
            e = choose(testMessage)
            message.channel.send(e)
            logger.info(`AceJS said \'${e}\'`)
        }
        if (mode == "ping"){
            e = choose(pingMessage)
            message.channel.send(e)
            logger.info(`AceJS said \'${e}\'`)
        }
        switch(nsfw){
            case('true2'):
                if(amount >= 10 && amount <= 12){
                    e = choose(nsfwMessage)
                    message.channel.send(e)
                    logger.info(`AceJS said \'${e}\'`)
                }
        
                if(amount >= 80 && amount <= 82){
                    e = choose(safeMessage)
                    message.channel.send(e)
                    logger.info(`AceJS said \'${e}\'`)
                }
            break;
            
            case('false'):
                if(amount >= 10 && amount <= 12){
                    e = choose(safeMessage)
                    message.channel.send(e)
                    logger.info(`AceJS said \'${e}\'`)
                }
        
                if(amount >= 80 && amount <= 82){
                    e = choose(safeMessage)
                    message.channel.send(e)
                    logger.info(`AceJS said \'${e}\'`)
                }
                break;
        }     
	},
};
