//@flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { IconButton } from 'material-ui';
import { ContentAdd, ContentClear, ImagePhoto } from 'material-ui/svg-icons';

import { OptionButton } from '.';
import { openImagePanel } from 'actions/post';

type State = {
  showOptions: boolean
};

type Props = {
  coordinates: { top: number, left: number },
  isAtFirstPosition: boolean,
  openImagePanel: () => void
};

DefaultProps = {
  isAtFirstPosition: false
};

class MoreOptions extends PureComponent<Props, State, DefaultProps> {
  state = {
    showOptions: false
  };

  openPanel = () => {
    this.props.openImagePanel();
    this.toggleShowOptions();
  };

  toggleShowOptions = () => {
    this.setState(prevState => ({
      showOptions: !prevState.showOptions
    }));
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
          left: coordinates.left - 50
        }}
      >
        <IconButton className="btn-option" onClick={this.toggleShowOptions}>
          {showOptions ? (
            <ContentClear color="black" />
          ) : (
            <ContentAdd color="black" />
          )}
        </IconButton>
        {showOptions && (
          <span>
            <OptionButton
              title="Insertar imagen"
              Icon={ImagePhoto}
              handleClick={this.openPanel}
            />
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

export default connect(mapStateToProps, { openImagePanel })(MoreOptions);
