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

module.exports = class SongCommand extends Command {
    constructor(client){
        super(client, {
            name: 'song',
            memberName: 'song',
            aliases: ['vcs', 'play'],
            group: 'music',
            guildOnly: true,
            description: 'For all your music needs UwU',
            usage: '',
            args: [
                {
                    key: 'query',
                    prompt: 'Please choose a song you would like to listen to',
                    type:'string',
                    validate: query => query.length > 0 && query.length < 200 
                }
            ],
        })
    }
    songStart(queue, message) {
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
    formatDuration(durationObj) {
        const duration = `${durationObj.hours ? durationObj.hours + ':' : ''}${
            durationObj.minutes ? durationObj.minutes : '00'
        }:${
            durationObj.seconds < 10
            ? '0' + durationObj.seconds
            : durationObj.seconds
            ? durationObj.seconds
            : '00'
        }`;
        return duration;
    }
    
    async run(message, { query }){
        const voiceChannel = message.member.voice.channel;   
        if (!voiceChannel) {
            return message.channel.send("You need to be in a voice channel to play music!");
        };  
        
        

        //https://tjrgg.github.io/simple-youtube-api/master/
        if (query.match( /^(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*$/)) 
        {
            try{
            const playlist = await youtube.getPlaylist(query);
            const videosObj = await playlist.getVideos();

            for (let i = 0; i < videosObj.length; i++) { 
                const video = await videosObj[i].fetch();
      
                const url = `https://www.youtube.com/watch?v=${video.raw.id}`;
                const title = video.raw.snippet.title;
                let duration = this.formatDuration(video.duration);
                const thumbnail = video.thumbnails.high.url;
                if (duration == '00:00') duration = 'Live Stream';
                const song = {
                  url,
                  title,
                  duration,
                  thumbnail,
                  voiceChannel,
                  type: 'music',
                };
      
                message.guild.musicData.queue.push(song);
            }
            if (message.guild.musicData.isPlaying == false) {
                message.guild.musicData.isPlaying = true;
                return this.songStart(message.guild.musicData.queue, message);
            } else if (message.guild.musicData.isPlaying == true) {
                return message.say(
                  `Playlist - ${playlist.title} has been added to queue`
                );
              }
            } catch (err) {
              console.error(err);
              return message.say('Playlist is either private or it does not exist');
            }
        }

        if (query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
            const url = query; // temp variable
            try {
              query = query
                .replace(/(>|<)/gi, '')
                .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
              const id = query[2].split(/[^0-9a-z_\-]/i)[0];
              const video = await youtube.getVideoByID(id);
              const title = video.title;
              let duration = this.formatDuration(video.duration);
              const thumbnail = video.thumbnails.high.url;
              if (duration == '00:00') duration = 'Live Stream';
              const song = {
                url,
                title,
                duration,
                thumbnail,
                voiceChannel,
                type: 'music',
              };
              message.guild.musicData.queue.push(song);
              if (
                message.guild.musicData.isPlaying == false ||
                typeof message.guild.musicData.isPlaying == 'undefined'
              ) {
                message.guild.musicData.isPlaying = true;
                return this.songStart(message.guild.musicData.queue, message);
              } else if (message.guild.musicData.isPlaying == true) {
                return message.say(`${song.title} added to queue`);
              }
            } catch (err) {
              console.error(err);
              return message.say('Something went wrong, please try again later');
            }
        }
        try {
        // search for the song and get 5 results back
        const videos = await youtube.searchVideos(query, 5);
        if (videos.length < 5) {
            return message.say(
            `I had some trouble finding what you were looking for, please try again or be more specific`
            );
        }
        const vidNameArr = [];
        // create an array that contains the result titles
        for (let i = 0; i < videos.length; i++) {
            vidNameArr.push(`${i + 1}: ${videos[i].title}`);
        }
        vidNameArr.push('exit'); // push 'exit' string as it will be an option
        // create and display an embed which will present the user the 5 results
        // so he can choose his desired result
        const embed = new MessageEmbed()
            .setColor('#e9f931')
            .setTitle('Choose a song by commenting a number between 1 and 5')
            .addField('Song 1', vidNameArr[0])
            .addField('Song 2', vidNameArr[1])
            .addField('Song 3', vidNameArr[2])
            .addField('Song 4', vidNameArr[3])
            .addField('Song 5', vidNameArr[4])
            .addField('Exit', 'exit'); // user can reply with 'exit' if none matches
        var songEmbed = await message.say({ embed });
        try {
            // wait 1 minute for the user's response
            var response = await message.channel.awaitMessages(
            msg => (msg.content > 0 && msg.content < 6) || msg.content === 'exit',
            {
                max: 1,
                maxProcessed: 1,
                time: 60000,
                errors: ['time']
            }
            );
            // assign videoIndex to user's response
            var videoIndex = parseInt(response.first().content);
        } catch (err) {
            console.error(err);
            songEmbed.delete();
            return message.say(
            'Please try again and enter a number between 1 and 5 or exit'
            );
        }
        // if the user responded with 'exit', cancel the command
        if (response.first().content === 'exit') return songEmbed.delete();
        try {
            // get video data from the API
            var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
            console.error(err);
            songEmbed.delete();
            return message.say(
            'An error has occured when trying to get the video ID from youtube'
            );
        }
        const url = `https://www.youtube.com/watch?v=${video.raw.id}`;
        const title = video.title;
        let duration = this.formatDuration(video.duration);
        const thumbnail = video.thumbnails.high.url;
            if (duration == '00:00') duration = 'Live Stream';
            const song = {
                url,
                title,
                duration,
                thumbnail,
                voiceChannel,
                type: 'music',
            };
    
            message.guild.musicData.queue.push(song);
    
            if (message.guild.musicData.isPlaying == false) {
            message.guild.musicData.isPlaying = true;
            songEmbed.delete(); // delete the selection embed
            this.songStart(message.guild.musicData.queue, message);
            } else if (message.guild.musicData.isPlaying == true) {
            songEmbed.delete();
            // add the song to queue if one is already playing
            return message.say(`${song.title} added to queue`);
            }
        } catch (err) {
        // if something went wrong when calling the api:
        console.error(err);
        if (songEmbed) {
            songEmbed.delete();
        }
        return message.say(
            'Something went wrong with searching the video you requested :('
        );
        }

        
        
        //Code for pulling saved playlist from user discord ID
        /*if (db.get(message.member.id) != null) {
        const userPlaylists = db.get(message.member.id).savedPlaylists;
        let found = false; 
        let location;  
        for (let i = 0; i < userPlaylists.length; i++) {
            if (userPlaylists[i].name == query) {
                found = true;
                location = i; 
            }
        }*/
}}