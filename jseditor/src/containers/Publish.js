import React from 'react';
import moment from 'moment-timezone';
import { Snackbar, Divider } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import {
  AdvancedOptions,
  Categories,
  ImageCropper,
  SchedulePost,
  HomePage,
  Seo,
  Twitter,
  Facebook,
  CountriesFormOptions,
  Tags,
  OtherCategories,
  DraftButton
} from '../components/Editor/Publish/index';
import configParams from '../config/configs.js';
import {
  getPost,
  submitPostToBackend,
  savePostsList,
  savePost,
  loadAllCategories
} from './lib/service.js';
import {
  initialState,
  loadStatefromData,
  filterCategories,
  validateState
} from './lib/helpers.js';

moment.tz.setDefault(configParams.timezone);

const VALID_DATE_WARNING = 'Please select a valid future date';
const SAVING_DATA_ERROR_WARNING = 'Error occured while saving data';
const POST_TYPE = 'normal';

class Publish extends React.Component {
  state = initialState;

  componentWillMount() {
    this.init();
    this.setAllCategories();
  }

  init() {
    getPost(this.props.postname, this.props.base).then(data => {
      if (data != null) {
        this.setState(loadStatefromData(data));
      }
      this.props.handleDifundir(data.status);
    });
  }

  submitPost(date, postSchedule) {
    submitPostToBackend(this.state, date, this.props.blogUrl)
      .fail(() => this.setMessage(true, SAVING_DATA_ERROR_WARNING))
      .then(result => {
        if (result.id !== undefined) {
          this.setState(
            {
              postId: result.id,
              postHash: result.post_hash,
              status: 'publish',
              publishedDate: date,
              snackbarOpen: true,
              SnackbarMessage:
                'Changes has been saved. Post scheduled for ' +
                moment(date, 'DD-MM-YYYY HH:mm').format('LLLL')
            },
            this.savePostData
          );
          this.props.handleDifundir('publish');
        }
        savePostsList(this.state, this.props.base, this.blogName);
        this.enableButton();
      })
      .always(postSchedule);
  }

  setPostMeta = (key, value) => {
    let meta = this.state.meta;
    meta[key] = value;
    this.setState({ meta }, this.savePostData);
  };

  onSchedule = (date, postSchedule) => {
    if (this.isValid()) {
      return this.submitPost(date, postSchedule);
    }
    postSchedule();
  };

  enableButton() {
    this.setState({
      buttonDisabled: false
    });
  }

  isValid() {
    const { isError, message } = validateState(this.state);
    this.setMessage(isError, message);
    return !isError;
  }

  onInvalidDate = () => {
    this.setMessage(true, VALID_DATE_WARNING);
  };

  setMessage(isError, message) {
    let params = {
      isError: isError,
      message: message
    };
    if (isError) {
      params.buttonDisabled = false;
    }
    this.setState(params);
  }

  handleRequestClose = () => {
    this.setState({
      snackbarOpen: false
    });
  };

  updateParent = data => {
    this.setState(data, this.savePostData);
  };

  updateSocialFacebookText = event => {
    let meta = this.state.meta;
    meta.social.facebook = event.target.value;
    this.setState({ meta });
  };

  updateSocialTwitterText = event => {
    let meta = this.state.meta;
    meta.social.twitter = event.target.value;
    this.setState({ meta });
  };

  updateHomepageContent = value => {
    let meta = this.state.meta;
    meta.homepage.content = value;
    this.setState({ meta });
  };

  savePostData = () => {
    savePost(this.state, this.props.base);
  };

  onCropChange = (shape, crop) => {
    this.setState(prevState => {
      prevState['crop'][shape] = crop;
      return {
        crop: prevState['crop']
      };
    });
  };

  onCropValidate = (shape, validate) => {
    this.setState(prevState => {
      prevState['crop'][shape]['validate'] = validate;
      return {
        crop: prevState['crop']
      };
    }, this.savePostData);
  };

  setAllCategories = async () => {
    let categories = await loadAllCategories(this.props.blogUrl, POST_TYPE);
    let updatedCategories = filterCategories(categories);
    this.setState({ allCategories: updatedCategories });
  };

  render() {
    return (
      <div className="grid-wrapper grid-l">
        <span style={{ color: 'red' }}>
          {this.state.message}
        </span>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.SnackbarMessage}
          autoHideDuration={5000}
          onRequestClose={this.handleRequestClose}
        />
        <Row>
          <Col xs={6}>
            <SchedulePost
              buttonDisabled={this.state.buttonDisabled}
              value={this.state.publishedDate}
              base={this.props.base}
              onSchedule={this.onSchedule}
              onInvalidDate={this.onInvalidDate}
            />
          </Col>
          <Col xs={4} />
          <Col xs={2}>
            <DraftButton
              status={this.state.status}
              updateParent={this.updateParent}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <Categories
              category={this.state.category}
              updateParent={this.updateParent}
              allCategories={this.state.allCategories}
            />
          </Col>
          <Col xs={3}>
            <OtherCategories
              otherCategories={this.state.otherCategories}
              updateParent={this.updateParent}
              allCategories={this.state.allCategories}
            />
          </Col>
          <Col xs={3}>
            <Tags
              blogUrl={this.props.blogUrl}
              tags={this.state.tags}
              updateParent={this.updateParent}
            />
          </Col>
        </Row>

        <h4>Portada y redes sociales</h4>
        <Divider />
        <Row>
          <Col xs={6}>
            <HomePage
              homepage={this.state.meta.homepage}
              updateHomepageContent={this.updateHomepageContent}
            />
          </Col>
          <Col xs={3}>
            <Twitter
              twitter={this.state.meta.social.twitter}
              updateSocialTwitterText={this.updateSocialTwitterText}
            />
          </Col>
          <Col xs={3}>
            <Facebook
              facebook={this.state.meta.social.facebook}
              updateSocialFacebookText={this.updateSocialFacebookText}
            />
          </Col>
        </Row>
        {this.state.meta.homepage.image &&
          <ImageCropper
            imageSrc={this.state.meta.homepage.image.url}
            onCropChange={this.onCropChange}
            onCropValidate={this.onCropValidate}
            crop={this.state.crop}
          />}
        <Row>
          <Col xs>
            <Seo
              seo={this.state.meta.seo || { title: '', description: '' }}
              setPostMeta={this.setPostMeta}
            />
          </Col>
          <Col xs>
            <CountriesFormOptions
              updateParent={this.updateParent}
              publishRegions={this.state.publishRegion}
            />
          </Col>
          <Col xs>
            <AdvancedOptions
              blogUrl={this.props.blogUrl}
              userId={this.props.userId}
              setPostMeta={this.setPostMeta}
              updateParent={this.updateParent}
              postMeta={this.state.meta}
              specialPost={this.state.specialPost}
              isSensitive={this.state.isSensitive}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Publish;
