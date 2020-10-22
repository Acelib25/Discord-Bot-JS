let d = new Date();
module.exports = {
	name: 'bankadd',
	description: 'Add monz',
	aliases: ['baladd', 'balanceadd'],
	execute(message, args, client, currency, logger, Perms) {
		logger.info(args)
		var taggedUser = message.mentions.users.first();
			if (!message.mentions.users.size) {
				try {
					const User = message.client.users.cache.get(args[0]);
					if (User) { // Checking if the user exists.
						taggedUser = User // The user exists.
					}
					else{
						taggedUser = "none"
						logger.info("Gave monz to empty user/self.")
					}
				}
				catch(error) {
					if(error == "empty"){
						taggedUser = "none"
						logger.info("Gave monz to empty user/self.")
					}
				
				}
			}

		//Permission Check
        permData = Perms.findAll({ where: { guild_id: message.guild.id, user_id: message.author.id} });
        permPower = permData.map(t => t.power);

        if (!permPower.includes("admin") && !permPower.includes("mod")) {
            return message.channel.send('You dont have permission to use this...');
        }
        //Permission Check
		function isNumeric(num){
			return !isNaN(num)
		}
		
		if(taggedUser == "none"){
			logger.info(isNumeric(args[0]))
			if(!isNumeric(args[0])){
				return message.channel.send('Umm, I need a number');
			}
			currency.add(message.author.id, args[0], message.author.username);
			logger.info(`added ${args[0]} monz`)
			message.channel.send(`Added $${args[0]} to ${message.author.username}'s account.`)
		}
		else {
			logger.info(isNumeric(args[1]))
			if(!isNumeric(args[1])){
				return message.channel.send('Umm, I need a number');
			}
			currency.add(taggedUser.id, args[1], taggedUser.username);
			logger.info(`added ${args[1]} monz`)
			message.channel.send(`Added $${args[1]} to <@${taggedUser.id}>'s account.`)
		}
			
	},
};