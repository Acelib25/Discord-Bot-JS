const Discord = require('discord.js');
const { Command } = require("discord.js-commando");
const fs = require('fs');
const { type } = require("os");
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame, Desc} = require('../../sqlStuff');
module.exports = class RoomCommand extends Command {
	constructor(client){
        super(client, {
            name: 'room',
            memberName: 'room',
            aliases: ['area'],
            group: 'standard',
            guildOnly: true,
            hidden: true,
            description: 'Describe the area',
            usage: '-room',
            })
    }
	async run(message) {
        room = message.channel.id
        switch(room){
            case('746837873965269063'):
                const kitchenEmbed = new Discord.MessageEmbed()
                    .setColor('#ededed')
                    .setTitle('The Kitchen')
                    .setAuthor('Murder Bot', 'https://cdn.discordapp.com/avatars/746825750027567184/f89180b17f7077c2d231fbf9579c37be.webp', 'https://cdn.discordapp.com/avatars/746825750027567184/f89180b17f7077c2d231fbf9579c37be.webp')
                    .addField('Description', 'It\'s the kitchen. I could make some food. Or I could look for a knife to stab my opponents with. All the possibilities.')
                    .addField('\u200B', '\u200B')
                    .setImage('https://fej-aws-media.s3-accelerate.amazonaws.com/2016/09/WilcoxBurchmore-school-kitchen.jpg')
                    .setTimestamp();

                message.channel.send(kitchenEmbed);
                break;
            
            case('746837963496882186'):
                const diningEmbed = new Discord.MessageEmbed()
                    .setColor('#ededed')
                    .setTitle('The Mess Hall')
                    .setAuthor('Murder Bot', 'https://cdn.discordapp.com/avatars/746825750027567184/f89180b17f7077c2d231fbf9579c37be.webp', 'https://cdn.discordapp.com/avatars/746825750027567184/f89180b17f7077c2d231fbf9579c37be.webp')
                    .addField('Description', 'It\'s the Mess Hall. Or did the sign say dining hall? This would be a good place to study my opponents, their subtle flaws, who they hang out with. Maybe slip something into their food?')
                    .addField('\u200B', '\u200B')
                    .setImage('https://s2.thingpic.com/images/Rk/J2Xc9SXhZS4YCNnfAbCEmtFL.jpeg')
                    .setTimestamp();

                message.channel.send(diningEmbed);
                break;
            
            case('746837917166469130'):
                const casinoEmbed = new Discord.MessageEmbed()
                    .setColor('#ededed')
                    .setTitle('The Casino')
                    .setAuthor('Murder Bot', 'https://cdn.discordapp.com/avatars/746825750027567184/f89180b17f7077c2d231fbf9579c37be.webp', 'https://cdn.discordapp.com/avatars/746825750027567184/f89180b17f7077c2d231fbf9579c37be.webp')
                    .addField('Description', 'It\'s the Casino. I better be careful here. I could win big or lose everything. If this is like any other casino my bets on the latter. Maybe I could rig the machines, suck away my opponents cash?\n\n-slots <amount to bet>')
                    .addField('\u200B', '\u200B')
                    .setImage('https://www.upmatters.com/wp-content/uploads/sites/93/2020/05/rd1gohBB.jpeg?w=2048&h=1024&crop=1')
                    .setTimestamp();

                message.channel.send(casinoEmbed);
                break;
            
            case('746838025153020165'):
                const elevatorEmbed = new Discord.MessageEmbed()
                    .setColor('#ededed')
                    .setTitle('The Elevator')
                    .setAuthor('Murder Bot', 'https://cdn.discordapp.com/avatars/746825750027567184/f89180b17f7077c2d231fbf9579c37be.webp', 'https://cdn.discordapp.com/avatars/746825750027567184/f89180b17f7077c2d231fbf9579c37be.webp')
                    .addField('Description', 'It\'s the elevator. The main highway of the hotel, it goes to every floor. I noticed a hatch on the ceiling, its locked. The lock does not look complex though, I may be able to pick it.')
                    .addField('\u200B', '\u200B')
                    .setImage('https://www.forms-surfaces.com/sites/default/files/imagecache/gal-reg-2x/images/6.1_WTCB_24_07312015.jpg')
                    .setTimestamp();

                message.channel.send(elevatorEmbed);
                break;
            
            case('746838075992440915'):
                const hallEmbed = new Discord.MessageEmbed()
                    .setColor('#ededed')
                    .setTitle('The Hallway')
                    .setAuthor('Murder Bot', 'https://cdn.discordapp.com/avatars/746825750027567184/f89180b17f7077c2d231fbf9579c37be.webp', 'https://cdn.discordapp.com/avatars/746825750027567184/f89180b17f7077c2d231fbf9579c37be.webp')
                    .addField('Description', 'The Hallway. Use it to go from point A to B. I have to be careful though. There are many doorways for asailants to hide in. The floors are carpet, good for sneaking up on people, or geting snuck up on')
                    .addField('\u200B', '\u200B')
                    .setImage('https://i.redd.it/7nvmz3p3kna11.jpg')
                    .setTimestamp();

                message.channel.send(hallEmbed);
                break;
            
            case('746581357035126784'):
                const qEmbed = new Discord.MessageEmbed()
                    .setColor('#ededed')
                    .setTitle('The Strange Room')
                    .setAuthor('Murder Bot', 'https://cdn.discordapp.com/avatars/746825750027567184/f89180b17f7077c2d231fbf9579c37be.webp', 'https://cdn.discordapp.com/avatars/746825750027567184/f89180b17f7077c2d231fbf9579c37be.webp')
                    .addField('Description', 'A strange room. I\'m not quite shure how I got here. There is just a table and a notepad. The notepad says "Write questions here". I wonder what happens if I write a made up word like "-bruck" :D')
                    .addField('\u200B', '\u200B')
                    .setTimestamp();

                message.channel.send(qEmbed);
                break;
            
            case('746857011035111474'):
                const entranceEmbed = new Discord.MessageEmbed()
                    .setColor('#ededed')
                    .setTitle('The Room Of Despair')
                    .setAuthor('Green Bot', 'https://cdn.discordapp.com/avatars/746825750027567184/eb9fb73598cf3d87cb1b8500cc7d07bd.webp', 'https://cdn.discordapp.com/avatars/746825750027567184/eb9fb73598cf3d87cb1b8500cc7d07bd.webp')
                    .addField('Description', 'As soon as you enter this room you know you should not be here. You can barely see anything but the room smells of pure pain. If pure pain had a smell that is. You hear a familiar, far off, voice yelling "WHY WON\'T IT WORK!?!?" You decide to leave before you become like Ace...')
                    .addField('\u200B', '\u200B')
                    .setImage('https://i.imgur.com/N0ocfNU.png')
                    .setTimestamp();

                message.channel.send(entranceEmbed);
                break;
            case('748704515221618719'):
                const deadEmbed = new Discord.MessageEmbed()
                    .setColor('#ededed')
                    .setTitle('Afterlife')
                    .setAuthor('Green Bot', 'https://cdn.discordapp.com/avatars/746825750027567184/eb9fb73598cf3d87cb1b8500cc7d07bd.webp', 'https://cdn.discordapp.com/avatars/746825750027567184/eb9fb73598cf3d87cb1b8500cc7d07bd.webp')
                    .addField('Description', 'Welcome to the afterlife. Talk with the ones who have been brutaly murdered and place your bets on the living because you\'re stuck here for the rest of eternity...\n\nBy the way the laws of life dont apply here so you better look out, I\'m feeling a tad hungry >:D')
                    .addField('\u200B', '\u200B')
                    .setImage('https://media.giphy.com/media/Y34v7S5jENXAdbkfYh/giphy.gif')
                    .setTimestamp();

                message.channel.send(deadEmbed);
                break;
            case('748704659904004096'):
                const dead2Embed = new Discord.MessageEmbed()
                    .setColor('#ededed')
                    .setTitle('Afterlife')
                    .setAuthor('Green Bot', 'https://cdn.discordapp.com/avatars/746825750027567184/eb9fb73598cf3d87cb1b8500cc7d07bd.webp', 'https://cdn.discordapp.com/avatars/746825750027567184/eb9fb73598cf3d87cb1b8500cc7d07bd.webp')
                    .addField('Description', 'Welcome to the afterlife. Talk with the ones who have been brutaly murdered and place your bets on the living because you\'re stuck here for the rest of eternity...\n\nBy the way the laws of life dont apply here so you better look out, I\'m feeling a tad hungry >:D')
                    .addField('\u200B', '\u200B')
                    .setImage('https://media.giphy.com/media/Y34v7S5jENXAdbkfYh/giphy.gif')
                    .setTimestamp();

                message.channel.send(dead2Embed);
                break;
            case('756338801562877985'):
                const auEmbed = new Discord.MessageEmbed()
                    .setColor('#ededed')
                    .setTitle('Among Us')
                    .setAuthor('Green Bot', 'https://cdn.discordapp.com/avatars/746825750027567184/eb9fb73598cf3d87cb1b8500cc7d07bd.webp', 'https://cdn.discordapp.com/avatars/746825750027567184/eb9fb73598cf3d87cb1b8500cc7d07bd.webp')
                    .addField('Description', 'A cute and freindly game of **who the FUCK is killing everyone?**')
                    .addField('\u200B', '\u200B')
                    .setImage('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/clans/33836086/1f9249103f371671071532e02e3ab39d2da49cbe_400x225.png')
                    .setTimestamp();

                message.channel.send(auEmbed);
                break;
            default:
                message.channel.send("You can't see anything in here...");
        }
    }
};
