var fs = require("fs");
var chokidar = require('chokidar');

var file = "test.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE Planck (id INTEGER PRIMARY KEY, filename TEXT, text_state TEXT, event_type TEXT, saved_at DATE, author TEXT)");
  }

  // Watches from db for now as root
  // Fix for later - whole gitplayback directory
  chokidar.watch(__dirname, {ignored: /[\/\\]\./}).on('all', function(event, path) {
    console.log(event, path);
    readFile(event, path); 
  });

  // fs.watchFile('helloworld.txt', function (curr, prev) {
  // })
 
});

function readFile (event, filepath) {
	var stmt = db.prepare("INSERT INTO Planck(filename, text_state, event_type, saved_at, author) VALUES (?, ?, ?, ?, ?)");
  fs.readFile(filepath, "utf-8", function(err, text) {
    //console.log('readfile from text', text);
    datetest = Date.now();
    stmt.run(filepath, text, event, datetest, "Randy Wong");
    stmt.finalize();
    db.each("SELECT id, filename, text_state, event_type, saved_at, author FROM Planck", function(err, row) {
      console.log(row.id + "filename: " + row.filename + "text: " + row.text_state, "event: " + row.event_type + "Saved at : " + row.saved_at, "Author: "+row.author);
    });
  });
}