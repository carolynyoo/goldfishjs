app.factory('DropDirectoryFactory', function ($state, ValuesService) {
  var dir = process.env.PWD;
  // prevent default behavior from changing page on dropped file
  window.ondragover = function(e) { 
    e.preventDefault(); 
    return false; 
  };

  window.ondrop = function(e) { 
    e.preventDefault(); 
    return false; 
  };

  var dropbox = document.getElementById('dropbox');
  dropbox.ondragover = function () { this.className = 'hover'; return false; };
  dropbox.ondragleave = function () { this.className = ''; return false; };
  dropbox.ondrop = function (e) {
    e.preventDefault();

    // assuming one directory is dropped
    // values service
    ValuesService.Keyframe = dbFactory.setDb(e.dataTransfer.files[0].path);
    // localStorage.recentDir = e.dataTransfer.files[0].path; 

    var pathstring = e.dataTransfer.files[0].path;
    var pathArr = pathstring.split(path.sep);
    var name = pathArr.pop();

    ValuesService.AppConfig
      .update({ 
          path: pathstring 
        },
        {
          path: pathstring,
          name: name,
          createdAt: new Date()
        },
        {
          upsert: true
    }).then(function(newRepo) {
      console.log("Recent Repo successfually saved", newRepo);
    }).fail(function(err) {
      console.log("Error saving new Repo: ", err);
    });
    
    // change directory to dropped directory
    process.chdir(e.dataTransfer.files[0].path);
    console.log("PWD on drop: ", process.cwd());
    dir = process.cwd();
    $state.go('main');

    return false;
  };

  return {
    getDir: function () {
      return dir;
    }
  };
});