var writeFile = Promise.promisify(require("fs").writeFile);
var readFile = Promise.promisify(require("fs").readFile);

app.factory('FileIoFactory', function () {
	var writeToFile = function (path, string) {
		return writeFile(path, string)
			.then(function () {
				console.log("Factory: writeToFile: ");
				return;
			});
	};

	var readFromFile = function (path) {
		return readFile(path)
			.then(function(data) {
				console.log("Factory: readFromFile data: ", data);
				return data;
			});
	};

	return {
		writeToFile: writeToFile,
		readFromFile: readFromFile
	};
});