// @flow
import React from 'react';
import moment from 'moment-timezone';
import { Snackbar, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import RepostSiteOptions from '../components/Editor/Difundir/RepostSiteOptions';
import { SchedulePost } from '../components/Editor/Publish/SchedulePost';
import { Label } from '../components/Editor/Publish';
import configParams from '../config/configs';
import {
  getPost,
  updatePost,
  submitRepostedBlogsToBackend,
  republishPostNow,
  republishSchedule
} from './lib/service';
import { toggleItem } from '../components/Editor/Publish/lib/publishHelpers';

moment.tz.setDefault(configParams.timezone);

const POST_REPUBLISHED = 'Post successfully republished again';
const ERROR = 'Something went wrong';
const ALREADY_SCHEDULED = 'Post already scheduled to republish at ';
const REPUBLISHED = 'Post successfully scheduled to republish at  ';

type Props = {
  base: Object,
  match: { params: Object },
  blogUrl: string,
  blogName: string,
  handleDifundir: (status: string, date: string) => void
};

class Difundir extends React.Component {
  state = {
    id: '',
    postId: '',
    postRepostBlogNames: [],
    publishedDate: moment().add(1, 'hours').format('DD/MM/YYYY HH:00'),
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
    const data = await getPost(postname, this.props.base);
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
    let postRepostBlogNames = this.state.postRepostBlogNames;
    toggleItem(blogName, postRepostBlogNames);
    this.setState({ postRepostBlogNames });
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
      await updatePost(this.state.id, this.props.base, publishData);
      this.showSnackbarMsg('Data Saved Successfully');
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

  isFuture = () => {
    const currentTime = moment().format('DD/MM/YYYY H:mm');
    return currentTime >= this.state.postDate ? true : false;
  };

  render() {
    const isFuture = this.isFuture();
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
        {isFuture &&
          <Row>
            <Col xs={12}>
              <Label label="Volver a publicar en portada" />
            </Col>
            <Col xs={5}>
              <SchedulePost
                date={this.state.publishedDate}
                base={this.props.base}
                onSchedule={this.onRepublishSchedule}
                updateParent={this.updateParent}
              />
            </Col>
            <Col xs={1}>
              <RaisedButton
                label="PROGRAMAR"
                onClick={this.onRepublishSchedule}
                primary={true}
              />
            </Col>
            <Col xs={3} />
            <Col xs={3}>
              <RaisedButton
                label="PASAR POR PORTADA AHORA MISMO!"
                secondary={true}
                onTouchTap={this.onRepublishNow}
              />
            </Col>
          </Row>}
      </div>
    );
  }
}

export default Difundir;
