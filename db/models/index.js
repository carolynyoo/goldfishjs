var path = require('path');
var storagePath = path.join(process.env.PWD, "db","storage.db");
var storagePath = path.join(__dirname, "..", "storage.db");
console.log("pwd: ", process.env.PWD); 
var pwd = process.env.PWD+"/";
// var gitIgnore = path.join(process.env.PWD, ".gitignore"); 

var nodeCLI = require("shelljs-nodecli");
var fs = require("fs");
var chokidar = require('chokidar');
var gitignoreParse = require('gitignore-globs');
var minimatch = require('minimatch'); 

var PromisifyMe = require('promisify-me');
var DataStore = PromisifyMe(require('nedb'), 'nedb');

var setDb = function (dir) {
  console.log(path.join(dir, '.nedbstorage.db'));
  var db = new DataStore({filename: path.join(dir, '.nedbstorage.db'), autoload: true});
  watcher(db, dir); 
  return db; 
};

var setAppConfigDb = function (dir) {
  console.log(path.join(dir, '.goldfishjsapp.db'));
  var appConfigDb = new DataStore({filename: path.join(dir, '.goldfishjsapp.db'), autoload: true});
  return appConfigDb; 
};

var watcher = function (db, dir) {
  chokidar.watch(dir, {ignored: /[\/\\]\./, ignoreInitial: false}).on('all', function(event, path) {
    var dbEmpty = false;
    console.log('WATCHER: ', event, path);
    db.find({}).exec().then(function (kf) {
      if (!kf.length) {
        readFile(event, path, db, dir);
      }
    })
    var globsToIgnore = []; 
    try {
      var stats = fs.lstatSync(dir+'/.gitignore');
      if(stats.isFile()) {
        globsToIgnore = gitignoreParse(dir+"/.gitignore");
      }
    }
    catch (e) {
      
    }
    globsToIgnore.push('**/.git/**', '*.db', '.nedbstorage.db', 'nedbstorage.db~');
    console.log(path);
    // if (dir===path && dbEmpty) {
    //   readFile(event, path, db, dir);
    // } else {
      for (var i=0; i<globsToIgnore.length; i++) {
        if (minimatch(path.split(dir+"/")[1], globsToIgnore[i])) {
          return;
        }
      }
    // }
    readFile(event, path, db, dir); 
  });
}

// var db = new DataStore({ filename: path.join(global.window.nwDispatcher.requireNwGui().App.dataPath, 'nedbstorage.db') });
// path.join the dir and filename 
// var db = new DataStore({ filename: 'nedbstorage.db', autoload: true });

var readFile = function (event, filepath, db, dir) {
  fs.readFile(filepath, "utf-8", function(err, text) {

  // Redo, currently execs on PWD but needs to be on fed in directory
  // Reads last commit hash for current branch
  process.chdir(dir);
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
          };

          db.insert(doc)
            .then(function (newDoc) {
              console.log("Keyframe create successful: ", newDoc);
              addToTail(newDoc, filepath, db);
          })
          .fail(function(err) {
            console.error(err);
          });
        });
      }); 
    }); 
})};

var addToTail = function (newKeyframe, filepath, db) {
  // find the last chronological keyframe  --> query the latest...
  // var = oldKeyFrame is result of first line --> createKeyframe()
  // update oldKeyFrame.next_keyframe = newKeyFrame.ID
  // update newKeyFrame.prev_keyframe = oldKeyFrame.ID
  db.find({ filename: filepath }).sort({ createdAt: -1 }).limit(2).exec(function (err, docs) {
    if (docs.length<2) {
      return;
    }
    console.log('Limit 2:',docs); 
    var prevID = docs[1]._id;
    db.update({_id: newKeyframe._id}, {$set: {prev_keyframe: prevID}})
      .then(function (numUpdated) {
          db.update({_id: prevID}, {$set: {next_keyframe: newKeyframe._id}});
      })
      .then(function (numUpdated) {
        db.count().exec(function (err, count) {
          console.log('count post update', count); 
        });
      })
      .fail(function (err) {
        console.log(err); 
      });
  });

};

var saveRepo = function (repopath) {

  var pathArr = repopath.split(path.sep);
  var name = pathArr.pop();

  var repository = {
    path: repopath,
    name: name,
    createdAt: new Date()
  };

};

var insertKeyframe = function (revertKeyframe, newKeyframe) {
  // newKeyframe.prev_keyframe = revertKeyframe.ID
}; 


module.exports = {
  setDb: setDb,
  watcher: watcher,
  readFile: readFile,
  addToTail: addToTail,
  setAppConfigDb: setAppConfigDb,
  saveRepo: saveRepo
};
