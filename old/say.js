const Discord = require('discord.js');
const { execute } = require('./tag');

module.exports = {
    name: 'say',
    aliases: ['simon', 'repeat'],
	async execute(message, args, client, currency, logger, Perms) {
        message.delete()
        argsProssesed = args.join(" ")
        //Permission Check
        permData = await Perms.findAll({ where: { guild_id: message.guild.id, user_id: message.author.id} });
        permPower = permData.map(t => t.power);

        if (!permPower.includes("admin") && !permPower.includes("super") && !permPower.includes("mod") && message.author.id != '344143763918159884') {
            return message.channel.send('You dont have permission to use this...');
        }
        //Permission Check
        
        message.channel.send(argsProssesed)
	},
};
