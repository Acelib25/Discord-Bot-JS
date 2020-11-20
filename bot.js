const fs = require('fs');
const Discord = require('discord.js');
const { Structures } = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const package = require('./package.json')
const config = require('./config.json');
const Sequelize = require('sequelize');
const currency = new Discord.Collection();
const { Users, CurrencyShop } = require('./dbObjects');
Structures.extend('Guild', Guild => {
	class MusicGuild extends Guild {
	  constructor(client, data) {
		super(client, data);
		this.musicData = {
		  queue: [],
		  isPlaying: false,
		  volume: 1,
		  songDispatcher: null
		};
	  }
	}
	return MusicGuild;
});
//const client = new Discord.Client({ ws: { intents: Intents.ALL } });
const client = new CommandoClient({
	commandPrefix: config.prefix,
	owner: '344143763918159884',
	invite: 'https://discord.gg/nFuQAtTRjN',
});
//client.commands = new Discord.Collection();
client.registry
	.registerDefaultTypes()
	.registerGroups([
		['first', 'Standard Commands'],
		['admin', 'Mod and Admin Commands'],
		['super', 'Super User Commands'],
		['music', 'Music Commands'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));

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

const Perms = sequelize.define('permisions', {
	guild_id: {
		type: Sequelize.STRING,
	},
	user_id: {
		type: Sequelize.STRING,
	},
	power: {
		type: Sequelize.STRING,
	},
});

const Moderation = sequelize.define('moderate', {
	guild_id: {
		type: Sequelize.STRING,
	},
	user_id: {
		type: Sequelize.STRING,
	},
	mod_id: {
		type: Sequelize.STRING,
	},
	points: {
		type: Sequelize.STRING,
	},
	type: {
		type: Sequelize.STRING,
	},
	reason: {
		type: Sequelize.STRING,
	},
	time: {
		type: Sequelize.STRING,
	},
	embed: {
		type: Sequelize.STRING,
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


const Queue = new Map();
module.exports = { currency: currency, Perms: Perms, Queue };

client.once('ready', async () => {
	Tags.sync();
	Disabled.sync();
	MafiaGame.sync();
	Moderation.sync();
	Perms.sync();
	const storedBalances = await Users.findAll();
	storedBalances.forEach(b => currency.set(b.user_id, b));
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	client.user.setPresence({
        activity: {
            name: `Help: ${config.prefix}help | Version: ${package.version}`,
            type: "PLAYING",
			url: "https://www.twitch.tv/acelib25",
        }
    });
});
client.on('error', console.error);

client.on('message', async message => {
	/*if (message.channel.type != 'dm' && !disabledCommands.includes('botspeech')) {ambiance.execute(nsfwMode, message, args, logger)}
	if (message.channel.type != 'dm' && !disabledCommands.includes('antifurry')) {antifurry.execute(nsfwMode, message, args, logger)}
	if (message.mentions.has(client.user) && !message.author.bot && message.channel.type != 'dm' && !disabledCommands.includes('botreply')){botreply.execute(nsfwMode, message, args, logger, "ping")}
	*/
	if (message.author.bot) return;

	let commandCollection = client.registry.commands
	let antifurry = commandCollection.get('antifurry')
	let botspeech = commandCollection.get('botspeech')
	let botreply = commandCollection.get('botreply')
	if (antifurry.isEnabledIn(message.guild)){antifurry.run(message)}
	if (botreply.isEnabledIn(message.guild) && message.mentions.has(client.user)){botreply.run(message)}
	if (botspeech.isEnabledIn(message.guild)){botspeech.run(message, 'safe')}
	

})

client.login(config.token);