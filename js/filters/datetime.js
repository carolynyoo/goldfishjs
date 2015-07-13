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

app.filter('myDateFormat', function myDateFormat($filter){
  return function(text){
    var  tempdate = new Date(text);
    return $filter('date')(tempdate, "MMM-dd-yyyy");
  };
});