//@flow
import React, { PureComponent } from 'react';
import { IconButton } from 'material-ui';
import {
  ContentAdd,
  ContentClear,
  ImagePhoto,
} from 'material-ui/svg-icons';

import { OptionButton } from '.';

type State = {
  showOptions: boolean
};

type Props = {
  dataId: number,
  openResourcePanel: (currentIndex: number) => void
};

export class MoreOptions extends PureComponent<Props, State> {
  state = {
    showOptions: false
  };

  openPanel = () => {
    this.props.openResourcePanel(this.props.dataId);
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
      <div>
        <IconButton className="btn-option" onClick={this.toggleShowOptions}>
          {showOptions ? <ContentClear color="black" /> : <ContentAdd color="black" />}
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
