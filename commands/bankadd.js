let d = new Date();
module.exports = {
	name: 'bankadd',
	description: 'Add monz',
	aliases: ['baladd', 'balanceadd'],
	execute(message, args, client, currency, logger) {
		console.log(args)
		var taggedUser = message.mentions.users.first();
			if (!message.mentions.users.size) {
				try {
					const User = message.client.users.cache.get(args[0]);
					if (User) { // Checking if the user exists.
						taggedUser = User // The user exists.
					}
					else{
						taggedUser = "none"
						console.log("Gave monz to empty user/self.")
					}
				}
				catch(error) {
					if(error == "empty"){
						taggedUser = "none"
						console.log("Gave monz to empty user/self.")
					}
				
				}
			}

		if (!message.member.roles.cache.some(r => r.name === 'Admin') && !message.member.roles.cache.some(r => r.name === 'Banker') && !message.member.roles.cache.some(r => r.name === 'Ace-JS Admin')) {
			return message.channel.send('You dont have permission to use this...');
		}
		function isNumeric(num){
			return !isNaN(num)
		}
		
		if(taggedUser == "none"){
			console.log(isNumeric(args[0]))
			if(!isNumeric(args[0])){
				return message.channel.send('Umm, I need a number');
			}
			currency.add(message.author.id, args[0], message.author.username);
			console.log(`added ${args[0]} monz`)
			message.channel.send(`Added $${args[0]} to ${message.author.username}'s account.`)
		}
		else {
			console.log(isNumeric(args[1]))
			if(!isNumeric(args[1])){
				return message.channel.send('Umm, I need a number');
			}
			currency.add(taggedUser.id, args[1], taggedUser.username);
			console.log(`added ${args[1]} monz`)
			message.channel.send(`Added $${args[1]} to <@${taggedUser.id}>'s account.`)
		}
			
	},
};