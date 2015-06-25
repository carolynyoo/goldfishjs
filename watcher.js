var chokidar = require('chokidar');

var reader = require('./db/testdb.js');

chokidar.watch(__dirname, {ignored: '*.db', ignoreInitial: true}).on('all', function(event, path) {
    // console.log(event, path);
    reader.readFile(event, path);
  });