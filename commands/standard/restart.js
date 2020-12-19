const { Command } = require("discord.js-commando");

let d = new Date();
module.exports = class RestartCommand extends Command {
	constructor(client){
        super(client, {
            name: 'restart',
            memberName: 'restart',
            group: 'standard',
            guildOnly: false,
            description: 'restart',
            usage: 'restart \n',
            ownerOnly: true,
        })
    }
	run(message) {
		console.log(`Bot restarted at ${d.toLocaleString()}`);
		message.channel.send(`Resarting bot...`)
		process.exit()
	}
};














