var Sequelize = require('sequelize'),
    sequelize = new Sequelize('git-playback', 'root', null, {
      dialect: 'sqlite',
      port: 3306
    });

sequelize
  .authenticate()
  .complete(function (err) {
    if (!!err) {
      console.log('Unable to connect to the database', err);
    } else {
      console.log('Connection has been established successfully');
    }
  });

  var Keyframe = require('./keyframe')(sequelize);
  var Author = require('./author')(sequelize);
  var Repo = require('./repo')(sequelize);

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