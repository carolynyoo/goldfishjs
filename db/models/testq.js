var models = require('./');
var Keyframe = models.Keyframe;

Keyframe
  .create({
    filename: "filepath",
    text_state: "text",
    event_type: "event",
    last_commit: "test commit text",
    branch_name: "git branch placeholder"
  })
  .then(function(keyframe) {
    console.log("keyframe create successful: ", keyframe.get({plain: true})); 
    // console.log("keyframe create: ", keyframe);
  }).catch(function(err) {
    console.log("keyframe create error: ", err);
  });
 
  // Keyframe
  //   .findAll()
  //   .then(function(allKeys) {
  //     // console.log("oldKeyFrame retrieved: ", oldKeyFrame.id);

  //     console.log("Add to Keys successful", allKeys.map(function(el) {
  //       return el.get({plain: true});
  //     }));

  //   }).catch(function(err) {
  //     console.log("Add to Keys error: ", err);
  //   });