var mysql = require('mysql');
module.exports = {
	name: 'mintyadd',
	usage: '-mintyadd <Idea>',
	guildOnly: false,
	description: 'add fresh idea',
	execute(message, args) {
		let d = new Date();
		let idea = { 
		name: message.author.username,
		message: message.content.replace('-mintyadd ', ''),
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
					message.channel.send("Idea added!")
					console.log("1 record inserted");
			});
		});
		
	}
};
