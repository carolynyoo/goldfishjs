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
  dbFactory.setDb(e.dataTransfer.files[0].path);
  
  return false;
};