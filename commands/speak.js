const Discord = require('discord.js');
const fs = require('fs');
const { execute } = require('./tag');
var txtomp3 = require("text-to-mp3");

module.exports = {
    name: 'speak',
    aliases: ['vc'],
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
        
        const gTTS = require('gtts'); 
      
        var speech = argsProssesed; 
        var gtts = new gTTS(speech, 'en-us'); 
        
        gtts.save('audio.mp3', function (err, result){ 
            if(err) { throw new Error(err); } 
            logger.log("Text to speech converted!"); 
        }); 

        const fs = require('fs');
        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play('audio.mp3');

        dispatcher.on('start', () => {
        });
        
        dispatcher.on('finish', () => {
            connection.disconnect();
        });
	},
};
