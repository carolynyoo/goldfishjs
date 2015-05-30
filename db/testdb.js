var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE Planck (id INTEGER PRIMARY KEY, diff TEXT, savedat DATE)");
  }

	var stmt = db.prepare("INSERT INTO Planck(diff, savedat) VALUES (?, ?)");
	fs.readFile('helloworld.txt', "utf-8", function(err, text) {
		console.log('readfile from text', text);
		datetest = Date.now();
	  	stmt.run(text, datetest);
		stmt.finalize();
		db.each("SELECT id, diff, savedat FROM Planck", function(err, row) {
		    console.log(row.id + ": " + row.diff, "Saved at : " + row.savedat);
		});
	});
 
});
