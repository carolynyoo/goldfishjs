// prevent default behavior from changing page on dropped file
window.ondragover = function(e) { 
	e.preventDefault(); 
	return false; 
};

window.ondrop = function(e) { 
	e.preventDefault(); 
	return false; 
};

var holder = document.getElementById('holder');
holder.ondragover = function () { this.className = 'hover'; return false; };
holder.ondragleave = function () { this.className = ''; return false; };
holder.ondrop = function (e) {
  e.preventDefault();

  for (var i = 0; i < e.dataTransfer.files.length; ++i) {
    console.log(e.dataTransfer.files[i].path);
  }
  return false;
};