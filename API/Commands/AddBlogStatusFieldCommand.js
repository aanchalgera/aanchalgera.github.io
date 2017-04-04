let firebase    = require('firebase')
,   env         = process.env.NODE_ENV || 'development'
,   envConfig   = require(`../Config/config.${env}.json`)
,   firebaseApp = firebase.initializeApp(envConfig)
;

firebaseApp.database().ref('posts/').once('value', function(snap) {
  snap.forEach(function(data) {
    let dataVal = data.val();
    let postType = 'normal';
    if (dataVal.meta.sponsor.image) {
      postType = 'club';
    }
    let blogPostType = dataVal.blog_status + '_' + postType;
    firebaseApp.database().ref('posts_list/'+ dataVal.id).update({blog_post_type: blogPostType});
  });
});

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

firebaseApp.database().ref('posts/').once('value', function(snap) {
  snap.forEach(function(data) {
    let dataVal = data.val();
    addFieldsForExistingPosts(dataVal);
    firebaseApp.database().ref('posts/' + dataVal.id).update({meta: dataVal.meta});
  });
});

function addFieldsForExistingPosts(data) {
  if (data.meta) {
    if ('undefined' === typeof data.meta.social) {
      data.meta.social = {
        facebook: '',
        twitter: ''
      };
    }

    if ('undefined' === typeof data.meta.comment) {
      data.meta.comment = {
        allow: false,
        status: 'open'
      };
    }

    if ('undefined' === typeof data.meta.showSocialShareButtons) {
      data.meta.showSocialShareButtons = true;
    }

    if ('undefined' === typeof data.meta.author || 'undefined' === typeof data.meta.author.showAuthorInfo) {
      data.meta.author = {
        showAuthorInfo: false
      }
    }

    if ('undefined' === typeof data.meta.showDate) {
      data.meta.showDate = data.meta.author.showAuthorInfo;
    }

    if ('undefined' === typeof data.meta.footer || 'undefined' === typeof data.meta.footer.hideFooter) {
      data.meta.footer = {
        hideFooter: false,
        content: data.meta.footer || ''
      };
    }

  }
}
