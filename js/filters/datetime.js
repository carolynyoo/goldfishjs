// Filter to convert datetime to human-readable
// app.filter('datetime', function($filter) {
// 	return function(input) {
// 		if(input === null){ 
// 			return ""; 
// 		} 
// 		input = Number(input);
// 		var _date = $filter('date')(new Date(input),
// 	                              'MMM dd yyyy - HH:mm:ss');
// 		return _date;
//  	};
// });

var moment = require('moment');
moment().format();

app.filter('myDateFormat', function myDateFormat($filter){
  return function(text){
    // var  tempdate = new Date(text);
    // return $filter('date')(tempdate, "MMM-dd-yyyy");

    var num = parseInt(text, 10);
    console.log("PARSED TIME: ", num);
    var milli = num * 1000;

    var time = moment(milli);
    var s = time.format("llll");

    console.log("TIME: ", time);
    console.log("MMNT: ", s);
    return s;
  };
});