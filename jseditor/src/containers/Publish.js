import React from 'react';
import moment from 'moment-timezone';
import { Snackbar, RaisedButton } from 'material-ui';
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
} from 'components/Editor/Publish';
import configParams from 'config/configs.js';
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
  validateState,
  validateDate,
  findByName
} from './lib/helpers.js';
import { Check } from './lib/check';

moment.tz.setDefault(configParams.timezone);

const SAVING_DATA_ERROR_WARNING = 'Error occured while saving data';
const SAVED_MESSAGE = 'Tu post está programado, se publicará el ';
const DRAFT_MESSAGE = 'El post se ha pasado a borrador correctamente';
const UPDATED_MESSAGE = 'Guardado correctamente';

type Props = {
  base: Object,
  match: { params: Object },
  blogUrl: string,
  blogName: string,
  handleDifundir: (status: string, date: string) => void
};

class Publish extends React.Component {
  state = initialState;
  props: Props;

  componentDidMount() {
    this.init();
  }

  async init() {
    const postname = this.props.match.params.postname;
    const post = await getPost(postname, this.props.base);
    this.setState(loadStatefromData(post, this.props.userRole));
    if ('brandedLongform' === post.postType && !this.state.category) {
      this.setBrandedLongformCategory();
    } else {
      this.setAllCategories(post.postType);
    }
    this.props.handleDifundir(post.status, this.state.publishedDate);
  }

  submitPost = async () => {
    let date = this.state.publishedDate;
    let state = this.state;
    state.status = 'publish';
    try {
      const result = await submitPostToBackend(state, this.props.blogUrl);
      this.setState(
        {
          postId: result.id,
          postHash: result.post_hash,
          status: 'publish',
          publishedDate: date,
          message: '',
          snackbarOpen: true,
          SnackbarMessage: SAVED_MESSAGE + date
        },
        this.savePostData
      );
      this.props.handleDifundir('publish', date);
      savePostsList(this.state, this.props.base, this.props.blogName);
      this.enableButton();
    } catch (error) {
      this.setMessage(true, SAVING_DATA_ERROR_WARNING);
    }
  };

  setPostMeta = (key: string, value: Object) => {
    let meta = this.state.meta;
    meta[key] = value;
    this.setState({ meta }, this.savePostData);
  };

  onSchedule = () => {
    if (validateDate(this.state.publishedDate)) {
      if (this.isValid()) {
        return this.submitPost();
      }
    } else {
      this.setMessage(true, 'Invalid Date');
    }
  };

  updateDate = date => {
    if (validateDate(date)) {
      this.setState(prevState => {
        prevState['errors']['dateError'] = '';
        return {
          publishedDate: date,
          errors: prevState['errors']
        };
      }, this.savePostData);
    } else {
      this.setState(prevState => {
        prevState['errors']['dateError'] = 'Invalid Date';
        return {
          errors: prevState['errors'],
          publishedDate: date
        };
      });
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

  setMessage(isError: boolean, message: string) {
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

  updateParent = (data: Object) => {
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
    let categories = await loadAllCategories(this.props.blogUrl, postType);
    let updatedCategories = filterCategories(categories);
    this.setState({ allCategories: updatedCategories });
  };

  handleStatusUpdate = async () => {
    let state = this.state;
    state.status = 'draft';
    try {
      await submitPostToBackend(state, this.props.blogUrl);
      this.setState({
        status: 'draft',
        snackbarOpen: true,
        SnackbarMessage: DRAFT_MESSAGE
      });
      savePostsList(state, this.props.base, this.props.blogName);
      this.props.handleDifundir('draft', this.state.publishedDate);
    } catch (err) {
      console.log(err);
      this.setMessage(true, SAVING_DATA_ERROR_WARNING);
    }
  };

  handleUpdate = async () => {
    if (this.isValid()) {
      try {
        await submitPostToBackend(this.state, this.props.blogUrl);
        this.setState({
          message: '',
          snackbarOpen: true,
          SnackbarMessage: UPDATED_MESSAGE
        });
      } catch (err) {
        this.setMessage(true, SAVING_DATA_ERROR_WARNING);
      }
    }
  };

  setBrandedLongformCategory = async () => {
    let categories = await loadAllCategories(this.props.blogUrl, 'club');
    let updatedCategories = filterCategories(categories);
    let category = findByName('Especial Branded', updatedCategories);
    this.setState({ category: category['id'] });
  };

  render() {
    let showCalendar = true;
    const currentTime = moment().format('DD/MM/YYYY H:mm');
    if (
      this.state.status === 'publish' &&
      currentTime >= this.state.publishedDate
    ) {
      showCalendar = false;
    }
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
        <Check
          userRole={this.props.userRole}
          postType={this.state.postType}
          childName="PostScheduler"
        >
          <Row className="bottom-xs">
            <Col sm={5}>
              <SchedulePost
                date={this.state.publishedDate}
                base={this.props.base}
                updateParent={this.updateParent}
                showCalendar={showCalendar}
              />
            </Col>
            <Col sm={2}>
              {this.state.status === 'draft'
                ? <RaisedButton
                    label="PROGRAMAR"
                    disabled={this.state.buttonDisabled}
                    onTouchTap={this.onSchedule}
                    primary={true}
                  />
                : <RaisedButton
                    label="GUARDAR CAMBIOS"
                    secondary={true}
                    disabled={this.state.buttonDisabled}
                    onTouchTap={this.handleUpdate}
                  />}
            </Col>
            <Col sm={3} />
            <Col sm={2}>
              <DraftButton
                status={this.state.status}
                handleStatusUpdate={this.handleStatusUpdate}
              />
            </Col>
          </Row>
        </Check>
        <Row>
          <Check
            userRole={this.props.userRole}
            postType={this.state.postType}
            childName="PublicationLabel"
          >
            <Col sm={12}>
              <Label
                label="Detalles de publicación "
                hint="Completa toda la información para que el equipo de WSL Branded Content pueda publicar el artículo"
              />
            </Col>
          </Check>
          <Check
            userRole={this.props.userRole}
            postType={this.state.postType}
            childName="Categories"
          >
            <Col sm={3}>
              <Categories
                category={this.state.category}
                updateParent={this.updateParent}
                allCategories={this.state.allCategories}
              />
            </Col>
          </Check>
          <Check
            userRole={this.props.userRole}
            postType={this.state.postType}
            childName="OtherCategories"
          >
            <Col sm={3}>
              <OtherCategories
                postCategories={this.state.postCategories}
                updateParent={this.updateParent}
                allCategories={this.state.allCategories}
              />
            </Col>
          </Check>
          <Col sm={3}>
            <Tags
              blogUrl={this.props.blogUrl}
              tags={this.state.tags}
              updateParent={this.updateParent}
            />
          </Col>
        </Row>
        <Label label="Portada y redes sociales" />
        <Row>
          <Col sm={6}>
            {this.state.id &&
              <HomePage
                homepage={this.state.meta.homepage}
                updateHomepageContent={this.updateHomepageContent}
              />}
          </Col>
          <Col sm={3}>
            <Twitter
              twitter={this.state.meta.social.twitter}
              updateSocialTwitterText={this.updateSocialTwitterText}
            />
          </Col>
          <Col sm={3}>
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
          userRole={this.props.userRole}
          postType={this.state.postType}
          childName="SponsoredContent"
        >
          <SponsoredContent
            sponsor={this.state.meta.sponsor}
            setPostMeta={this.setPostMeta}
          />
        </Check>
        <Row>
          <Col sm>
            <Seo
              seo={this.state.meta.seo || { title: '', description: '' }}
              setPostMeta={this.setPostMeta}
            />
          </Col>
          <Col sm>
            <Check
              userRole={this.props.userRole}
              postType={this.state.postType}
              childName="CountriesFormOptions"
            >
              <CountriesFormOptions
                updateParent={this.updateParent}
                publishRegions={this.state.publishRegion}
              />
            </Check>
          </Col>
          <Col sm>
            <Check
              userRole={this.props.userRole}
              postType={this.state.postType}
              childName="AdvancedOptions"
            >
              <AdvancedOptions
                blogUrl={this.props.blogUrl}
                userId={this.state.userId}
                setPostMeta={this.setPostMeta}
                updateParent={this.updateParent}
                postMeta={this.state.meta}
                specialPost={this.state.specialPost}
                isSensitive={this.state.isSensitive}
                userRole={this.props.userRole}
                postType={this.state.postType}
                ampVisibility={this.state.ampVisibility}
                iaVisibility={this.state.iaVisibility}
                commentStatus={this.state.commentStatus}
              />
            </Check>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Publish;
