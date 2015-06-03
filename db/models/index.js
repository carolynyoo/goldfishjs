var Sequelize = require('sequelize'),
    sequelize = new Sequelize('git-playback', 'root', null, {
      dialect: 'sqlite',
      port: 3306
    });

sequelize
  .authenticate()
  .complete(function (err) {
    if (!!err) {
      console.log('Unable to connect to the database', err)
    } else {
      console.log('Connection has been established successfully')
    }
  })

  var x =1; 
  var y = 2;
  var z = 3;
  var i = 0;
  var j = 2;