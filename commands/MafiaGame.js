const Discord = require('discord.js');
const Sequelize = require('sequelize');

module.exports = {
    async kill(message, args, client){
        
    },
    async startGame(message, args, client){
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
        let mafia = await MafiaGame.findAll({ where: { role: 'Mafia', game_channel: message.channel.id } });
        let mafiaPlayers = mafia.map(t => t.user_id) || 'No tags set.';
        let mafiaPlayersNames = mafia.map(t => t.user_name) || 'No tags set.';

        message.channel.send("Statistics say there are **1 Mafia member**, **1 Doctor**, and **3 Civilians** in every **5** random people... \n\n*Mafia members want to kill people without getting caught.*\n*Doctors want to save people from the Mafia.*\n*Civilians want to find the Mafia members and execute them.*")
        message.channel.send('Night falls on the discord server... Rest well. >:D')
        if (mafiaPlayers.length > 1){
            for(let i = 0; i < mafiaPlayers.length; i++){
                client.users.cache.get(mafiaPlayers[i]).send(`Discuss with your partners, then use -mkill to choose your victim. Only one mafia needs to run the command.`);
                client.users.cache.get(mafiaPlayers[i]).send(`The mafia are: ${mafiaPlayersNames}`)
            }
            
        } else {
            console.log(mafiaPlayers)
            console.log(mafia)
            client.users.cache.get(mafiaPlayers[0]).send(`Use -mkill when you are ready to choose your victim.`);
        }
        
    } 

}