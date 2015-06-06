var fs = require("fs");
var chokidar = require('chokidar');

// Allows command line to be executed with node
var nodeCLI = require("shelljs-nodecli");

var models = require('./models'),
    Author = models.Author,
    Keyframe = models.Keyframe,
    Repo = models.Repo;

console.log("something ran");

  // Watches from db for now as root
  // Fix for later - whole gitplayback directory
  chokidar.watch(__dirname, {ignored: '*.db', ignoreInitial: true}).on('all', function(event, path) {
    // console.log(event, path);
    readFile(event, path); 
  });

function readFile (event, filepath) {
  fs.readFile(filepath, "utf-8", function(err, text) {
  
    // Reads last commit hash for current branch
    var lastCommit = nodeCLI.exec("git", "rev-parse","head", {async:true});
    lastCommit.stdout.on('data', function(lastcommit){

    // Reads current branch name
    var currBranch = nodeCLI.exec("git", "rev-parse", "--abbrev-ref", "HEAD", {async: true});
    currBranch.stdout.on('data', function(branchname){

    // Read keyframe to database
    Keyframe
      .create({
        filename: filepath,
        text_state: text,
        event_type: event,
        last_commit: lastcommit,
        prev_keyframe: "prev keyframe placeholder",
        next_keyframe: "next keyframe placeholder",
        branch_name: branchname
      })
      .then(function(keyframe) {
        console.log("keyframe create successful: ");
      }).catch(function(err) {
        console.log("keyframe create error: ", err);
      });

    });
  });

    });
}
