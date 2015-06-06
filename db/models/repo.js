var Sequelize = require('sequelize');

module.exports = function(sequelize){

	var Repo = sequelize.define('Repo', {
		id: { type: Sequelize.STRING, primaryKey: true},
		repo_name: Sequelize.TEXT,
		url: Sequelize.STRING,
		remotes: Sequelize.STRING,
		description: Sequelize.STRING,
		head: Sequelize.STRING,
		collaborators: Sequelize.STRING
		//stats i.e. total commits
	});

	return Repo;

};