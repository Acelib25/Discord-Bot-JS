const Discord = require('discord.js');
const Sequelize = require('sequelize');
const MafiaGameJS = require('./MafiaGame.js')

module.exports = {
	name: 'mkill',
	usage: '-mkill',
	description: 'Murder someone',
	execute(message, args, client, currency, logger, Perms) {
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
				console.log(error);
				message.channel.send(`There was an error while killing someone \`${command.name}\`:\n\`${error.message}\``);
			}
		}

		filter = m => (m.content != undefined);
        collector = message.channel.createMessageCollector(filter, { time: 30000 });
		message.channel.send(`You want me to kill ${taggedUser}...`)
		message.channel.send('Say **Y-E-S** to seal the deal >:D')        
        collector.on('collect', m => {
            if(m.content.toLowerCase().includes('yes')){
				console.log(`Collected ${m.content}`);
				collector.stop()
			}
			if(m.content.toLowerCase().includes('no')){
				message.channel.send(`Well then try again, I don't got all day. >:(`)
				console.log(`Collected ${m.content}`);
				collector.stop()
            }
        });

        collector.on('end', collected => {
			console.log(`Collected ${collected.size} items`);
			if(collected.toLowerCase().includes('yes')){
				
			}
        });
		
	}
};
