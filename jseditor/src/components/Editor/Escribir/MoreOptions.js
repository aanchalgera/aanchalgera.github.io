//@flow
import React, { PureComponent } from 'react';
import { IconButton } from 'material-ui';
import {
  ContentAdd,
  ContentClear,
  EditorTitle,
  ImagePhoto,
  AvPlayCircleFilled,
  EditorFormatIndentIncrease
} from 'material-ui/svg-icons';

import { InputEvent } from 'lib/flowTypes';
import { init as initCheck, Check } from 'lib/check';
import { OptionButton, ExtraOptions, ShowColumnButtons } from '.';

type State = {
  showOptions: boolean
};

type Props = {
  dataId: number,
  postType: string,
  userRole: string,
  show2column?: boolean,
  show3column?: boolean,
  showExtras?: boolean,
  addTable?: (currentIndex: number) => void,
  groupSections?: (dataId: number, columns: number) => void,
  addResource: ({ type: string, currentIndex: number }) => void,
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

  componentDidMount() {
    initCheck(this.props.postType, this.props.userRole);
  }

  toggleShowOptions = () => {
    this.setState(prevState => ({
      showOptions: !prevState.showOptions
    }));
  };

  addResource = (type) => {
    this.props.addResource({
      currentIndex: this.props.dataId,
      type
    });
  };

  openResourcePanel = (type) => {
    this.props.openResourcePanel('image', this.props.dataId, type, false);
  };

  render() {
    const {
      dataId,
      addTable,
      groupSections,
      show2column = true,
      show3column = true,
      showExtras = true
    } = this.props;
    const { showOptions } = this.state;

    return (
      <div>
        <IconButton className="btn-option" onClick={this.toggleShowOptions}>
          {showOptions ? <ContentClear color="black" /> : <ContentAdd color="black" />}
        </IconButton>
        {showOptions && (
          <span>
            <OptionButton
              title="Insertar texto"
              Icon={EditorTitle}
              handleClick={() => this.addResource('content')}
            />
            <OptionButton
              title="Insertar imagen"
              Icon={ImagePhoto}
              handleClick={() => this.openResourcePanel('')}
            />
            <Check childName="MoreOptions">
              <span>
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
                {showExtras &&
                  <ExtraOptions
                    dataId={dataId}
                    addTable={addTable}
                    addResource={this.addResource}
                    openResourcePanel={this.openResourcePanel}
                  />}
                {<ShowColumnButtons
                  dataId={dataId}
                  show2column={show2column}
                  show3column={show3column}
                  groupSections={groupSections}
                />}
              </span>
            </Check>
          </span>
        )}
      </div>
    );
  }
}
