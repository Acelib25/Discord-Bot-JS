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
const tts = require('google-translate-tts');

module.exports = class VoiceCommand extends Command {
    constructor(client){
        super(client, {
            name: 'vc',
            memberName: 'vc',
            aliases: ['speak', 'voice', "tts"],
            group: 'music',
            guildOnly: true,
            description: 'For if you have no voice.',
            usage: '',
            args: [
                {
                    key: 'query',
                    prompt: 'Please choose what to say',
                    type:'string',
                    //validate: query => query.length > 0 && query.length <= 200,
                }
            ],
        })
    }
    
	run(message, { query }) {
        message.delete()
        function songStart(queue, message) {
            if(!queue[0].duration){
                let voiceChannel;
                queue[0].voiceChannel
                .join() // join the user's voice channel
                .then(connection => {
    
                let argsProssesed = queue[0].query
            
                /*const gTTS = require('gtts'); 
            
                var speech = argsProssesed; 
                var gtts = new gTTS(speech, 'en-us'); 
            
                gtts.save('audio.mp3', function (err, result){ 
                    if(err) { throw new Error(err); } 
                });*/
                const saveFile = async ()  => {
                    const buffer = await tts.synthesize({
                        text: argsProssesed,
                        voice: 'en-US',
                        slow: false // optional
                    });
                
                    fs.writeFileSync('audio.mp3', buffer);
                };
                
                saveFile().then( () => { 
                    const dispatcher = connection
                    .play('audio.mp3')
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
                        return songStart(queue, message);
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
            })
            } else {
                let voiceChannel;
                queue[0].voiceChannel
                    .join() // join the user's voice channel
                    .then(connection => {
                    const dispatcher = connection
                        .play(
                        ytdl(queue[0].url, {filter: 'audio', quality: 'highestaudio'})
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
        const voiceChannel = message.member.voice.channel;   
        if (!voiceChannel) {
            return message.channel.send("You need to be in a voice channel to play music!");
        };
        function addQueue(textArray, func){
            const title = `Text To Speech - ${message.author.username}`
            const thumbnail = message.author.displayAvatarURL
            const query = textArray;
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
                return songStart(message.guild.musicData.queue, message);
            } else if (message.guild.musicData.isPlaying == true) {
                return message.say(
                `TTS - ${message.author.username} has been added to queue`
                );
            }
        }
        let final = []
        let rem = false;
        let qSplit = query.split(' ');
        function assemble(){
            let current = 0;
            let text = [];
            let startLen = qSplit.length;
            for(let i = 0; i < startLen; i++){
                let lenStart = qSplit[0];
                if(lenStart == undefined){
                    break
                }
                let len = lenStart.length;
                if(current + len > 150){
                    final.push(text.join(' '))
                    rem = true;
                    assemble()
                }
                current += len;
                text.push(qSplit.shift())
            }
            final.push(text.join(' '))
        }
        assemble()
        if(rem){
            final.pop()
            message.say("Your message was too long so its being split in to multiple messages.")
        }
        for(let i = 0; i < final.length; i++){
            addQueue(final[i])
        }

         
        

	}
};
