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
  currentTop: number,
  openImagePanel: () => void
};

class MoreOptions extends PureComponent<Props, State> {
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

    return (
      <div style={{ position: 'absolute', top: this.props.currentTop }}>
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
  return { currentTop: state.post.currentTop };
};

export default connect(mapStateToProps, { openImagePanel })(MoreOptions);
