app.service('ValuesService', function(){
  this.Keyframe = dbFactory.setDb(appPath);
  this.AppConfig = dbFactory;
});