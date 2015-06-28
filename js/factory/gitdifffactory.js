app.factory('GitDiffFactory', function(){

			var dmp = new diff_match_patch();

			var calculateDiff = function (text1, text2){
				console.log("Text1:", text1);
				console.log("Text2:", text2);
				
				var diffsCreated = dmp.diff_main(text1, text2);
				var nonSemanticDiffs = diffsCreated;
				// console.log("==> Diffs Created:", diffsCreated);

				// diff_main("Good dog", "Bad dog") => [(-1, "Goo"), (1, "Ba"), (0, "d dog")]

				// dmp.diff_cleanupSemantic(diffsCreated); // makes diffs human readable
				// console.log("==> Semantic Diffs:", diffsCreated);

				var patches = dmp.patch_make(text1, diffsCreated);
				console.log("==> Semantic Patches:", patches);

				var displayText = dmp.patch_toText(patches);
				console.log("==> Semantic Text:", displayText);


				// // TODO: This will only get the first chunk
				// // of the diff and not all of the diffs contained in the array

				// // TODO: This should eventually loop through array of diffs
				// // But for now, I am reading into object and accessing directly
				// // Array should run through and ng-repeat
				// var object = {"textAdded": textAdded, "textSame": textSame, "textRemoved": "empty- fix this later"};

				// return object;
			};

	return {
		calculateDiff: calculateDiff
	};

});