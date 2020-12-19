const Discord = require('discord.js')
const { Command } = require("discord.js-commando");
const Canvas = require('canvas');
const ms = require("ms");
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff')

module.exports = class PaintCommand extends Command {
	constructor(client){
        super(client, {
            name: 'paint',
            memberName: 'paint',
            aliases: ['canvas', 'imgedit'],
            group: 'standard',
            guildOnly: true,
            description: 'Make art',
            usage: 'paint text <x y fontSize hexColor text> or -paint glitch <ammount> \n',
            args: [
				{
                    key: 'edit',
                    prompt: 'Please provide an edit',
                    type: 'string',
                    oneOf: ['text', 'glitch'],
                },
                {
                    key: 'settings',
                    prompt: 'Please provide edit settings',
                    type: 'string',
                }
			],
        })
    }
	async run(message, { edit, settings }) {
        let image;
        try {
            let preImage = await AceStorage.findAll({
                where: {
                    value1key: 'User',
                    value2key: 'Image',
                    value1: message.author.id
                }
            })
            let pre2image = await preImage.map(t => t.value2)
            image = await pre2image[0]

        } catch(error){
            return message.reply('Set an image first with -imgset <url>')
        }
        try{
            image = new Discord.MessageAttachment(image, 'placeholder.png')
            let test = await message.channel.send('Processing', image)
            image = test.attachments.first()
            test.delete()
            console.log(image)
        } catch(error){
            console.log(error)
        }
        
        

        
        const canvas = Canvas.createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage(image.url)
        .catch(error => {
          console.error(error);
          message.say("Oops `Error: 403`, tell Ace to fix this. Try again.");
        })

        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        if(edit == 'text'){
            let split = settings.split(' ')
            let x = split[0]
            split.shift()
            console.log(x)
            let y = split[0]
            split.shift()
            console.log(y)
            let size = split[0]
            split.shift()
            console.log(size)
            let color = split[0]
            split.shift()
            console.log(color)
            let text = split.join(" ")
            console.log(text)
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            // Select the font size and type from one of the natively available fonts
            ctx.font = `${size}px sans-serif`;
            // Select the style that will be used to fill the text in
            ctx.fillStyle = `${color}`;
            // Actually fill the text with a solid color
            ctx.fillText(text, x, y);
        }
        else if(edit == 'glitch'){
            let verticalSlices = Math.round(image.height / 20);
            let maxHorizOffset = settings;
            for (let i = 0; i < verticalSlices; i++)  {
                let horizOffset = getRandom(-Math.abs(maxHorizOffset), maxHorizOffset);
                ctx.drawImage(background, 0, i * verticalSlices, image.width, i * verticalSlices + verticalSlices, horizOffset, i * verticalSlices, image.width, i * verticalSlices + verticalSlices);
            }
        }

        
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        message.channel.send("Here is your edit...", attachment)
    }
}