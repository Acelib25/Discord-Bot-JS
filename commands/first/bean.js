const Discord = require('discord.js')
const { Command } = require("discord.js-commando");
const Canvas = require('canvas');
const ms = require("ms");
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff')

module.exports = class BeanCommand extends Command {
	constructor(client){
        super(client, {
            name: 'bean',
            memberName: 'bean',
            aliases: ['beanify'],
            group: 'first',
            guildOnly: true,
            description: 'Make beanz',
            usage: 'bean <user> \n',
            args: [
				{
                    key: 'user',
                    prompt: 'Please provide a mention or id',
                    type: 'user',
                },
			],
        })
    }
	async run(message, { user }) {
        let image = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-200318-seo-how-to-cook-beans-horizontal-final-14288-eb-1585337558.jpg?crop=0.6668421052631579xw:1xh;center,top&resize=480:*"
        const canvas = Canvas.createCanvas(480, 480);
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
        ctx.font = `60px sans-serif`;
        // Select the style that will be used to fill the text in
        ctx.fillStyle = `#00000`;
        // Actually fill the text with a solid color
        ctx.fillText("LOL Get Beaned!", 20, 460);
        // Pick up the pen
        ctx.beginPath();
        // Start the arc to form a circle
        ctx.arc(240, 240, 100, 0, Math.PI * 2, true);
        // Put the pen down
        ctx.closePath();
        // Clip off the region you drew on
        ctx.clip();
        
        const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 140, 140, 200, 200);
        const overlay = await Canvas.loadImage("https://i.imgur.com/xjGn1CK.png");
        ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

        
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        message.channel.send(`${user.username} has been BEANED!!!!`, attachment)
    }
}