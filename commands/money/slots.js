const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff')

module.exports = class SlotsCommand extends Command{
	constructor(client){
        super(client, {
            name: 'slots',
            memberName: 'slots',
            aliases: ['slot', 'gamble'],
            group: 'money',
            guildOnly: true,
            description: 'Commit Lose Your Money',
            usage: 'slots <$$$>',
            args: [
				{
                    key: 'bet',
                    prompt: 'Please provide a bet amount',
                    type: 'integer',  
                }
			],
        })
    }
	async run(message, { bet }) {
        function isNumeric(num){
			return !isNaN(num)
		}
        if(parseInt(currency.getBalance(message.author.id)) <  bet){
            return message.channel.send("You don't have that much to bet!")
        }
            
        if(!isNumeric(bet)){
            return message.channel.send('Umm, I need a number');
        }
        let rolls = [':moneybag:',':low_brightness:',':star:',':cherries:',':heart:',':game_die:']
        function choose(choices) {
            var index = Math.floor(Math.random() * choices.length);
            return choices[index];
        }
        let slot1 = choose(rolls);
        let slot1top = rolls.indexOf(slot1) - 1;
        let slot1bottom = rolls.indexOf(slot1) + 1;
        let slot2 = choose(rolls);
        let slot2top = rolls.indexOf(slot2) - 1;
        let slot2bottom = rolls.indexOf(slot2) + 1;
        let slot3 = choose(rolls);
        let slot3top = rolls.indexOf(slot3) - 1;
        let slot3bottom = rolls.indexOf(slot3) + 1;
        
        if(slot1 == ':moneybag:' ){slot1top = 5}
        if(slot2 == ':moneybag:' ){slot2top = 5}
        if(slot3 == ':moneybag:' ){slot3top = 5}
        if(slot1 == ':game_die:' ){slot1bottom = 0}
        if(slot2 == ':game_die:' ){slot2bottom = 0}
        if(slot3 == ':game_die:' ){slot3bottom = 0}


        message.channel.send(`╔════[SLOTS]════╗\n║   ${rolls[slot1top]}  ║  ${rolls[slot2top]}  ║  ${rolls[slot3top]}  ║\n>> ${slot1}   ║  ${slot2}  ║  ${slot3}  <<\n║   ${rolls[slot1bottom]}  ║  ${rolls[slot2bottom]}  ║  ${rolls[slot3bottom]}  ║\n╚════[SLOTS]════╝`)
        message.channel.send(`You bet $${bet} and you....`)
        if(slot1 == slot2 && slot2 == slot3){  
            message.channel.send(`Win! Your bet was doubled!\nYou gained $${bet*2}`)
            currency.add(message.author.id, bet*2);
        } 
        else if(slot1 == slot2 || slot2 == slot3){
            message.channel.send(`Got 2 in a row! I'll let you keep your money.\nYou lost $0`)
        }
        else if(slot1 == slot2 || slot2 == slot3 || slot1 == slot3){
            message.channel.send(`Got 2 out of 3! I'll go halfsies with ya. :stuck_out_tongue_winking_eye:\nYou lost $${bet/2}`)
            currency.add(message.author.id, -bet/2);
        }
        else {
            message.channel.send(`Lose! Bye bye money. :(\nYou lost $${bet}`)
            currency.add(message.author.id, -bet);
        }
	}
};
