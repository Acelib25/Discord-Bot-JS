const { Command } = require("discord.js-commando");

module.exports = class TTTCommand extends Command {
	constructor(client){
        super(client, {
            name: 'tictactoe',
            memberName: 'tictactoe',
            aliases: ['ttt', 'xo'],
            group: 'standard',
            guildOnly: true,
            description: 'Play tic tac toe.',
            usage: 'ttt <user>',
            args: [
				{
                    key: 'user',
                    prompt: 'Please provide a user to challenge',
                    type: 'user',
                }
			],

        })
    }
	async run(message, { user }) {
		message.say(`${user}! ${message.author} challenged you to tic tac toe. Use (${prefix}ttt ${message.author}) to accept`)
	}
};
