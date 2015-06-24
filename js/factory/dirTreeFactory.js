app.factory('DirTreeFactory', function () {
  var fs = require('fs'),
  path = require('path'),
  gitignoreParse = require('gitignore-globs'),
  minimatch = require('minimatch'); 

  function skipReading (filename) {
      var gitIgnore = path.join(process.env.PWD, ".gitignore"); 
      var globsToIgnore = gitignoreParse(gitIgnore);
      globsToIgnore.push('**/.git/**', '**/.gitignore');

      for (var i=0; i<globsToIgnore.length; i++) {
        if (minimatch(filename, globsToIgnore[i])) {
          return false;
        }
      }
      return true;
  }

  function dirTree(filename) {
      if (!skipReading(filename)) {
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

  function getTree (filename) {
    var arr = [];
    // window.globalVar || process.env.PWD
    arr.push(dirTree(filename));
    return arr;
  }

  return {
    getTree: getTree
    }; 
});




