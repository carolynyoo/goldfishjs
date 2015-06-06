var Sequelize = require('sequelize'),
    sequelize = new Sequelize('git-playback', 'root', null, {
      dialect: 'sqlite',
      port: 3306
    });

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

  var Keyframe = require('./keyframe')(sequelize);
  var Author = require('author')(sequelize);
  var Repo = require('repo')(sequelize);

sequelize
  .sync({ force: true })
  .then(function(err) {
    console.log('It worked!');
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
  });

// Declare cardinality rules
Author.hasMany(Keyframe);
Keyframe.belongsTo(Author);
Repo.hasMany(Keyframe);
Repo.belongsTo(Author);

module.exports = {
  Author: Author,
  Keyframe: Keyframe,
  Repo: Repo
};