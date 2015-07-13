var moment = require('moment');
moment().format();

app.filter('myDateFormat', function myDateFormat($filter){
  return function(text){
    var num = parseInt(text, 10);
    var milli = num * 1000;

    var time = moment(milli);
    return time.format("lll");
  };
});