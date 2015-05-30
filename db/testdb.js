var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE Planck (diff TEXT, date TEXT)");
  }

	var stmt = db.prepare("INSERT INTO Planck(diff, date) VALUES (text, datetest)");
	fs.readFile('helloworld.txt', "utf-8", function(err, text) {
		console.log('readfile from text', text);
		datetest = Date.now();
	  	stmt.run(text, datetest);
		stmt.finalize();
		db.each("SELECT rowid AS id, diff, date FROM Planck", function(err, row) {
		    console.log(row.id + ": " + row.diff);
		});
	});
 
});
