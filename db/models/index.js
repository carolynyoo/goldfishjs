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
  var Author = require('./author')(sequelize);
  var Repo = require('./repo')(sequelize);

// Declare cardinality rules
Author.hasMany(Keyframe);
Keyframe.belongsTo(Author);
Repo.hasMany(Keyframe);
Author.hasMany(Repo);
Repo.belongsTo(Author);

// Create the tables, add {force: true} as an option to drop the tables
sequelize
  .sync()
  .then(function(err) {
    console.log('It worked!');
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
  });

module.exports = {
  Author: Author,
  Keyframe: Keyframe,
  Repo: Repo
};