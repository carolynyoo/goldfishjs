var Promise = require('bluebird');
var jsdiff = require('diff');
Promise.promisifyAll(jsdiff);

app.factory('GitDiffFactory', function(){

	var calculateDiff = function (lastFrame, currentFrame) {
		return jsdiff.diffLinesAsync(lastFrame, currentFrame)
			.then(function(difference) {
				return difference;
			});
		};

	return {
		calculateDiff: calculateDiff
	};

});