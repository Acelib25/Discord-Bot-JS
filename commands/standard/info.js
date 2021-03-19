const fs = require('fs');
const Discord = require('discord.js');
const config = require('../../config.json');
const packageInfo = require('../../package.json');
const { Command } = require('discord.js-commando');
const prefix = config.prefix;
module.exports = class InfoCommand extends Command {
    constructor(client) {
      super(client, {
        name: 'info',
        aliases: ['version'],
        group: 'standard',
        memberName: 'info',
        description: 'Get Bot Info',
      });
    }
	async run(message) {
		const infoEmbed = new Discord.MessageEmbed()
            .setColor('#00db45')
            .setTitle(`Bot Website`)
            .setURL("https://theaceprogramer.wixsite.com/acejs")
            //.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256}))
            .setImage(this.client.user.displayAvatarURL({ dynamic: true, size: 256 * 2}))
            .addFields(
                { name: 'Bot Name', value: this.client.user.username, inline: true},
                { name: 'Prefix', value: message.guild.commandPrefix, inline: true},
                { name: 'Creator', value: "Acelib25#2173", inline: true},
                { name: 'Version', value: packageInfo.version, inline: true},
                { name: 'Version Name', value: packageInfo.versionName, inline: true},
                { name: 'Description', value: packageInfo.description},

            )
            .setTimestamp()
		message.channel.send(infoEmbed);
	}
};
