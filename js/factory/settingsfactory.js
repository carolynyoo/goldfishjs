app.factory('SettingsFactory', function () {
	
	// Using a factory as a global 'holder' for application settings applied by the user
	// Store booleans as private vars and expose functions for getting or setting them.
	
	var diffMode = false;

	return {
		getMode: function () {
			return diffMode;
		},
		switchMode: function () {
			diffMode = diffMode === true ? false : true;
			return diffMode;
		}
	};

});