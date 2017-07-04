import React from 'react';

import RepostBlogsOptions from '../components/Editor/DraftJSEditor/RepostBlogsOptions';

const styles = {
  bodyContent: {
    padding: '24px',
  }
};

class Difundir extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postRepostBlogNames: [],
    };
  }

  setRepostBlogs = (blogName, isChecked) => {
    let postRepostBlogNames = this.state.postRepostBlogNames;

    if (isChecked) {
      postRepostBlogNames.push(blogName);
    } else {
      const index = postRepostBlogNames.indexOf(blogName);
      postRepostBlogNames = [
        ...postRepostBlogNames.slice(0, index),
        ...postRepostBlogNames.slice(index + 1)
      ];
    }
    this.setState({postRepostBlogNames});
  }

  render() {
    return (
      <div style={styles.bodyContent}>
        <RepostBlogsOptions 
          setRepostBlogs={this.setRepostBlogs}
          repostBlogs={this.state.postRepostBlogNames}
        />
      </div>
    );
  }
}

export default Difundir;
