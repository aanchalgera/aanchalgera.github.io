import firebase from 'firebase';

var firebaseApp = firebase.initializeApp(
  {
    'apiKey': 'JCIDuff5nTLMU6zfXXtcVjIzmvkvgruL573ldNdC',
    'databaseURL': 'https://dazzling-torch-3017.firebaseio.com/'
  }
);
export default class Controller {

  static putPost(req, res, next) {
    firebaseApp.database().ref('posts/'+ req.params.id).once('value', function(snap) {
      if (snap.val()) {
        var user_status = snap.val().blogname+'_'+ snap.val().user_id + '_' + req.query.status;
        firebaseApp.database().ref('posts/'+ req.params.id).set({status: req.query.status,user_status: user_status});
      }
    });
    res.send("done");
  }
}
