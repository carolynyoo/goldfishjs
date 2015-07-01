var jsdiff = require('diff');

app.factory('GitDiffFactory', function(){

	var calculateDiff = function (lastFrame, currentFrame) {
		var diff = jsdiff.diffLines(lastFrame, currentFrame);
		return diff;
	};

	return {
		calculateDiff: calculateDiff
	};

});