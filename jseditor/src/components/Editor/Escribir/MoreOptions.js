//@flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  ContentAdd,
  ContentClear,
  ImagePhoto,
  EditorFormatIndentIncrease
} from 'material-ui/svg-icons';
import { openModal } from 'actions/modal';

import { OptionButton } from '.';
import configParams from 'config/configs';
import { openImagePanel } from 'actions/post';

type State = {
  showOptions: boolean
};

type Props = {
  coordinates: { top: number, left: number },
  isAtFirstPosition: boolean,
  openImagePanel: () => void,
  openModal: (modalName: string) => void
};

class MoreOptions extends PureComponent<Props, State> {
  static defaultProps = {
    isAtFirstPosition: false
  };
  state = {
    showOptions: false
  };

  componentWillReceiveProps(nextProps) {
    if (true === this.state.showOptions) {
      this.changeOptionsState(false);
    }
  }

  openPanel = () => {
    this.props.openImagePanel();
    this.changeOptionsState(false);
  };

  changeOptionsState = (showOptions: boolean) => {
    this.setState({
      showOptions
    });
  };

  openSummaryPanel = () => {
    this.props.openModal('summaryModal');
    this.changeOptionsState(false);
  };

  render() {
    const { showOptions } = this.state;
    const { coordinates } = this.props;
    if (this.props.isAtFirstPosition === false) {
      return null;
    }
    return (
      <div
        style={{
          position: 'absolute',
          top: coordinates.top,
          left: coordinates.left - 80
        }}
        className="options-container"
      >
        <OptionButton
          Icon={showOptions ? ContentClear : ContentAdd}
          handleClick={() => this.changeOptionsState(!showOptions)}
        />
        {showOptions && (
          <span>
            <OptionButton
              title="Insertar imagen"
              Icon={ImagePhoto}
              handleClick={this.openPanel}
            />
            {configParams.version > 1 && (
              <OptionButton
                title="Insertar imagen"
                Icon={EditorFormatIndentIncrease}
                handleClick={this.openSummaryPanel}
              />
            )}
            {/* <span>
              <OptionButton
                title="Añadir vídeo"
                Icon={AvPlayCircleFilled}
                handleClick={() => this.addResource('video')}
              />
              <OptionButton
                title="Añadir sumario"
                Icon={EditorFormatIndentIncrease}
                handleClick={() => this.addResource('summary')}
              />
            </span> */}
          </span>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    coordinates: state.post.coordinates,
    isAtFirstPosition: state.post.isAtFirstPosition
  };
};

export default connect(mapStateToProps, { openImagePanel, openModal })(
  MoreOptions
);
