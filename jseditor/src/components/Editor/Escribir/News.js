// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { closeModal } from 'actions/modal';
import { Row, Col } from 'react-flexbox-grid';
import { Dialog, RaisedButton } from 'material-ui';
import { CloseButton } from 'components/Editor/ImageUploader';

import configParams from 'config/configs';
import { newsPages } from './lib/newsPages';

type Props = {
  modalName: string,
  closeModal: () => void
};

type State = {
  currentPageNo: number,
  newsPages: Array<React.Node>
};

const customContentStyle = {
  width: '90%',
  maxWidth: 'none'
};
const firstPage = newsPages.length - configParams.version;

class News extends React.PureComponent<Props, State> {
  state = {
    currentPageNo: firstPage,
    newsPages
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
        Slack #alfa-editor
      </span>
    );
  };

  getRightButton = () => {
    const { currentPageNo } = this.state;
    if (newsPages[currentPageNo + 1]) {
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
        autoScrollBodyContent
      >
        <div className="modal-content">
          {this.state.newsPages[this.state.currentPageNo]}
        </div>
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
