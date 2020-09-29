const Discord = require('discord.js');
const Sequelize = require('sequelize');

module.exports = {
	name: 'mafiaend',
	usage: '',
	guildOnly: true,
	description: 'end the mafia game',
	async execute(message, args, client, currency, logger) {        
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
        let gameAdmin = await MafiaGame.findAll({ where: { game_admin: 'true', game_channel: message.channel.id } })
        let gameAdminName = gameAdmin.map(t => t.user_name) || 'No tags set.';
        let game = await MafiaGame.findAll({ where: { game_channel: message.channel.id } });
        
        if(message.author.tag == gameAdminName || message.member.roles.cache.some(r => r.name === 'Admin')){
            let endGame = await MafiaGame.destroy({ where: { game_channel: message.channel.id } })
            message.channel.send(`Game ended.`)
        }
		
		
	}
};