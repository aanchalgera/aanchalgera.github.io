import React from 'react';
import { Snackbar, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import RepostSiteOptions from 'components/Editor/Difundir/RepostSiteOptions';
import { SchedulePost } from 'components/Editor/Publish/SchedulePost';
import { Label } from 'components/Editor/Publish';
import { currentHour, isFuture } from './lib/momentHelper';
import { validateDate } from './lib/helpers';
import {
  getPost,
  updatePost,
  submitRepostedBlogsToBackend,
  republishPostNow,
  republishSchedule
} from './lib/service';
import { toggleItem } from 'lib/helpers';

const POST_REPUBLISHED = 'Post successfully republished again';
const ERROR = 'Something went wrong';
const ALREADY_SCHEDULED = 'Post already scheduled to republish at ';
const REPUBLISHED = 'Post successfully scheduled to republish at  ';
const CROSSPOST_SUCCESS = 'Crosspost enviado';

type Props = {
  match: { params: Object },
  blogUrl: string,
  blogName: string,
  handleDifundir: (status: string, date: string) => void
};

class Difundir extends React.PureComponent {
  state = {
    id: '',
    postId: '',
    postRepostBlogNames: [],
    publishedDate: currentHour(),
    publishRegion: [],
    snackbarOpen: false,
    snackbarMessage: ''
  };
  props: Props;

  componentDidMount() {
    this.init();
  }

  async init() {
    const postname = this.props.match.params.postname;
    const data = await getPost(postname);
    this.setState({
      id: data.id,
      postRepostBlogNames: data.publishData.postRepostBlogNames || [],
      publishRegion: data.publishData.publishRegion || [],
      postId: data.publishData.postId,
      postHash: data.publishData.postHash,
      postDate: data.publishData.postDate
    });
    this.props.handleDifundir(data.status, this.state.postDate);
  }

  setRepostBlogs = (blogName: string, isChecked: boolean) => {
    this.setState(prevState => ({
      postRepostBlogNames: toggleItem(blogName, prevState.postRepostBlogNames)
    }));
  };

  submitRepostedBlogs = async () => {
    const publishData = {
      postDate: this.state.postDate,
      publishRegion: this.state.publishRegion,
      postRepostBlogNames: this.state.postRepostBlogNames,
      postId: this.state.postId,
      postHash: this.state.postHash
    };

    const backendData = {
      postform: {
        postRepostBlogNames: this.state.postRepostBlogNames,
        postId: this.state.postId
      }
    };

    try {
      await submitRepostedBlogsToBackend(backendData, this.props.blogUrl);
      await updatePost(this.state.id, publishData);
      this.showSnackbarMsg(CROSSPOST_SUCCESS);
    } catch (err) {
      this.showSnackbarMsg('Something Went Wrong.');
    }
  };

  showSnackbarMsg = (snackbarMessage: string) => {
    this.setState({
      snackbarOpen: true,
      snackbarMessage
    });
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  onRepublishSchedule = async () => {
    try {
      const data = await republishSchedule(
        this.props.blogUrl,
        this.state.postId,
        this.state.publishedDate
      );
      if ('already_scheduled' === data.status) {
        this.showSnackbarMsg(ALREADY_SCHEDULED + data.date);
      } else {
        this.showSnackbarMsg(REPUBLISHED + this.state.publishedDate);
      }
    } catch (error) {
      this.showSnackbarMsg(ERROR);
    }
  };

  updateParent = (data: Object) => {
    this.setState(data);
  };

  onRepublishNow = async () => {
    try {
      await republishPostNow(this.props.blogUrl, this.state.postId);
      this.showSnackbarMsg(POST_REPUBLISHED);
    } catch (error) {
      this.showSnackbarMsg(ERROR);
    }
  };

  render() {
    if (!this.state.id) {
      return 'Loading...';
    }
    const isValid = validateDate(this.state.publishedDate, 'future');
    return (
      <div className="grid-wrapper grid-l">
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={5000}
          onRequestClose={this.handleSnackbarClose}
        />
        <RepostSiteOptions
          setRepostBlogs={this.setRepostBlogs}
          repostBlogs={this.state.postRepostBlogNames}
          blogName={this.props.blogName}
          submitRepostedBlogs={this.submitRepostedBlogs}
        />
        {!isFuture(this.state.postDate) && (
          <Row className="bottom-xs">
            <Col sm={12}>
              <Label label="Volver a publicar en portada" />
            </Col>
            <Col sm={6}>
              <SchedulePost
                date={this.state.publishedDate}
                onSchedule={this.onRepublishSchedule}
                updateParent={this.updateParent}
              />
              <RaisedButton
                label="PROGRAMAR"
                onClick={this.onRepublishSchedule}
                secondary={true}
                className="btn-align"
                disabled={!isValid}
              />
            </Col>
            <Col sm={2} />
            <Col className="end-sm" sm={4}>
              <RaisedButton
                label="PASAR POR PORTADA AHORA MISMO!"
                primary={true}
                onClick={this.onRepublishNow}
                disabled={!isValid}
              />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default Difundir;
