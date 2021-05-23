const fs = require('fs');
const Discord = require('discord.js')
const { Command } = require('discord.js-commando');
const Canvas = require('canvas');
const ms = require("ms");
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff');
const { writelog } = require('../../acelogger');

module.exports = class SusCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'sus',
      aliases: ['susify', 'amogus'],
      group: 'standard',
      memberName: 'sus',
      description: 'Hmmm they look a bit SUS',
      args: [
        {
            key: 'user',
            prompt: 'Please provide a mention or id',
            type: 'user',
        }
    ],
      throttling: {
        usages: 2,
        duration: 120
      },
    });
  }
  async run(message, { user }) {
    try {
        let pre = fs.readFileSync('commands/commandAssets/suslinks.json', 'utf-8')
        let linkArray = JSON.parse(pre)
        let array = [];

        for(let i in linkArray)
            array.push([i, linkArray[i]]);
        const link = array[Math.floor(Math.random() * array.length)];
        let imageObject = link[1]
        let image = imageObject.link
        
        const canvas = Canvas.createCanvas(imageObject.width, imageObject.height);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage(image)
        .catch(error => {
          writelog(error);
          message.say("Oops `Error: 403`, tell Ace to fix this. Try again.");
        })

        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        
        if(link[0] == "Amogus"){
            const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(avatar, (canvas.width/1.2)-20, (canvas.height/1.54)-60, 75, 75);
        } else {
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            // Pick up the pen
            ctx.beginPath();
            // Start the arc to form a circle
            ctx.arc(canvas.width/1.2, canvas.height/1.54, 100, 0, Math.PI * 2, true);
            // Put the pen down
            ctx.closePath();
            // Clip off the region you drew on
            ctx.clip();
            const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, (canvas.width/1.2)-100, (canvas.height/1.54)-100, 200, 200);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        }


        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sus-image.png');
        if(link[0] == "Amogus"){
            message.channel.send(`${user.username} is AMOGUS!`, attachment)
        } else {
            message.channel.send(`${message.author.username} thinks ${user.username} is sus.`, attachment)  
        }
        

    } catch (e) {
        message.say(':x: Failed to kill the imposter!');
        return writelog(e);
    }
  }
};
