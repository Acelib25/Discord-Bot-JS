const Discord = require('discord.js');
const fs = require('fs');
const Sequelize = require('sequelize');
const { execute } = require('./tag');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'song',
    aliases: ['vcs'],
	async execute(message, args, client, currency, logger, Perms, queue) {
        message.delete()
        
        argsProssesed = args.join(" ")
        //Permission Check
        permData = await Perms.findAll({ where: { guild_id: message.guild.id, user_id: message.author.id} });
        permPower = permData.map(t => t.power);

        if (!permPower.includes("admin") && !permPower.includes("super") && !permPower.includes("mod") && message.author.id != '344143763918159884') {
            return message.channel.send('You dont have permission to use this...');
        }
        //Permission Check
        
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel){
            return message.channel.send("You need to be in a voice channel to play music!");
        }
                
        const serverQueue = queue.get(message.guild.id);
        
        const sequelize = new Sequelize('database', 'user', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            // SQLite only
            storage: 'database.sqlite',
        });
        const Tags = sequelize.define('tags', {
            name: {
                type: Sequelize.STRING,
                unique: true,
            },
            description: Sequelize.TEXT,
            username: Sequelize.STRING,
            usage_count: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false,
            },
        });

        if (args[0] == 'skip'){
            skip(message, serverQueue);
            return;
        }
        else if (args[0] == 'stop'){
          stop(message, serverQueue);
          return;
        }
   
        const songInfo = await ytdl.getInfo(args[0]);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
        };

        if (!serverQueue) {
            const queueContruct = {
              textChannel: message.channel,
              voiceChannel: voiceChannel,
              connection: null,
              songs: [],
              volume: 5,
              playing: true
            };
        
        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);


        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
            } catch (err) {
            logger.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
            }
        } else {
            serverQueue.songs.push(song);
            return message.channel.send(`${song.title} has been added to the queue!`);
        }
        
        function skip(message, serverQueue) {
          if (!message.member.voice.channel)
            return message.channel.send(
              "You have to be in a voice channel to stop the music!"
            );
          if (!serverQueue)
            return message.channel.send("There is no song that I could skip!");
          serverQueue.connection.dispatcher.end();
        }
        

        function stop(message, serverQueue) {
          if (!message.member.voice.channel)
            return message.channel.send(
              "You have to be in a voice channel to stop the music!"
            );
          serverQueue.songs = [];
          serverQueue.connection.dispatcher.end();
        }


        function play(guild, song) {
            const serverQueue = queue.get(guild.id);
            if (!song) {
              serverQueue.voiceChannel.leave();
              client.user.setActivity('your commands.', { type: 'LISTENING' });
              queue.delete(guild.id);
              return;
            }
          
            const dispatcher = serverQueue.connection
              .play(ytdl(song.url))
              .on("finish", () => {
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
              })
              .on("error", error => console.error(error));
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
            serverQueue.textChannel.send(`Start playing: **${song.title}**`);
            client.user.setActivity(song.title, { type: 'LISTENING' });
          }
        
	},
};
