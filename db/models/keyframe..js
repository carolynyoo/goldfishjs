var Sequelize = require('sequelize');

models.exports = function(db){

	var Keyframe = sequelize.define('Keyframe', {
		id: { type: Sequelize.STRING, primaryKey: true},
		filename: Sequelize.TEXT,
		text_state: Sequelize.TEXT,
		event_type: Sequelize.TEXT,
		saved_at: { 
			type: Sequelize.DATE, 
			defaultValue: 
			Sequelize.NOW 
		},
		author: Sequelize.STRING
	});

	return Keyframe;

};


// We have 'STRING' validation available using these models
// Sequlize saves createdAt and updatedAt by default... Maybe we should drop 'saved_at' field..
// db.run("CREATE TABLE Planck (id INTEGER PRIMARY KEY, filename TEXT, text_state TEXT, event_type TEXT, saved_at DATE, author TEXT)");
