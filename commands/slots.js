const Discord = require('discord.js');

module.exports = {
	name: 'slots',
    description: 'PLAY THE SLOTS!!!',
    cooldown: 3,
	async execute(message, args, client, currency, logger) {
        function isNumeric(num){
			return !isNaN(num)
		}
        if(parseInt(currency.getBalance(message.author.id)) <  parseInt(args[0])){
            message.channel.send("You don't have that much to bet!")
        }
        else{
            Reflect.defineProperty(currency, 'add', {
                /* eslint-disable-next-line func-name-matching */
                value: async function add(id, amount) {
                    const user = currency.get(id);
                    if (user) {
                        user.balance += Number(amount);
                        return user.save();
                    }
                    const newUser = await Users.create({ user_id: id, balance: amount });
                    currency.set(id, newUser);
                    return newUser;
                },
            });

            Reflect.defineProperty(currency, 'getBalance', {
                /* eslint-disable-next-line func-name-matching */
                value: function getBalance(id) {
                    const user = currency.get(id);
                    return user ? user.balance : 0;
                },
            });
            if(!isNumeric(args[0])){
				return message.channel.send('Umm, I need a number');
			}
            rolls = [':moneybag:',':low_brightness:',':star:',':cherries:',':heart:',':game_die:']
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
            message.channel.send(`You bet $${args[0]} and you....`)
            if(slot1 == slot2 && slot2 == slot3){  
                message.channel.send(`Win! Your bet was doubled!\nYou gained $${args[0]*2}`)
                currency.add(message.author.id, args[0]*2);
            } 
            else if(slot1 == slot2 || slot2 == slot3){
                message.channel.send(`Got 2 in a row! I'll let you keep your money.\nYou lost $0`)
            }
            else if(slot1 == slot2 || slot2 == slot3 || slot1 == slot3){
                message.channel.send(`Got 2 out of 3! I'll go halfsies with ya. :stuck_out_tongue_winking_eye:\nYou lost $${args[0]/2}`)
                currency.add(message.author.id, -args[0]/2);
            }
            else {
                message.channel.send(`Lose! Bye bye money. :(\nYou lost $${args[0]}`)
                currency.add(message.author.id, -args[0]);
            }
        }
	},
};
