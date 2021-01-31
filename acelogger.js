const fs = require('fs');

function writelog(message, consoleLog){
    let d = new Date
    fs.appendFile("./botlogs.txt", `${d}: ${message}\n`, (err) => {
		if(err) throw err;
    })
    if(consoleLog == true){
        console.log(message)
    }
}

module.exports = {
    writelog,
}