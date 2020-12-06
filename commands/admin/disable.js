const { oneLine } = require('common-tags');
const { Command } = require('discord.js-commando');
const {SyncAllSQL, AceStorage, currency, Users, sequelize, Tags, Perms, Disabled, Moderation, MafiaGame} = require('../../sqlStuff')


module.exports = class DisableCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'disable',
			aliases: ['disable-command', 'cmd-off', 'command-off'],
			group: 'admin',
			memberName: 'disable',
			description: 'Disables a command or command group.',
			userPermissions: ['KICK_MEMBERS'],
			details: oneLine`
				The argument must be the name/ID (partial or whole) of a command or command group.
				Only administrators may use this command.
			`,
			examples: ['disable util', 'disable Utility', 'disable prefix'],
			guarded: true,

			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Which command or group would you like to disable?',
					type: 'group|command'
				},
				{
					key: 'mode',
					label: 'mode',
					prompt: 'dont worry about this',
					type: 'string',
					default: 'run'
				}
			]
		});
	}

	hasPermission(msg) {
		if(!msg.guild) return this.client.isOwner(msg.author);
		return msg.member.hasPermission('ADMINISTRATOR') || this.client.isOwner(msg.author);
	}

	async run(msg, args) {
		if(args.mode == 'run'){
			if(!args.cmdOrGrp.isEnabledIn(msg.guild, true)) {
				return msg.reply(
					`The \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'} is already disabled.`
				);
			}
			if(args.cmdOrGrp.guarded) {
				return msg.reply(
					`You cannot disable the \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'}.`
				);
			}
			args.cmdOrGrp.setEnabledIn(msg.guild, false);
			let disable = await Disabled.create({
                guild_id: msg.guild.id,
                guild_name: msg.guild.name,
                command: args.cmdOrGrp.name,
            });
			return msg.reply(`Disabled the \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'}.`);
		} else {
			let passed = args
			let commandCollection = this.client.registry.commands
			let command= commandCollection.get(passed);
			command.setEnabledIn(msg.guild, false);
			console.log(`${msg.guild} disabled the \`${command.name}\` ${command.group ? 'command' : 'group'}.`);
		}
		
}};
