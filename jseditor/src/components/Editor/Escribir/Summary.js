// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import { openModal } from 'actions/modal';
import { PopoverToolbar, SummaryToolbar } from '.';
import { changeLayout, deleteSection, changeCurrentIndex } from 'actions/post';

type Props = {
  text: string,
  index: number,
  layout: string,
  align: string,
  changeCurrentIndex: (index: number) => void,
  deleteSection: (index: number, maxId: number) => void,
  changeLayout: (index: number, layout: string, align: string) => void,
  maxId: number
};

type State = {
  openToolbar: boolean,
  el: any,
  className: string
};

class Summary extends React.PureComponent<Props, State> {
  state = {
    openToolbar: false,
    el: {},
    className: ''
  };

  changeCurrentIndex = () => {
    this.props.changeCurrentIndex(this.props.index);
  };

  changeLayout = (layout, align) => {
    const { index, changeLayout } = this.props;
    changeLayout(index, layout, align);
  };

  handleToolbar = (event: SyntheticEvent<HTMLImageElement>) => {
    this.setState(
      {
        openToolbar: true,
        el: event.currentTarget.parentNode,
        className: 'summary-container'
      },
      this.changeCurrentIndex
    );
  };

  closeToolbar = () => {
    this.setState({
      openToolbar: false,
      className: ''
    });
  };

  handleDelete = () => {
    const { deleteSection, index, maxId } = this.props;
    deleteSection(index, maxId);
  };

  render() {
    const { text, index, align, layout, maxId } = this.props;

    return (
      <div className={`${layout}-${align}`}>
        <div className="node-wrapper" onClick={this.handleToolbar}>
          <div className={this.state.className}>{text}</div>
        </div>
        <PopoverToolbar
          imageEl={this.state.el}
          open={this.state.openToolbar}
          closeToolbar={this.closeToolbar}
          toolbarIcons={
            <SummaryToolbar
              index={index}
              closeToolbar={this.closeToolbar}
              selectedKey={`${layout}-${align}`}
              maxId={maxId}
              handleDelete={this.handleDelete}
              changeLayout={this.changeLayout}
            />
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  changeLayout,
  deleteSection,
  openModal,
  changeCurrentIndex
})(Summary);
