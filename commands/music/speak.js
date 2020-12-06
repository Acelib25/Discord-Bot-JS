const Discord = require('discord.js');
const fs = require('fs');
const Sequelize = require('sequelize');
const ytdl = require('ytdl-core');
const Youtube = require('simple-youtube-api');
const main = require('../../bot.js')
var txtomp3 = require("text-to-mp3");
const config = require('../../config.json')
const youtube = new Youtube(config.ytAPI_key)
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class VoiceCommand extends Command {
    constructor(client){
        super(client, {
            name: 'vc',
            memberName: 'vc',
            aliases: ['speak', 'voice'],
            group: 'music',
            guildOnly: true,
            description: 'For all your music needs UwU',
            usage: '',
            args: [
                {
                    key: 'query',
                    prompt: 'Please choose what to say',
                    type:'string',
                }
            ],
        })
    }
    songStart(queue, message) {
        console.log(queue)
        if(!queue[0].duration){
            let voiceChannel;
            queue[0].voiceChannel
            .join() // join the user's voice channel
            .then(connection => {

            let argsProssesed = queue[0].query
        
            const gTTS = require('gtts'); 
        
            var speech = argsProssesed; 
            var gtts = new gTTS(speech, 'en-us'); 
        
            gtts.save('audio.mp3', function (err, result){ 
                if(err) { throw new Error(err); } 
            }); 
            const dispatcher = connection
                .play(
                'audio.mp3'
                )
                .on('start', () => {
                message.guild.musicData.songDispatcher = dispatcher;
                dispatcher.setVolume(message.guild.musicData.volume);
                voiceChannel = queue[0].voiceChannel;
                // display the current playing song
                const videoEmbed = new MessageEmbed()
                    .setThumbnail(queue[0].thumbnail) // song thumbnail
                    .setColor('#e9f931')
                    .addField('Now Playing:', queue[0].title);
                if (queue[1]) videoEmbed.addField('Next Song:', queue[1].title);
                message.say(videoEmbed);
                return queue.shift();
                })
                .on('finish', () => {
                if (queue.length >= 1) {
                    return this.songStart(queue, message);
                } else {
                    message.guild.musicData.isPlaying = false;
                    return voiceChannel.leave();
                }
                })
                .on('error', e => {
                message.say('Cannot play song');
                message.guild.musicData.queue.length = 0;
                message.guild.musicData.isPlaying = false;
                message.guild.musicData.nowPlaying = null;
                console.error(e);
                return voiceChannel.leave();
                });
            })
            .catch(e => {
            console.error(e);
            return voiceChannel.leave();
            });
        } else {
            let voiceChannel;
            queue[0].voiceChannel
                .join() // join the user's voice channel
                .then(connection => {
                const dispatcher = connection
                    .play(
                    ytdl(queue[0].url)
                    )
                    .on('start', () => {
                    message.guild.musicData.songDispatcher = dispatcher;
                    dispatcher.setVolume(message.guild.musicData.volume);
                    voiceChannel = queue[0].voiceChannel;
                    // display the current playing song
                    const videoEmbed = new MessageEmbed()
                        .setThumbnail(queue[0].thumbnail) // song thumbnail
                        .setColor('#e9f931')
                        .addField('Now Playing:', queue[0].title)
                        .addField('Duration:', queue[0].duration);
                    if (queue[1]) videoEmbed.addField('Next Song:', queue[1].title);
                    message.say(videoEmbed);
                    return queue.shift();
                    })
                    .on('finish', () => {
                    if (queue.length >= 1) {
                        return this.songStart(queue, message);
                    } else {
                        message.guild.musicData.isPlaying = false;
                        return voiceChannel.leave();
                    }
                    })
                    .on('error', e => {
                    message.say('Cannot play song');
                    message.guild.musicData.queue.length = 0;
                    message.guild.musicData.isPlaying = false;
                    message.guild.musicData.nowPlaying = null;
                    console.error(e);
                    return voiceChannel.leave();
                    });
                })
                .catch(e => {
                console.error(e);
                return voiceChannel.leave();
                });
        }
        
    }
	async run(message, { query }) {
        message.delete()
        const voiceChannel = message.member.voice.channel;   
        if (!voiceChannel) {
            return message.channel.send("You need to be in a voice channel to play music!");
        };
        const title = `Text To Speech - ${message.author.username}`
        const thumbnail = message.author.displayAvatarURL
        const song = {
            title,
            thumbnail,
            voiceChannel,
            query,
            type: 'text',
          };

        message.guild.musicData.queue.push(song);
         
        if (message.guild.musicData.isPlaying == false) {
            message.guild.musicData.isPlaying = true;
            return this.songStart(message.guild.musicData.queue, message);
        } else if (message.guild.musicData.isPlaying == true) {
            return message.say(
              `TTS - ${query} has been added to queue`
            );
          }

	}
};
