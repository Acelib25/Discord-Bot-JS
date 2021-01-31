const fs = require('fs');
const { Command } = require('discord.js-commando');
const { writelog } = require('../../acelogger');

module.exports = class JojoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'jojo',
      aliases: ['jojo-gif', 'jojo-gifs'],
      group: 'standard',
      memberName: 'jojo',
      description: 'Get random jojo gif!',
      throttling: {
        usages: 2,
        duration: 30
      }
    });
  }
  run(message) {
    try {
      const linkArray = fs
        .readFileSync('commands/commandAssets/jojolinks.txt', 'utf8')
        .split('\n');
      const link = linkArray[Math.floor(Math.random() * linkArray.length)];
      return message.say(link);

    } catch (e) {
      message.say(':x: Failed to fetch a gif!');
      return writelog(e);
    }
  }
};
