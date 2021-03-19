const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class Avatar extends Command {
    constructor(client){
        super(client, {
            name: 'avatar',
            memberName: 'avatar',
            aliases: ['pfp'],
            group: 'standard',
            guildOnly: false,
            description: 'View users profile picture',
            usage: '<mention or id>',
            args: [
				{
                    key: 'id',
                    prompt: 'Provide user',
                    type:'user',
                    default: 'none'
                }
			],
			throttling: {
				usages: 2,
				duration: 120
			  }
        })
    }
	run(message, { id }) {
		const avatarEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(`${id.username}'s avatar:`)
		.setURL(id.displayAvatarURL({ dynamic: true }))
		.setDescription('Users Avatar')
		.setImage(id.displayAvatarURL({ dynamic: true, size: 256 * 2}))
		.setTimestamp()

		message.channel.send(avatarEmbed);
	}
};
