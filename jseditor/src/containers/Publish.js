import React from 'react';
import moment from 'moment-timezone';
import { Snackbar, Divider, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import {
  AdvancedOptions,
  Categories,
  CountriesFormOptions,
  DraftButton,
  Facebook,
  ImageCropper,
  HomePage,
  Label,
  OtherCategories,
  SchedulePost,
  Seo,
  SponsoredContent,
  Tags,
  Twitter
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

import { Check } from './lib/check';

moment.tz.setDefault(configParams.timezone);

const SAVING_DATA_ERROR_WARNING = 'Error occured while saving data';
const SAVED_MESSAGE = 'Changes has been saved. Post scheduled for ';

class Publish extends React.Component {
  state = initialState;

  componentWillMount() {
    this.init();
  }

  init() {
    getPost(this.props.postname, this.props.base).then(data => {
      if (data != null) {
        this.setState(loadStatefromData(data));
        this.setAllCategories(data.postType);
        this.props.handleDifundir(data.status);
      }
    });
  }

  submitPost() {
    let date = this.state.date;
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
                SAVED_MESSAGE + moment(date, 'DD-MM-YYYY HH:mm').format('LLLL')
            },
            this.savePostData
          );
          this.props.handleDifundir('publish');
        }
        savePostsList(this.state, this.props.base, this.blogName);
        this.enableButton();
      });
  }

  setPostMeta = (key, value) => {
    let meta = this.state.meta;
    meta[key] = value;
    this.setState({ meta }, this.savePostData);
  };

  onSchedule = () => {
    if (this.isValid()) {
      return this.submitPost();
    }
  };

  enableButton() {
    this.setState({
      buttonDisabled: false
    });
  }

  isValid() {
    const { isError, message } = validateState(this.state);
    if (isError) {
      this.setMessage(isError, message);
    }
    return !isError;
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

  handleRequestClose = () => {
    this.setState({ snackbarOpen: false });
  };

  updateParent = data => {
    this.setState(data, this.savePostData);
  };

  updateSocialFacebookText = event => {
    let meta = this.state.meta;
    meta.social.facebook = event.target.value;
    this.setState({ meta }, this.savePostData);
  };

  updateSocialTwitterText = event => {
    let meta = this.state.meta;
    meta.social.twitter = event.target.value;
    this.setState({ meta }, this.savePostData);
  };

  updateHomepageContent = value => {
    let meta = this.state.meta;
    meta.homepage.content = value;
    this.setState({ meta }, this.savePostData);
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
    }, this.savePostData);
  };

  onCropValidate = (shape, validate) => {
    this.setState(prevState => {
      prevState['crop'][shape]['validate'] = validate;
      return {
        crop: prevState['crop']
      };
    }, this.savePostData);
  };

  setAllCategories = async postType => {
    let categories = await loadAllCategories(
      this.props.blogUrl,
      this.state.postType
    );
    let updatedCategories = filterCategories(categories);
    this.setState({ allCategories: updatedCategories });
  };

  handleStatusUpdate = () => {
    submitPostToBackend(this.state, this.state.date, this.props.blogUrl)
      .fail(() => this.setMessage(true, SAVING_DATA_ERROR_WARNING))
      .then(() => {
        savePostsList(this.state, this.props.base, this.blogName);
      });
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
          <Col xs={5}>
            <SchedulePost
              date={this.state.publishedDate}
              base={this.props.base}
              updateParent={this.updateParent}
            />
          </Col>
          <Col xs={1}>
            <RaisedButton
              label="PROGRAMAR"
              disabled={this.state.buttonDisabled}
              onClick={this.onSchedule}
              primary={true}
            />
          </Col>
          <Col xs={4} />
          <Col xs={2}>
            <DraftButton
              status={this.state.status}
              updateParent={this.updateParent}
              handleStatusUpdate={this.handleStatusUpdate}
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
        <Label label="Portada y redes sociales" />
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
        <Check
          postType={this.state.postType}
          userRole="editor"
          component="SponsoredContent"
        >
          <SponsoredContent
            customerName={this.state.customerName}
            logo={this.state.logo}
            urlTracker={this.state.urlTracker}
            updateParent={this.updateParent}
          />
        </Check>
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
              userId={this.state.userId}
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
