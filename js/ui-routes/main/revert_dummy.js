console.log("hello I'm a dummy file");

var golfish = function (string) {
	console.log("I'm a goldfish and my name is: " + string);
};

var Fish = function (name) {
	this.name = name;
	this.animal = 'fish';
};

Fish.prototype.speak = function () {
	console.log("Yo!");
};