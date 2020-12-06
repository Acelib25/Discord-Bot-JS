const Discord = require('discord.js');
module.exports = {
	name: 'bin',
	usage: 'd(decode) or e(encode)',
	guildOnly: false,
	description: 'encode or decode binary',
	execute(message, args, client, currency, logger, Perms) {
        const commandArgs = args.join(' ');
        let splitArgs = commandArgs.split(' ');
        let tagName = splitArgs.shift();
        let binData = splitArgs.join(' ');
        let res;
		switch(args[0]) {
        case 'e':
			res = "";
            for (var i = 0; i < binData.length; i++) {
                res += binData[i].charCodeAt(0).toString(2) + " ";
            }
            message.channel.send(`**Encoded as:** ${res}`)
            break;
        case 'd':
            function binarytoString(str) {
                return str.split(/\s/).map(function (val){
                  return String.fromCharCode(parseInt(val, 2));
                }).join("");
              }
            message.channel.send(`**Decoded as:** ${binarytoString(binData)}`)
            break;
		default:
			message.channel.send("`-bin d` for decode `-bin e` to encode");
			break;
		}
		
		
	}
};



