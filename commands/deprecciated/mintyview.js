var mysql = require('mysql');
module.exports = {
	name: 'mintyview',
	usage: '-mintyview',
	guildOnly: false,
	description: 'view fresh ideas',
	execute(message, args) {
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
				con.query("SELECT * FROM ideas", function (err, row) {
					if (err) throw err;
					row.forEach( (row) => {
						message.channel.send(`On ${row.date} at ${row.time} ${row.name} said: ${row.message}`);
					});
				});
		});
		
	}
};