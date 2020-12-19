const Discord = require('discord.js')
const { Command } = require("discord.js-commando");
const Canvas = require('canvas');
const ms = require("ms");
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff')

module.exports = class bonkCommand extends Command {
	constructor(client){
        super(client, {
            name: 'bonk',
            memberName: 'bonk',
            aliases: ['bonkify'],
            group: 'standard',
            guildOnly: true,
            description: 'bonk',
            usage: 'bonk <user> \n',
            args: [
				{
                    key: 'user',
                    prompt: 'Please provide a mention or id',
                    type: 'user',
                },
				{
                    key: 'reason',
                    prompt: 'Please provide a reason to bonk',
                    type: 'string',
                    default: false,  
                }
            ],
            throttling: {
				usages: 1,
				duration: 60,
			},
        })
    }
	async run(message, { user, reason }) {
        let image = "https://i.imgur.com/QFcD0kw.png"
        const canvas = Canvas.createCanvas(720, 492);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage(image)
        .catch(error => {
          console.error(error);
          message.say("Oops `Error: 403`, tell Ace to fix this. Try again.");
        })

        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        // Pick up the pen
        ctx.beginPath();
        // Start the arc to form a circle
        ctx.arc(570, 320, 100, 0, Math.PI * 2, true);
        // Put the pen down
        ctx.closePath();
        // Clip off the region you drew on
        ctx.clip();
        
        const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 470, 220, 200, 200);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        if(reason){
            message.channel.send(`${user.username} has been bonked because ${reason}!!!!`, attachment)
        } else {
            message.channel.send(`${user.username} has been bonked!!!!`, attachment)
        }
        
    }
}