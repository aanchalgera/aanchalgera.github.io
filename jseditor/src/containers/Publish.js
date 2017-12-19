import React from 'react';
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
import {
  getPost,
  submitPostToBackend,
  savePostsList,
  savePost
} from './lib/service.js';
import {
  initialState,
  loadStatefromData,
  loadPublishData,
  validateState,
  findByName
} from './lib/helpers.js';
import { Check, init as initCheck } from 'lib/check';
import { filterCategories } from 'lib/helpers';
import { loadAllCategories } from 'lib/service';
import { postImages } from 'components/Editor/ImageUploader/lib/s3ImageUploadService';

const SAVING_DATA_ERROR_WARNING = 'Error occured while saving data';
const SAVED_MESSAGE = 'Tu post está programado, se publicará el ';
const DRAFT_MESSAGE = 'El post se ha pasado a borrador correctamente';
const UPDATED_MESSAGE = 'Guardado correctamente';

type Props = {
  match: { params: Object },
  blogUrl: string,
  blogName: string,
  userRole: string,
  handleDifundir: (status: string, date: string) => void
};

class Publish extends React.Component<Props> {
  state = initialState;

  componentDidMount() {
    this.init();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.id ? 'true' : false;
  }
  publishData: [];

  async init() {
    const postname = this.props.match.params.postname;
    const post = await getPost(postname);
    this.publishData = loadPublishData(post);
    this.setState(loadStatefromData(post, this.props.userRole));

    if ('brandedLongform' === post.postType && !this.state.category) {
      this.setBrandedLongformCategory();
    } else {
      this.setAllCategories(post.postType);
    }
    this.props.handleDifundir(post.status, this.state.publishedDate);
    initCheck(post.postType, this.props.userRole);
  }

  submitPost = async () => {
    let date = this.state.publishedDate;
    let state = this.state;
    state.status = 'publish';
    try {
      const result = await submitPostToBackend(
        { ...state, ...this.publishData },
        this.props.blogUrl
      );
      this.publishData = {
        postId: result.id,
        postHash: result.post_hash
      };
      this.setState(
        {
          status: 'publish',
          currentStatus: 'future',
          publishedDate: date,
          message: '',
          snackbarOpen: true,
          SnackbarMessage: SAVED_MESSAGE + date
        },
        this.savePostData
      );
      this.props.handleDifundir('publish', date);
      savePostsList(this.state, this.props.blogName);
      this.enableButton();
    } catch (error) {
      this.setMessage(true, SAVING_DATA_ERROR_WARNING);
    }
  };

  setPostMeta = (key: string, value: Object) => {
    this.setState(prevState => {
      return {
        meta: { ...prevState['meta'], [key]: value }
      };
    }, this.savePostData);
  };

  onSchedule = () => {
    if (this.isValid()) {
      return this.submitPost();
    }
  };
  /*
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
*/
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
    savePost({ ...this.state, ...this.publishData });
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
    }, this.cropValidateCallback);
  };

  cropValidateCallback = async () => {
    if (
      this.allImagesValidated() &&
      'longform' !== this.state.postType &&
      'brandedLongform' !== this.state.postType
    ) {
      let data = new FormData();
      data.append('url', this.state.primaryImage);
      data.append('validated', this.state.crop);
      const imageWithNewPath = await postImages(this.props.blogName, data);
      this.saveNewPathToContent(imageWithNewPath);
      this.setState({
        primaryImage: `${
          imageWithNewPath['src'].split('original')[0]
        }image_dimension.${imageWithNewPath['extension']}`
      });
    }
    this.savePostData();
  };

  saveNewPathToContent = image => {
    let fields = this.state.fields;
    for (let i = 0; i < fields.length; i++) {
      if (fields[i]['type'] === 'image') {
        fields[i] = { ...fields[i], ...image };
        this.setState({ fields });
        break;
      }
    }
  };

  allImagesValidated = () => {
    const crop = this.state.crop;
    return (
      crop['golden']['validate'] &&
      crop['panoramic']['validate'] &&
      crop['square']['validate']
    );
  };

  setAllCategories = async postType => {
    let categories = await loadAllCategories(
      this.props.blogUrl,
      postType,
      this.props.blogName
    );
    let updatedCategories = filterCategories(categories);
    this.setState({ allCategories: updatedCategories });
  };

  handleStatusUpdate = async () => {
    let state = this.state;
    state.status = 'draft';
    try {
      await submitPostToBackend(
        { ...state, ...this.publishData },
        this.props.blogUrl
      );
      this.setState(
        {
          status: 'draft',
          currentStatus: 'draft',
          snackbarOpen: true,
          SnackbarMessage: DRAFT_MESSAGE
        },
        this.savePostData
      );
      savePostsList(state, this.props.blogName);
      this.props.handleDifundir('draft', this.state.publishedDate);
    } catch (err) {
      console.log(err);
      this.setMessage(true, SAVING_DATA_ERROR_WARNING);
    }
  };

  handleUpdate = async () => {
    if (this.isValid()) {
      try {
        await submitPostToBackend(
          { ...this.state, ...this.publishData },
          this.props.blogUrl
        );
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
    let categories = await loadAllCategories(
      this.props.blogUrl,
      'club',
      this.props.blogName
    );
    let updatedCategories = filterCategories(categories);
    let category = findByName('Especial Branded', updatedCategories);
    this.setState({ category: category['id'] });
  };

  render() {
    if (!this.state.id) {
      return 'Loading...';
    }
    let showCalendar = true;
    if (this.state.currentStatus === 'publish') {
      showCalendar = false;
    }

    let imageSrc = this.state.meta.homepage.image
      ? this.state.meta.homepage.image.url
      : this.state.primaryImage;

    return (
      <div className="grid-wrapper grid-l">
        <span style={{ color: 'red' }}>{this.state.message}</span>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.SnackbarMessage}
          autoHideDuration={5000}
          onRequestClose={this.handleRequestClose}
        />
        <Check childName="PostScheduler">
          <Row className="bottom-xs">
            <Col sm={6}>
              <SchedulePost
                date={this.state.publishedDate}
                updateParent={this.updateParent}
                showCalendar={showCalendar}
              />
              {this.state.status === 'draft' ? (
                <RaisedButton
                  label="PROGRAMAR"
                  disabled={this.state.buttonDisabled}
                  onClick={this.onSchedule}
                  secondary
                  className="btn-align"
                />
              ) : (
                <RaisedButton
                  label="PUBLICAR CAMBIOS"
                  secondary
                  disabled={this.state.buttonDisabled}
                  onClick={this.handleUpdate}
                  className="btn-align"
                />
              )}
            </Col>
            <Col sm={3} />
            <Col className="end-sm" sm={3}>
              <DraftButton
                status={this.state.status}
                handleStatusUpdate={this.handleStatusUpdate}
              />
            </Col>
          </Row>
        </Check>
        <Row className="bottom-xs">
          <Check childName="PublicationLabel">
            <Col sm={12}>
              <Label
                label="Detalles de publicación "
                hint="Completa toda la información para que el equipo de WSL Branded Content pueda publicar el artículo"
              />
            </Col>
          </Check>
          <Check childName="Categories">
            <Col sm={3}>
              <Categories
                category={this.state.category}
                updateParent={this.updateParent}
                allCategories={this.state.allCategories}
              />
            </Col>
          </Check>
          <Check childName="OtherCategories">
            <Col sm={3}>
              <OtherCategories
                postCategories={this.state.postCategories}
                updateParent={this.updateParent}
                allCategories={this.state.allCategories}
              />
            </Col>
          </Check>
          <Col sm={6}>
            <Tags
              siteUrl={this.props.blogUrl}
              tags={this.state.tags}
              updateParent={this.updateParent}
              siteName={this.props.blogName}
            />
          </Col>
        </Row>
        <Row className="bottom-xs">
          <Col sm={12}>
            <Label label="Portada y redes sociales" />
          </Col>
          <Col sm={6}>
            <HomePage
              homepage={this.state.meta.homepage}
              updateHomepageContent={this.updateHomepageContent}
            />
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
        {imageSrc && (
          <ImageCropper
            imageSrc={imageSrc}
            onCropChange={this.onCropChange}
            onCropValidate={this.onCropValidate}
            crop={this.state.crop}
          />
        )}
        <Check childName="SponsoredContent">
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
            <Check childName="CountriesFormOptions">
              <CountriesFormOptions
                updateParent={this.updateParent}
                publishRegions={this.state.publishRegion}
              />
            </Check>
          </Col>
          <Col sm>
            <Check childName="AdvancedOptions">
              <AdvancedOptions
                blogUrl={this.props.blogUrl}
                userId={this.state.userId}
                setPostMeta={this.setPostMeta}
                updateParent={this.updateParent}
                postMeta={this.state.meta}
                specialPost={this.state.specialPost}
                isSensitive={this.state.isSensitive}
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
