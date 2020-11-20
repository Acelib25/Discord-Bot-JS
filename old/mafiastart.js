const Discord = require('discord.js');
const Sequelize = require('sequelize');
const MafiaGameJS = require('./MafiaGame.js')

module.exports = {
	name: 'mafiastart',
	usage: '',
	guildOnly: true,
	description: 'start the mafia game',
	async execute(message, args, client, currency, logger, Perms) {  
        let admin;  
        function random(myArray){
            let randomValue = myArray[Math.floor(Math.random() * myArray.length)];
            return randomValue
        }    
        function range(start, stop, step){
            if (typeof stop=='undefined'){
                // one param defined
                stop = start;
                start = 0;
            };
            if (typeof step=='undefined'){
                step = 1;
            };
            var result = [];
            for (var i=start; step>0 ? i<stop : i>stop; i+=step){
                result.push(i);
            };
            return result;
        };
        
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
        let playerID = player.map(t => t.user_id) || 'No tags set.';
        let gameAdmin = await MafiaGame.findAll({ where: { game_admin: 'true', game_channel: message.channel.id } })
        let gameAdminName = gameAdmin.map(t => t.user_name) || 'No tags set.';
        
        
        roles = [];

		if(message.author.tag == gameAdminName || message.member.roles.cache.some(r => r.name === 'Admin')){
            startTheGame = await MafiaGame.update({ game_status: 'game started' }, { where: { game_channel: message.channel.id } })
            roleSolve = Math.floor(players.length / 5);
            for(i in range(roleSolve)){
                roles.push("Mafia");
                roles.push("Doctor");
            }
            for(i in range(players.length - (2 * roleSolve))){
                roles.push("Civilian");
            }
            logger.info(roles)
            let newRole;
            /**playerID.forEach(async element => {
                logger.info(roles)
                newRole = random(roles)
                logger.info(newRole)
                affectedRows = await MafiaGame.update({ role: newRole }, { where: { user_id: element } })
                removeUsedRole = roles.indexOf(newRole)
                roles.splice(removeUsedRole,1)
                logger.info(roles)
                client.users.cache.get(element).send(`You are a ${newRole}`);
            })**/
            for(let i = 0; i < playerID.length; i++){
                logger.info(roles)
                newRole = random(roles)
                logger.info(newRole)
                affectedRows = await MafiaGame.update({ role: newRole }, { where: { user_id: playerID[i] } })
                removeUsedRole = roles.indexOf(newRole)
                roles.splice(removeUsedRole,1)
                logger.info(roles)
                affectedRows = await MafiaGame.update({ role: 'Mafia' }, { where: { user_id: playerID[i] } })
                client.users.cache.get(playerID[i]).send(`You are a ${newRole}`);
            }
            
            MafiaGameJS.startGame(message, args, client);
        }  else {
            message.channel.send(`Your not the game admin, ${message.author}!`);
        }     
		
		
	}
};