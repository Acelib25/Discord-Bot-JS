const Sequelize = require('sequelize');
const Discord = require('discord.js');
const { Users, CurrencyShop } = require('../../dbObjects.js');
const { Command } = require('discord.js-commando');
const pack = require('../../package.json')


module.exports = class Credits extends Command {
	constructor(client){
        super(client, {
            name: 'credits',
            memberName: 'credits',
            aliases: ['authors'],
            group: 'standard',
            guildOnly: false,
            description: 'Display Credit Information',
            usage: '',
        })
    }
	async run(message, { username }) {
        const embed = {
            "title": "Credits",
            "description": "First I would like to thank the amazing people behind Discord.js and StackOverflow. I would have never been able to do this with out you!",
            "color": 6213428,
            "thumbnail": {
              "url": "https://cdn.discordapp.com/avatars/746825750027567184/f89180b17f7077c2d231fbf9579c37be.webp"
            },
            "fields": [
              {
                "name": "Author",
                "value": "Acelib25 | TheAceProgrammer"
              },
              {
                "name": "Contributors",
                "value": pack.contributors
              }
            ]
          };
          message.say({ embed });
    
    }
}