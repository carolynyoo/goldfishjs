var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE Planck (id INTEGER PRIMARY KEY, text_state TEXT, saved_at DATE, author TEXT)");
  }

  fs.watchFile('helloworld.txt', function (curr, prev) {
    readFile();
  })
 
});

function readFile () {
	var stmt = db.prepare("INSERT INTO Planck(text_state, saved_at, author) VALUES (?, ?, ?)");
  fs.readFile('helloworld.txt', "utf-8", function(err, text) {
    console.log('readfile from text', text);
    datetest = Date.now();
    stmt.run(text, datetest, "Randy Wong");
    stmt.finalize();
    db.each("SELECT id, text_state, saved_at, author FROM Planck", function(err, row) {
      console.log(row.id + ": " + row.text_state, "Saved at : " + row.saved_at, "Author: "+row.author);
    });
  });
}