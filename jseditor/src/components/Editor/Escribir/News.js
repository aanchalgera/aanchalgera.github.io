// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { closeModal } from 'actions/modal';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton } from 'material-ui';
import { CloseButton } from 'components/Editor/ImageUploader';

import configParams from 'config/configs.js';

type Props = {
  modalName: string,
  closeModal: () => void
};

type State = {
  currentPageNo: number,
  pages: Array<string>
};

const customContentStyle = {
  width: '90%',
  maxWidth: 'none'
};
const pages = [
  'https://i.blogs.es/75200d/2749225765_817835bac6_b/original.jpg',
  'https://i.blogs.es/deaf38/nuevos-ordenadores-asus/original.jpg',
  'https://i.blogs.es/7e7a6a/moto-mod-lenovo-vital/original.jpg',
  'https://i.blogs.es/1c6631/lenovo-mirage/original.jpg',
  'https://i.blogs.es/65d6c9/bitpay/original.jpg'
];
const firstPage = pages.length - configParams.version;

class News extends React.PureComponent<Props, State> {
  state = {
    currentPageNo: firstPage,
    pages
  };

  nextPage = () => {
    const currentPageNo = this.state.currentPageNo + 1;
    this.setState({ currentPageNo });
  };

  prevPage = () => {
    const currentPageNo = this.state.currentPageNo - 1;
    this.setState({ currentPageNo });
  };

  getLeftButton = () => {
    if (this.state.currentPageNo > firstPage) {
      return (
        <RaisedButton label="novedades recientes" onClick={this.prevPage} />
      );
    }
    return (
      <span className="news-footer-text">
        Si tienes sugerencias o comentarios sobre este editor, cuéntanos en
        Slack &nbsp;<a href="https://weblogs.slack.com/messages/C8PFG2J4R/">
          #alfa-editor
        </a>
      </span>
    );
  };

  getRightButton = () => {
    const { currentPageNo } = this.state;
    if (pages[currentPageNo + 1]) {
      return (
        <RaisedButton
          label="novedades anteriores"
          keyboardFocused
          onClick={this.nextPage}
        />
      );
    }
    return null;
  };

  closeNews = () => {
    const { closeModal } = this.props;
    this.setState({ currentPageNo: firstPage }, closeModal);
  };

  getTitleContent = () => {
    return (
      <Row className="m-no-margin">
        <Col sm={11}>
          <h2 className="type-title-dark">Novedades en Alfa</h2>
        </Col>
        <Col sm={1} className="end-sm">
          <CloseButton handleClose={this.closeNews} />
        </Col>
      </Row>
    );
  };

  render() {
    const { modalName } = this.props;
    const actions = (
      <div className="modal-actions">
        <Row className="m-no-margin">
          <Col sm={6} className="start-sm">
            {this.getLeftButton()}
          </Col>
          <Col sm={6} className="end-sm">
            {this.getRightButton()}
          </Col>
        </Row>
      </div>
    );

    return (
      <Dialog
        title={this.getTitleContent()}
        modal
        actions={actions}
        open={'newsModal' === modalName}
        contentStyle={customContentStyle}
      >
        <img src={this.state.pages[this.state.currentPageNo]} alt="" />
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.modal
  };
};

export default connect(mapStateToProps, { closeModal })(News);
