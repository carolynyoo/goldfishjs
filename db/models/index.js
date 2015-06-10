var path = require('path');
var storagePath = path.join(process.env.PWD, "db","storage.db");
// var storagePath = path.join(__dirname, "..", "storage.db");
console.log("storagePath: ", storagePath);

var nodeCLI = require("shelljs-nodecli");
var fs = require("fs");
var chokidar = require('chokidar');

var Sequelize = require('sequelize'),
    sequelize = new Sequelize('git-playback', 'root', null, {
      dialect: 'sqlite',
      storage: storagePath,
      logging: false,
      port: 3306
    });

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

  var Keyframe = require('./db/models/keyframe')(sequelize);
  var Author = require('./db/models/author')(sequelize);
  var Repo = require('./db/models/repo')(sequelize);

// Declare cardinality rules
Author.hasMany(Keyframe);
Keyframe.belongsTo(Author);
Keyframe.belongsTo(Keyframe, { as: "prev_keyframe", constraints: false });
Keyframe.belongsTo(Keyframe, { as: "next_keyframe", constraints: false });
Repo.hasMany(Keyframe);
Author.hasMany(Repo);
Repo.belongsTo(Author);

// Create the tables, add {force: true} as an option to drop the tables
sequelize
  .sync()
  .then(function(err) {
    console.log('It worked!');
  }, function (err) { 
    console.log('An error occurred while creating the table:');
  });

  chokidar.watch(process.env.PWD, {ignored: '*.db', ignoreInitial: true}).on('all', function(event, path) {
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

        // Reads last commit time
        var commitTime = nodeCLI.exec("git", "rev-parse", "HEAD", "|", "git", "show", "-s", "--format=%ct", {async: true});
        commitTime.stdout.on('data', function(committime){

  //git rev-parse HEAD | git show -s --format=%ct


          // Read keyframe to database
          Keyframe
            .create({
              filename: filepath,
              text_state: text,
              event_type: event,
              last_commit: lastcommit,
              last_commit_time: committime, // someone needs to fix 
              prev_keyframe: null,
              next_keyframe: null,
              branch_name: branchname
            })
            .then(function(keyframe) {
              console.log("keyframe create successful: ", keyframe.get({plain: true})); 
              addToTail(keyframe);
            }).catch(function(err) {
              console.log("keyframe create error: ", err);
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


global.module.exports = {
  Author: Author,
  Keyframe: Keyframe,
  Repo: Repo
};