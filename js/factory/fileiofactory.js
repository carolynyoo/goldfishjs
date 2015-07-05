var writeFile = Promise.promisify(require("fs").writeFile);

app.factory('FileIoFactory', function () {
	var writeToFile = function (path, string) {
		return writeFile(path, string)
			.then(function(response) {
				console.log("Factory: writeToFile Response: ", response);
				return response;
			});
	};

	return {
		writeToFile: writeToFile
	};
});