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
  OtherCategories
} from '../components/Editor/Publish/index';
import configParams from '../config/configs.js';
import {
  getPost,
  submitPostToBackend,
  savePostsList,
  savePost
} from './lib/service.js';
import { initialState, loadStatefromData } from './lib/helpers.js';

moment.tz.setDefault(configParams.timezone);
const PUBLISH_POST_WARNING = 'You can not reschedule already published post';
const VALID_DATE_WARNING = 'Please select a valid date, future date';
const MAIN_IMAGE_WARNING = 'Add homepage image to publish this post';
const SAVING_DATA_ERROR_WARNING = 'Error occured while saving data';
const IMAGE_CROP_WARNING =
  'Es necesario validar los recortes de las imágenes para poder publicar';

class Publish extends React.Component {
  state = initialState;

  componentWillMount() {
    this.init();
  }

  init() {
    getPost(this.props.postname, this.props.base).then(data => {
      if (data != null) {
        this.setState(loadStatefromData(data));
      }
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

  onSchedule(date, postSchedule) {
    if (this.isValid()) {
      return this.submitPost(date, postSchedule);
    }
    postSchedule();
  }

  enableButton() {
    this.setState({
      buttonDisabled: false
    });
  }

  isValid() {
    let isError = false,
      message;
    if ('publish' === this.state.status) {
      if (
        moment(this.state.publishedDate, 'DD/MM/YYYY HH:mm:ss').isBefore(
          moment()
        )
      ) {
        this.setMessage(true, PUBLISH_POST_WARNING);
      }
    } else if (!this.state.meta.homepage.image) {
      isError = true;
      message = MAIN_IMAGE_WARNING;
    }

    for (let key in this.state.crop) {
      if (!this.state.crop[key]['validate']) {
        isError = true;
        message = IMAGE_CROP_WARNING;
      }
    }

    this.setMessage(isError, message);
    return !isError;
  }

  onInvalidDate() {
    this.setMessage(true, VALID_DATE_WARNING);
  }

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

  handleRequestClose() {
    this.setState({
      snackbarOpen: false
    });
  }

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
    this.state.meta.homepage.content = value;
    this.setState({ meta: this.state.meta });
  };

  savePostData = () => {
    savePost(this.state, this.props.base);
  };

  onCropChange(shape, crop) {
    this.setState(prevState => {
      prevState['crop'][shape] = crop;
      return {
        crop: prevState['crop']
      };
    });
  }

  onCropValidate(shape, validate) {
    this.setState(prevState => {
      prevState['crop'][shape]['validate'] = validate;
      return {
        crop: prevState['crop']
      };
    }, this.savePostData);
  }

  setCategory = categorySelected => {
    this.setState(() => {
      return {
        category: categorySelected
      };
    });
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.SnackbarMessage}
          autoHideDuration={5000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
        <SchedulePost
          buttonDisabled={this.state.buttonDisabled}
          value={this.state.publishedDate}
          base={this.props.base}
          onSchedule={this.onSchedule.bind(this)}
          onInvalidDate={this.onInvalidDate.bind(this)}
        />
        <div>
          <Row>
            <Col xs={3}>
              <Categories
                category={this.state.category}
                setCategory={this.setCategory}
                blogUrl={this.props.blogUrl}
              />
            </Col>
            <Col xs={3}>
              <OtherCategories
                otherCategories={this.state.otherCategories}
                updateParent={this.updateParent}
                blogUrl={this.props.blogUrl}
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
              onCropChange={this.onCropChange.bind(this)}
              onCropValidate={this.onCropValidate.bind(this)}
              crop={this.state.crop}
            />}
        </div>
        <Row>
          <Col xs>
            <Seo
              seo={
                this.state.meta.seo
                  ? this.state.meta.seo
                  : { title: '', description: '' }
              }
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
              userId={parseInt(this.props.userId)}
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
