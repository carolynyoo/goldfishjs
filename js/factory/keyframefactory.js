app.factory('KeyframeFactory', function (CommLinkFactory) {
	var getAllKeyframes = function() {
		return Keyframe.find({}).sort({createdAt:1}).exec()
		    .then(function(keyframes) {
		      console.log("Fetched all keyframes succesfully");
		      console.log("keyframes:", keyframes);
		      return keyframes; 
		    });
		};

	var getFileKeyframes = function (filename) {
		return Keyframe.find({ filename: filename }).sort({createdAt:1}).exec()
			.then(function(fileKeyframes) {
				console.log("Keyframes from the single file: ", fileKeyframes);
				return fileKeyframes;
			});
	};

	var insertKeyframe = function () {
		// placeholder for future use
		// an example of when we might use this:
		// User edits text in our application
	};

	var deleteKeyframe = function () {
		// placeholder for future use
	};

	return {
		getAllKeyframes: getAllKeyframes,
		getFileKeyframes: getFileKeyframes,
		insertKeyframe: insertKeyframe,
		deleteKeyframe: deleteKeyframe
    };
});