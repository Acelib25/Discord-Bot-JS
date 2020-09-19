const Discord = require('discord.js');
var mysql = require('mysql');
let i;
module.exports = {
	name: 'minty',
	usage: '-minty',
	guildOnly: false,
	description: 'view Minty version',
	execute(message, args, client) {

		switch(args[0]) {
        case '':
            break;
        case 'add':
			let d = new Date();
			let idea = { 
			name: message.author.username,
			message: message.content.replace('-minty add ', ''),
			date: d.toLocaleString()
			};
		
			var con = mysql.createConnection({
				host: "localhost",
				user: "root",
				password: "YeetItsMySQL25",
				insecureAuth : true,
				database: "mydb"
			});

			con.connect(function(err) {
				if (err) throw err;
					console.log("Connected!");
					var vSplit = String(idea.date).split(", ");
					var v1 = String(idea.name);
					var v2 = String(idea.message);
					var v3 = vSplit[0];
					var v4 = vSplit[1];

					var sql = `INSERT INTO ideas (name, message, date, time) VALUES ("${v1}", "${v2}", "${v3}", "${v4}")`;
					con.query(sql, function (err, result) {
						if (err) throw err;
						message.channel.send(`Idea added with ID: **${result.insertId}** !`)
						client.guilds.cache.get('747587696867672126').channels.cache.get('747587898043531365').send(`**${message.author.tag}** added Minty idea ID: **${result.insertId}**`)
						console.log("1 record inserted");
				});
			});
			break;
		case 'view':
			var con = mysql.createConnection({
				host: "localhost",
				user: "root",
				password: "YeetItsMySQL25",
				insecureAuth : true,
				database: "mydb"
			});
			
			con.connect(function(err) {
				if (err) throw err;
					console.log("Connected!");
					console.log(args)
					con.query("SELECT * FROM ideas", function (err, row) {
						if (err) throw err;
						if (args[1]){
							row.forEach( (row) => {
								if(row.id == args[1]){
									message.channel.send(`**ID ${row.id}:** On ${row.date} at ${row.time} ${row.name} said: ${row.message}`);
									client.guilds.cache.get('747587696867672126').channels.cache.get('747587898043531365').send(`**${message.author.tag}** asked to view Minty idea ID: **${args[1]}**`)
								}
							});
						}
						else{
							row.forEach( (row) => {
								message.channel.send(`**ID ${row.id}:** On ${row.date} at ${row.time} ${row.name} said: ${row.message}`);
								client.guilds.cache.get('747587696867672126').channels.cache.get('747587898043531365').send(`${message.author.tag} asked to view Minty idea ID: ALL`)
							});
						}
						
						
					});
			});
			break;
		default:
            let mintyEmbed = new Discord.MessageEmbed()
			.setColor('#a0ffd3')
			.setTitle(`Minty Information`)
			//.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256}))
			.setImage("https://i.imgur.com/kLhKznY.png[/img")
			.addFields(
			{ name: 'Minty Version', value: 'Using Minty version 0.25 by Acelib25'},
			{ name: 'Description', value: 'Minty is a code system made by Acelib25 to make his bots Minty Fresh for the community. Use -mintyadd to add suggestions for bots.'},
			)
			.setTimestamp()

			message.channel.send(mintyEmbed);
			break;
		}
		
		
	}
};



