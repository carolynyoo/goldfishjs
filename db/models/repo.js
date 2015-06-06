var Sequelize = require('sequelize');

models.exports = function(db){

	var Repo = sequelize.define('Repo', {
		id: { type: Sequelize.STRING, primaryKey: true},
		repo_name: Sequelize.TEXT,
		url: Sequelize.STRING,
		remotes: Sequelize.STRING,
		description: Sequelize.STRING,
		head: sequelize.STRING
	});

	return Repo;

};