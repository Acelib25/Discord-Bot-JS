const Discord = require('discord.js');
const Sequelize = require('sequelize');

module.exports = {
	name: 'mafiajoin',
	usage: '',
	guildOnly: true,
	description: 'join the mafia game',
	async execute(message, args, client) {  
        
                
        let admin;      
        const sequelize = new Sequelize('database', 'username', 'password', {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            storage: 'database.sqlite',
        });
        const MafiaGame = sequelize.define('mafiaGame', {
			guild_id: {
				type: Sequelize.STRING,
			},
			user_id: {
                type: Sequelize.STRING,
            },
            user_name: {
                type: Sequelize.STRING,
            },
            game_admin: {
                type: Sequelize.STRING,
            },
            role: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.STRING,
            },
            game_channel: {
                type: Sequelize.STRING,
            },
            game_status: {
                type: Sequelize.STRING,
            },
        });
        let games = await MafiaGame.findAll({ where: { game_channel: message.channel.id } });
        if(!Array.isArray(games) || !games.length){
            admin = 'true';
        } else {
            admin = 'false'
        }
        let player = await MafiaGame.findAll({ where: { game_channel: message.channel.id } });
        let players = player.map(t => t.user_name) || 'No tags set.';
        let gameStatus = player.map(t => t.game_status) || 'No tags set.';
        
        /**if(players.includes(message.author.tag)){
            return message.channel.send(`You have already joined this game, ${message.author}!`);
        }**/

        if(gameStatus.includes('game started')){
            return message.channel.send(`That game has already started, ${message.author}!`);
        }

        let join = await MafiaGame.create({
            guild_id: message.guild.id,
            user_id: message.author.id,
            user_name: message.author.tag,
            game_admin: admin,
            role: 'none',
            status:'alive',
            game_channel: message.channel.id,
            game_status: 'waiting',
        });

        message.channel.send(`<@${message.author.id}> joined the mafia game!`)
        player = await MafiaGame.findAll({ where: { game_channel: message.channel.id } });
        players = player.map(t => t.user_name) || 'No tags set.';
        let gameAdmin = await MafiaGame.findAll({ where: { game_admin: 'true', game_channel: message.channel.id } })
        let gameAdminName = gameAdmin.map(t => t.user_name) || 'No tags set.';
        message.channel.send(`Admin: ${gameAdminName}\nCurrent Players: ${players}`)       
        
	}
};