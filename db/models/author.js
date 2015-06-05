var Sequelize = require('sequelize');

models.exports = function(db){

	var Author = sequelize.define('Author', {
		id: { type: Sequelize.STRING, primaryKey: true},
		first_name: Sequelize.STRING,
		last_name: Sequelize.STRING,
		username: Sequelize.STRING,
		email: Sequelize.STRING
	});

	return Author;

};
