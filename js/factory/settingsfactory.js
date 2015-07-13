app.factory('SettingsFactory', function (ValuesService) {
	
	// Using a factory as a global 'holder' for application settings applied by the user
	// Store booleans as private vars and expose functions for getting or setting them.
	
	var diffMode = false;
	var currentRepo = "";

	var getMode = function () {
		return diffMode;
	};

	var switchMode = function () {
		// diffMode = diffMode === true ? false : true;
		diffMode = !diffMode;
		return diffMode;
	};

	var getCurrentRepo = function () {
		return currentRepo;
	};

	var setCurrentRepo = function (repoPath) {
		currentRepo = repoPath;
		console.log("New Rep set as Current:", currentRepo);
	};

	var getRecentRepos = function () {
		return ValuesService.AppConfig.find({})
			.sort({createdAt:1})
			.exec()
			.then(function(repos) {
				return repos;
			});
	};

	return {
		getMode: getMode,
		switchMode: switchMode,
		getRecentRepos: getRecentRepos,
		getCurrentRepo: getCurrentRepo,
		setCurrentRepo: setCurrentRepo
	};

});