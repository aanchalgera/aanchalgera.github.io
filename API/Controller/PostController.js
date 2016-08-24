import firebase from 'firebase';

var firebaseApp = firebase.initializeApp(envConfig);
export default class Controller {

  static getPost(req, res, next) {
    firebaseApp.database().ref('posts/'+ req.params.id).once('value', function(snap) {
      if (snap.val()) {
        res.send(snap.val());
      } else {
        res.send("No such post");
      }
    });
  }

  static updatePost(req, res, next) {
    console.log(req.params.id);
    firebaseApp.database().ref('posts/'+ req.params.id).once('value', function(snap) {
      if (snap.val()) {
        var user_status = snap.val().blogName+'_'+ snap.val().user_id + '_' + req.query.status;
        var blog_status = snap.val().blogName+'_'+req.query.status;
        firebaseApp.database().ref('posts/'+ req.params.id).update({
		'status': req.query.status,
		'user_status' : user_status,
		'blog_status' : blog_status,
		'publishData/postStatus' : req.query.status
	});
        firebaseApp.database().ref('posts_list/'+ req.params.id).update({
		'status' : req.query.status,
		'user_status' : user_status,
		'blog_status' : blog_status});
        res.send("done");
      }else{
        res.send("No such post");
      }
    });
  }
}

