const Discord = require('discord.js');
const { execute } = require('./tag');

module.exports = {
    name: 'antifurry',
    aliases: ['anti'],
	async execute(nsfw, message, args, logger, mode) {
        let preExtraArgs = message.content.replace(/[^a-zA-Z0-9 ]/g, "").toLowerCase().split(/ +/);
        //console.log(preExtraArgs)
        let extraArgs = preExtraArgs;

        if (extraArgs.includes("uwu")){
            message.channel.send("> Don’t you dare say uwu again or I will break your shins. \n ~Drawgon")
        }
        else if (extraArgs.includes("owo") || extraArgs.includes("x3") || extraArgs.includes("nuzzles")){
            message.channel.send("> Keep your furry bullshit away from me. \n ~Ace")
        }
	},
};
