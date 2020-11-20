const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class AntiFurry extends Command {
    constructor(client){
        super(client, {
            name: 'antifurry',
            memberName: 'antifurry',
            aliases: [],
            group: 'first',
            guildOnly: false,
            description: 'Down with furries!!!',
            usage: 'None',
            args: [],
        })
    }
	async run(message) {
        let preExtraArgs = message.content.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase().split(/ +/);
        //console.log(preExtraArgs)
        let extraArgs = preExtraArgs;

        if (extraArgs.includes("uwu")){
            message.say("> Don’t you dare say uwu again or I will break your shins. \n ~Drawgon")
        }
        else if (extraArgs.includes("owo") || extraArgs.includes("x3") || extraArgs.includes("nuzzles")){
            message.say("> Keep your furry bullshit away from me. \n ~Ace")
        }
	}
};
