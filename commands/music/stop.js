const { Command } = require("discord.js-commando");

module.exports = class StopMusic extends Command {
	constructor(client){
        super(client, {
            name: 'stop',
            memberName: 'stop',
            aliases: ['leave', 'stopsong', 'fuckoff'],
            group: 'music',
            guildOnly: true,
            description: 'Stop everything',
            usage: '',
        })
    }
	run(message) {
		if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to stop the music!');
        
        message.member.voice.channel.leave()
        message.guild.musicData.queue = [];
        message.guild.musicData.songDispatcher.end();
        message.guild.musicData.isPlaying = false;
        
        
	}
};