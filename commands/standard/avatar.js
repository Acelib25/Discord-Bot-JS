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
                    prompt: 'Provide user id',
                    type:'string',
                    default: 'none'
                }
			],
        })
    }
	run(message, { id }) {
		var user = id
		try {
			const User = message.client.users.cache.get(id);
			if (User) { // Checking if the user exists.
				user = User // The user exists.
			}
			else throw "empty"
		}
		catch(error) {
			if(error == "empty"){
				user = message.author
			}
			
		}
		const avatarEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(`${user.username}'s avatar:`)
		.setURL(user.displayAvatarURL({ dynamic: true }))
		.setDescription('Users Avatar')
		.setImage(user.displayAvatarURL({ dynamic: true, size: 256 * 2}))
		.setTimestamp()

		message.channel.send(avatarEmbed);
	}
};
