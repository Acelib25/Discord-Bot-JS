const Discord = require('discord.js');
const { execute } = require('./tag');

module.exports = {
    name: 'botspeech',
    aliases: ['bs', 'speech', ''],
	async execute(nsfw, message, args) {
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

        safeMessage = [
            "|This is a message|",
            "Random message is random", 
            "Do the Ace", 
            "You are going to Brazil.", 
            "Shut up",
            "Your bones are wet.", 
            "You are now losing your kneecap privileges.", 
            "I am coming to fill your sinus with cement.", 
            "I am coming to fill your sinus with piss.", 
            "I will now invert your knees.",
            "Next time you shower leave your clothes on.", 
            "2 words, Carpeted Shower", 
            "Your toenails are now teeth.", 
            "Pasta Linguini"]
       
        nsfwMessage = [
            "I can say FUCK!",  
            "You are going in the jar.",
            "I can, and will, change your gender.", 
            "Nice Cock"]
        
        
        amount = randomInt(1, 100)

        if(args[0] == '!nsfw'){
            message.channel.send(choose(nsfwMessage))
            console.log('forced NSFW')
        }
        if(args[0] == '!safe'){
            message.channel.send(choose(safeMessage))
            console.log('forced Safe')
        }

        console.log(amount)
        switch(nsfw){
            case('true'):
                if(amount > 10 && amount < 15){
                    message.channel.send(choose(nsfwMessage))
                    console.log('nsfw 1')
                }
        
                if(amount > 80 && amount < 90){
                    message.channel.send(choose(safeMessage))
                    console.log('nsfw 2')
                }
            break;
            
            case('false'):
                if(amount > 10 && amount < 15){
                    message.channel.send(choose(safeMessage))
                    console.log('safe 1')
                }
        
                if(amount > 80 && amount < 85){
                    message.channel.send(choose(safeMessage))
                    console.log('safe 2')
                }
                break;
        }     
	},
};
