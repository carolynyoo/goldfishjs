var fs = require('fs'),
    path = require('path'),
    gitignoreParse = require('gitignore-globs'),
    minimatch = require('minimatch'); 

function dirTree(filename) {

    var gitIgnore = path.join(process.env.PWD, ".gitignore"); 
    var globsToIgnore = gitignoreParse(gitIgnore);
    globsToIgnore.push('**/.git/**');

    for (var i=0; i<globsToIgnore.length; i++) {
      if (minimatch(filename, globsToIgnore[i])) {
        return;
      }
    }
    var stats = fs.lstatSync(filename),
        info = {
            "path": filename,
            "name": path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
    }

    return info;
}

var data = dirTree(process.env.PWD);

module.exports = data;