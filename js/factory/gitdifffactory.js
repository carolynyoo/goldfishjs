app.factory('GitDiffFactory', function(){
	
	return {

			// Returns an Array of Diffs

			calculateDiff: function(text1, text2){
			console.log("Text1:", text1);
			console.log("Text2:", text2);
			
			var dmp = new diff_match_patch();
			var diffsCreated = dmp.diff_main(text1, text2);
			console.log("Diffs Array Before:", diffsCreated);

//			currdiff = {added: diffsCreated[0][0], removed: diffsCreated[0,1]};
			// diff_main("Good dog", "Bad dog") => [(-1, "Goo"), (1, "Ba"), (0, "d dog")]

			dmp.diff_cleanupSemantic(diffsCreated); // makes diffs human readable
			console.log("Semantic Diffs:", diffsCreated);

			// Splice to new array - think original data might be a tuple
			var semDiffArray = [].splice.call(diffsCreated, 0);
			console.log("spliced array:", semDiffArray);
			
			console.log("semDiffArray[0]:", semDiffArray[0]);
			console.log("semDiffArray[0][0]:", semDiffArray[0][0]);

			console.log("THE DIFF:", semDiffArray[1][1]);

			// TODO: This will only get the first chunk
			// of the diff and not all of the diffs contained in the array

			// will later need to loop
			var textAdded = semDiffArray[1][1];
			var textSame = semDiffArray[0][1];

			// console.log("THE REMOVED:", semDiffArray[2][1]);
			// var textRemoved = semDiffArray[2][1];

			// var object = {"textAdded": textAdded, "textSame": textSame, "textRemoved": textRemoved};

			// TODO: This should eventually loop through array of diffs
			// But for now, I am reading into object and accessing directly
			// Array should run through and ng-repeat
			var object = {"textAdded": textAdded, "textSame": textSame, "textRemoved": "empty- fix this later"};

			return object;

		}
	};
});