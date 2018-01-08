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
 
  static deletePost(req, res, next) {
    firebaseApp.database().ref('posts/'+ req.params.id).remove();
    firebaseApp.database().ref('posts_list/'+ req.params.id).remove();
    res.send("done");
  }

  static updateStatus(post, req){
    var user_status = post.blogName+'_'+ post.user_id + '_' + req.query.status;
    var blog_status = post.blogName+'_'+req.query.status;

    firebaseApp.database().ref('posts/'+ req.params.id).update({
      'status': req.query.status,
      'user_status' : user_status,
      'blog_status' : blog_status,
    });
    if (post.postType === 'longform' || post.postType === 'brandedLongform') {
    firebaseApp.database().ref('posts_list/'+ req.params.id).update({
      'status' : req.query.status,
      'user_status' : user_status,
      'blog_status' : blog_status
    });
    }
  }

  static updatePost(req, res, next) {
    firebaseApp.database().ref('posts/'+ req.params.id).once('value', function(snap) {
      const post = snap.val();
      if (post) {
          if(req.query.status) {
            Contorller.updateStatus(post, req);
          } else if(req.query.post_date) {
            firebaseApp.database().ref('posts/'+ req.params.id + '/publishData').update({
              'postDate': req.query.post_date,
            });
          }

        res.send("done");
      } else {
        res.send("No such post");
      }
    });
  }

  static getPosts(req, res, next) {
    var query = firebaseApp.database().ref('posts_list/');

    if (req.query.status) {
      if (req.query.userId) {
        query = query.orderByChild("user_status").equalTo(req.params.blogName + '_' + req.query.userId + '_' + req.query.status);
      } else if (req.query.type) {
        query = query.orderByChild("blog_post_type").equalTo(req.params.blogName + '_' + req.query.status + '_' + req.query.type);
      } else {
        query = query.orderByChild("blog_status").equalTo(req.params.blogName + '_' + req.query.status);
      }
    }

    if (req.query.limit) {
      query = query.limitToLast(parseInt(req.query.limit));
    };

    query.once('value', function(snap) {
      if (snap.val()) {
        res.send(snap.val());
      } else {
        res.send("No Post Found");
      }
    });
  }

}
