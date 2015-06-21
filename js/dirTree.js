var fs = require('fs'),
    path = require('path'),
    gitignoreParse = require('gitignore-globs'),
    minimatch = require('minimatch'); 

function skipReading (filename) {
    var gitIgnore = path.join(process.env.PWD, ".gitignore"); 
    var globsToIgnore = gitignoreParse(gitIgnore);
    globsToIgnore.push('**/.git/**', '**/.gitignore');
    console.log(globsToIgnore);

    for (var i=0; i<globsToIgnore.length; i++) {
      if (minimatch(filename, globsToIgnore[i])) {
        return false;
      }
    }
    return true;
}

function dirTree(filename) {
    if (!skipReading(filename)) {
        console.log(filename);
        return;
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
        })
        .filter(function (elem) {
            console.log(elem);
            if (elem) {
                if (elem.children && elem.children.length===0) {
                    return false;
                } else {
                    return true;
                }
            }
            return false;
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
    }

    return info;
}

var arr = [];
var data = dirTree(process.env.PWD);
arr.push(data);

module.exports = arr;