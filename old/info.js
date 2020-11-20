const fs = require('fs');
const Discord = require('discord.js');
const config = require('../config.json');
const package = require('../package.json')
const prefix = config.prefix;
module.exports = {
	name: 'info',
	usage: '-info',
	guildOnly: true,
	description: 'view bot info',
	async execute(message, args, client, currency, logger, Perms) {
		const infoEmbed = new Discord.MessageEmbed()
            .setColor('#00db45')
            .setTitle(`Bot Information`)
            .setURL("https://docs.google.com/document/d/1P7h1pMUhhTmC6Qpap5ySvC7QrkY9mJ1iRe6XIhle6_o/")
            //.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256}))
            .setImage(client.user.displayAvatarURL({ dynamic: true, size: 256 * 2}))
            .addFields(
                { name: 'Bot Name', value: client.user.username, inline: true},
                { name: 'Prefix', value: config.prefix, inline: true},
                { name: 'Creator', value: "Acelib25#2173", inline: true},
                { name: 'Version', value: package.version, inline: true},
                { name: 'Version Name', value: package.versionName, inline: true},
                { name: 'Description', value: package.description, inline: true},

            )
            .setTimestamp()
		message.channel.send(infoEmbed);
	}
};
