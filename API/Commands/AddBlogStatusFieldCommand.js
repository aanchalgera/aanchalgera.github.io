let firebase    = require('firebase')
,   env         = process.env.NODE_ENV || 'development'
,   envConfig   = require(`../Config/config.${env}.json`)
,   firebaseApp = firebase.initializeApp(envConfig)
;

firebaseApp.database().ref('posts_list/').once('value', function(snap) {
  snap.forEach(function(data) {
    let dataVal = data.val();
    let blogStatus = dataVal.blog_name + '_' + dataVal.status;
    firebaseApp.database().ref('posts_list/'+ dataVal.id).update({blog_status: blogStatus});
  });
});

firebaseApp.database().ref('posts/').once('value', function(snap) {
  snap.forEach(function(data) {
    let dataVal = data.val();
    let blogStatus = dataVal.blogName + '_' + dataVal.status;
    firebaseApp.database().ref('posts/' + dataVal.id).update({blog_status: blogStatus});
  });
});
