const Discord = require('discord.js');
const fs = require('fs');
const Sequelize = require('sequelize');
const ytdl = require('ytdl-core');
const { Command } = require('discord.js-commando');

module.exports = class SongTest extends Command {
    constructor(client){
        super(client, {
            name: 'songtest',
            aliases: ['vcstest'],
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
    
    async run(message, args, client, currency, logger, Perms, queue) {
        
        //All of the values being passed when the command is run. ^^^^^
        //message | The message object
        //args | Array of the args from the command
        //client | The client object
        //currency | Currency object(Probs not needed for this project)
        //logger | The async logger
        //Perms | The permmisions object(For checking if super, mod, or admin)
        //queue | The Song queue 
        
    
    













      
    }
}