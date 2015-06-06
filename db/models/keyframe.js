var Sequelize = require('sequelize');

module.exports = function(sequelize){

	var Keyframe = sequelize.define('Keyframe', {
		id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
		filename: Sequelize.TEXT,
		text_state: Sequelize.TEXT,
		event_type: Sequelize.TEXT,
		last_commit: Sequelize.STRING(40),		// look up git event types, does git provide info?
		branch_name: Sequelize.STRING(40) 		// what info can we discern from th branch names?
	});

	return Keyframe;

};

// we can set instance methods on our models...
// http://stackoverflow.com/questions/19433824/using-instance-methods-in-sequelize


// Keyframe.find( function (err, keyframe) {

// 	keyframe.assixgnPrev...

// 	keyframe.assignNext
// }