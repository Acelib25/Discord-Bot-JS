const fs = require('fs');
const Discord = require('discord.js');
//const { CommandoClient } = require('discord.js-commando');
//const path = require('path');
const Intents = require('discord.js');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { Users, CurrencyShop } = require('./dbObjects');
const currency = new Discord.Collection();
const cooldowns = new Discord.Collection();
const config = require('./config.json');
const tag = require('./commands/tag');
const disable = require('./commands/disable');
const prefix = config.prefix;

const client = new Discord.Client({ ws: { intents: Intents.ALL } });
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});
const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});
const Disabled = sequelize.define('disabled', {
	guild_id: {
		type: Sequelize.STRING,
	},
	guild_name: {
		type: Sequelize.STRING,
	},
	command: {
		type: Sequelize.STRING,
	},
});

/**Reflect.defineProperty(currency, 'add', {
	eslint-disable-next-line func-name-matching
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});**/

Reflect.defineProperty(currency, 'add', {
	/* eslint-disable-next-line func-name-matching */
	value: async function add(id, amount, name) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			user.user_name = name;
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, user_name: name, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
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
Reflect.defineProperty(currency, 'getBalance', {
	/* eslint-disable-next-line func-name-matching */
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});


client.once('ready', async () => {
	Tags.sync();
	Disabled.sync();
	MafiaGame.sync();
	const storedBalances = await Users.findAll();
	storedBalances.forEach(b => currency.set(b.user_id, b));
	console.log('Ready!');
});

client.on('message', async message => {

	if (message.member.roles.cache.some(r => r.name === 'Ghost') ) {
		message.delete()
		return message.channel.send(`*${message.author.tag} let out a ghostly moan....*`);
	}
	
	if (message.author.bot) return;
	
	let moneyTag = await Tags.findOne({ where: { name: "passiveMoney" } });
	let passiveMoney = moneyTag.get('description');
	
	if (message.channel.type != 'dm' && passiveMoney == "true") {currency.add(message.author.id, 1);}
	
	
	let preExtraArgs = message.content.toLowerCase().split(/ +/);
	let extraArgs = preExtraArgs;


	
	if (message.author.id != '746559309558579261'){
		switch(extraArgs[0]) {
        case 'yui':
            if(extraArgs.length < 2) {
                
            } else {
				yui = extraArgs[1];
				let d = new Date();
				client.guilds.cache.get('747587696867672126').channels.cache.get('747587927261052969').send(`${message.author.tag} set Yui message to ${extraArgs[1]} at ${d.toLocaleString()}`)
            }
            break;
        case 'goodbye':
			message.channel.send(`Goodbye`)
			break;
		case 'goodnight':
			message.channel.send(`Goodnight`)
			break;
		default:
            //send not found
            break;
		}
	}

    

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (message.channel.type != 'dm'){
		disabled = await Disabled.findAll({ where: { guild_id: message.guild.id } });
		disabledString = disabled.map(t => t.guild_id) || 'No tags set.';
		disabledCommands = disabled.map(t => t.command) || 'No tags set.';
	}
	
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}
	
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
	
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
	
	if(message.channel.type != 'dm'){
		try {
			d = new Date(); 
			if (message.channel.type != 'dm' && disabledString.includes(message.guild.id) && disabledCommands.includes(command.name)){
				message.channel.send("Command disabled in this server...")
			}
			else{
				command.execute(message, args, client, currency);
				client.guilds.cache.get('747587696867672126').channels.cache.get('747587927261052969').send(`**${message.author.tag}** ran command **${commandName}** with arguementss **[${args}]** at **${d.toLocaleString()}** in **${message.guild.name}(${message.guild.id})**`)
			}

		} catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
	} else {
		try {
			command.execute(message, args, client, currency);
			
		} catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
	}
	
});


client.login(config.token);