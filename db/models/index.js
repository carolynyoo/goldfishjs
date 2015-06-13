var path = require('path');
var storagePath = path.join(process.env.PWD, "db","storage.db");
var storagePath = path.join(__dirname, "..", "storage.db");
console.log("pwd: ", process.env.PWD); 
var pwd = process.env.PWD+"/";
var gitIgnore = path.join(process.env.PWD, ".gitignore"); 

var nodeCLI = require("shelljs-nodecli");
var fs = require("fs");
var chokidar = require('chokidar');
var gitignoreParse = require('gitignore-globs');
var minimatch = require('minimatch'); 

var PromisifyMe = require('promisify-me');
var DataStore = PromisifyMe(require('nedb'), 'nedb');
// var db = new DataStore({ filename: path.join(global.window.nwDispatcher.requireNwGui().App.dataPath, 'nedbstorage.db') });
var db = new DataStore({ filename: 'nedbstorage.db', autoload: true })

  chokidar.watch(process.env.PWD, {ignored: '*.db', ignoreInitial: true}).on('all', function(event, path) {
    console.log('WATCHER: ', event, path);
    // to do: gitignore glob path match 
    // also add .git to ignore 
    var globsToIgnore = gitignoreParse(gitIgnore);
    globsToIgnore.push('**/.git/**');
    console.log('globs please', globsToIgnore);
    for (var i=0; i<globsToIgnore.length; i++) {
      if (minimatch(path.split(pwd)[1], globsToIgnore[i])) {
        return;
      }
    }
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

          // Reads last commit time
          //git rev-parse HEAD | git show -s --format=%ct
          var commitTime = nodeCLI.exec("git", "rev-parse", "HEAD", "|", "git", "show", "-s", "--format=%ct", {async: true});
          commitTime.stdout.on('data', function(committime){
 
          // Read keyframe to database
          var doc = {
            filename: filepath,
            text_state: text,
            event_type: event,
            last_commit: lastcommit,
            last_commit_time: committime, 
            prev_keyframe: null,
            next_keyframe: null,
            branch_name: branchname,
            createdAt: new Date()
          }
          db.insert(doc)
            .then(function (newDoc) {
              console.log("Keyframe create successful: ", newDoc);
            })
            .fail(function(err) {
              console.error(err);
            });
          });
        }); 
      }); 
  })}; 

  var addToTail = function (newKeyframe) {
    // find the last chronological keyframe  --> query the latest...
    // var = oldKeyFrame is result of first line --> createKeyframe()
    // update oldKeyFrame.next_keyframe = newKeyFrame.ID
    // update newKeyFrame.prev_keyframe = oldKeyFrame.ID
    console.log('newkf id?', newKeyframe.id);
    Keyframe
      .update({nextKeyframeId: newKeyframe.id}, { where: { id: newKeyframe.id - 1 }})
      .then(function() {
        Keyframe.update({prevKeyframeId: newKeyframe.id-1}, { where: { id: newKeyframe.id }})
      })
      .then(function() {
        console.log("Add to Tail successful"); 
      })
      .catch(function(err) {
        console.log("Add to Tail error: ", err);
      });

  };

  var insertKeyframe = function (revertKeyframe, newKeyframe) {
    // newKeyframe.prev_keyframe = revertKeyframe.ID
  }; 
 

module.exports = {
  // Author: Author,
  Keyframe: db
  // Repo: Repo
};
