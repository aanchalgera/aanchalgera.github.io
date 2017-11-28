//@flow
import React, { PureComponent } from 'react';
import { IconButton } from 'material-ui';
import {
  ContentAdd,
  ContentClear,
  ImagePhoto,
} from 'material-ui/svg-icons';

import { InputEvent } from 'lib/flowTypes';
import { OptionButton } from '.';

type State = {
  showOptions: boolean
};

type Props = {
  dataId: number,
  openResourcePanel: (
    imageFunction: string,
    currentIndex: number,
    addImageModule?: string,
    addMoreImages?: boolean,
    event?: InputEvent
  ) => void
};

export class MoreOptions extends PureComponent<Props, State> {
  state = {
    showOptions: false
  };

  toggleShowOptions = () => {
    this.setState(prevState => ({
      showOptions: !prevState.showOptions
    }));
  };

  openResourcePanel = (type: string) => {
    this.props.openResourcePanel('image', this.props.dataId, type, false);
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
              handleClick={() => this.openResourcePanel('')}
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
