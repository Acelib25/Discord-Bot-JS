const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(message, args, client, currency, logger) {
		message.channel.send("Pinging...")
		.then(message.channel.bulkDelete(1, true))
		.then(m =>{
			// The math thingy to calculate the user's ping
			var ping = m.createdTimestamp - message.createdTimestamp;

			// Basic embed
			var embed = new Discord.MessageEmbed()
			.setAuthor(`Pong!\nYour ping is ${ping} ms`)
			.setThumbnail('https://i.imgur.com/kEgZhdE.png')
			.setColor('#34eb55')
            
			// Then It Edits the message with the ping variable embed that you created
			m.edit(embed)
		 });
	},
};
