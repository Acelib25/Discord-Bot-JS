const fs = require('fs');
const Discord = require('discord.js');
const { Structures } = require('discord.js');
const { CommandoClient, GuildSettingsHelper, CommandoRegistry, SettingProvider, SQLiteProvider } = require('discord.js-commando');
const path = require('path');
const package = require('./package.json')
const config = require('./config.json');
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('./sqlStuff');

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


const client = new CommandoClient({
	commandPrefix: config.prefix,
	owner: '344143763918159884',
	invite: 'https://discord.gg/nFuQAtTRjN',
});
open({
  	filename: './settings.sqlite',
  	driver: sqlite3.Database
}).then((db) => {
	client.setProvider(new SQLiteProvider(db));
})
client.registry
	.registerDefaultTypes()
	.registerGroups([
		['standard', 'Standard Commands'],
		['admin', 'Mod and Admin Commands'],
		['super', 'Super User Commands'],
		['music', 'Music Commands'],
		['money', 'Money Commands']
	])
	.registerDefaultGroups()
	.registerDefaultCommands({unknownCommand: false})
	.registerCommandsIn(path.join(__dirname, 'commands'));

async function setupGuild(id){
	let guild = client.guilds.cache.get(id)
	if(!guild.channels.cache.some(r => r.name === 'acejs-moderation-log')){
		guild.channels.create('acejs-moderation-log-temp', {
			type: "text",
			permissionOverwrites: [
				{
					id: guild.roles.everyone.id,
					deny: ['VIEW_CHANNEL'],
				},
			]
		}).then((channel) => {
		let	modRoles = guild.roles.cache.filter(role => role.permissions.has('KICK_MEMBERS')).map(r => r.id)
		modRoles.forEach( role =>
			channel.updateOverwrite(role, {VIEW_CHANNEL: true})
		)
		channel.edit({ name: 'acejs-moderation-log' })
		let beffIDK = AceStorage.create({
			guild_id: guild.id,
			value1key: 'ModLogChannel',
			value1: channel.id
		});
		})
	}
	
};

client.once('ready', async () => {
	SyncAllSQL()	
	const storedBalances = await Users.findAll();
	storedBalances.forEach(b => currency.set(b.user_id, b));
	console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
	fs.writeFile("./serverList.txt", `Currently operating in ${client.guilds.cache.size} servers.\n\n${client.guilds.cache.array().join('\n')}`,(err) => {
		if(err) throw err;
		console.log('Server File Updated!');
	  });
	
	client.guilds.cache.each(entry => setupGuild(entry.id))
	client.user.setPresence({
        activity: {
            name: `Help: ${config.prefix}help | Version: ${package.version}`,
            type: "PLAYING",
        }
    });
});

client.on('commandError', (cmd, error) => {
	console.error(`Oopsies, ${cmd} did a fuckywucky :(\n\n`)
	console.error(error)
});

client.on('commandRun', async (command, promise, message, args) =>{
	setupGuild(message.guild.id)
	let d = new Date(); 
	let argsKey = Object.keys(args)
	let argsValue = Object.values(args)
	let argsList = []
	for(let i = 0; i < argsKey.length; i++){
		argsList.push(`[${argsKey[i]}: ${argsValue[i]}]`)
	}
	client.guilds.cache.get('747587696867672126').channels.cache.get('747587927261052969').send(`**${message.author.tag}** ran command **${command.name}** with arguements **[${argsList}]** at **${d.toLocaleString()}** in **${message.guild.name}(${message.guild.id})**`)
});

client.on('message', async message => {
	let commandCollection = client.registry.commands
	if (message.author.bot) return;
	let antifurry = commandCollection.get('antifurry')
	let botspeech = commandCollection.get('botspeech')
	let botreply = commandCollection.get('botreply')
	if (antifurry.isEnabledIn(message.guild)){antifurry.run(message)}
	if (botreply.isEnabledIn(message.guild) && message.mentions.has(client.user)){botreply.run(message)}
	if (botspeech.isEnabledIn(message.guild)){botspeech.run(message, 'safe')}
})

client.login(config.token);