const { Command } = require("discord.js-commando");

module.exports = class StopMusic extends Command {
	constructor(client){
        super(client, {
            name: 'shuffle',
            memberName: 'shuffle',
            aliases: ['mix'],
            group: 'music',
            guildOnly: true,
            description: 'Shuffle everything',
            usage: '',
            args: [
                {
                    key: 'query',
                    prompt: 'Please choose a song',
                    type:'string',
                    default: 'none',
                }
            ],
        })
    }
	run(message, { query }) {
		if (query !== 'none') {
            let reg = message.client.registry.commands
            let song = reg.get('song')
            song.run(message, { query:query, shuffle:true })
            return;
        } else {
            var voiceChannel = message.member.voice.channel;
            if (!voiceChannel)
            return message.reply(
                ':no_entry: Please join a voice channel and try again!'
            );

            if (voiceChannel.id !== message.guild.me.voice.channel.id) {
                message.reply(
                    `:no_entry: You must be in the same voice channel as the bot's in order to use that!`
                );
                return;
            }

            const queueStart = message.guild.musicData.queue;
            function shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }
            shuffle(queueStart)
            const queueShuffled = queueStart;
            message.guild.musicData.queue = [];
            for(let i = 0; i < queueShuffled.length; i++){
                message.guild.musicData.queue.push(queueShuffled[i]);
            }
            

            message.say(':slot_machine: Queue Shuffled!');
            
        }
    }
};