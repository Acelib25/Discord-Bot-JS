const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const config = require('../../config.json');
const { Command } = require('discord.js-commando');

module.exports = class UrbanCommand extends Command {
	constructor(client){
        super(client, {
            name: 'urban',
            memberName: 'urban',
            aliases: [],
            group: 'first',
            guildOnly: false,
            description: 'Display Urban',
            usage: 'urban <topic>',
            args: [{
				key: 'text',
                prompt: 'Please provide text to urban',
				type: 'string',
				validate: text => text.length > 0
			}],
        })
    }
	async run(message, { text }) {
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

		const query = querystring.stringify({ term: text });

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

		if (!list.length) {
			return message.channel.send(`No results found for **${text}**.`);
		}

		const [answer] = list;

		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields(
				{ name: 'Definition', value: trim(answer.definition, 1024) },
				{ name: 'Example', value: trim(answer.example, 1024) },
				{ name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` },
			);
		message.channel.send(embed);
	}
};
