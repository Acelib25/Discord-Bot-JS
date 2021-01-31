const { Command } = require("discord.js-commando");
const { writelog } = require("../../acelogger");

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
		writelog(`Bot restarted at ${d.toLocaleString()}`);
		message.channel.send(`Resarting bot...`)
		process.exit()
	}
};














