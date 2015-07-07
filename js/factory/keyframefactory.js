var fs = require('fs');

app.factory('KeyframeFactory', function (ValuesService, CommLinkFactory) {
	var getAllKeyframes = function() {
		return ValuesService.Keyframe.find({}).sort({createdAt:1}).exec()
		    .then(function(keyframes) {
		      // console.log("KeyframeFactory - get all files: ", keyframes);
		      return keyframes; 
		    });
		};

	var getFileKeyframes = function (filename) {
		return ValuesService.Keyframe.find({ 
				filename: filename,
				event_type: "change"
			})
			.sort({createdAt:1}).exec()
			.then(function(fileKeyframes) {
				console.log("fileKeyframes: ", fileKeyframes);
				if (fileKeyframes.length < 1) {
					var doc = {};

					fs.readFile(filename, 'utf-8', function(err, string) {
						if (err) {
							console.log("---> err: ", err);
						}

						doc.filename = filename;
						doc.text_state = string;
						doc.event_type = "change";

						fileKeyframes.push(doc);
						return fileKeyframes;

					});
				}
				
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