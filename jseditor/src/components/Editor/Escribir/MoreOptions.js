//@flow
import React, { PureComponent } from 'react';
import { FlatButton, IconButton } from 'material-ui';
import {
  ContentAdd,
  ContentClear,
  ImagePhoto,
  AvPlayCircleFilled,
  EditorFormatIndentIncrease,
  ActionGif,
  ImagePhotoLibrary,
  ImageSlideshow,
  EditorInsertChart,
  ImageGridOn,
  ToggleStarHalf,
  FileFolderOpen
} from 'material-ui/svg-icons';

import { InputEvent } from 'lib/flowTypes';
import { OptionButton } from './OptionButton';

type State = {
  showOptions: boolean
};

type Props = {
  dataId: number,
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

  toggleShowOptions = () => {
    this.setState(prevState => ({
      showOptions: !prevState.showOptions
    }));
  };

  getShowColumnButtons = () => {
    const {
      dataId,
      groupSections,
      show2column = true,
      show3column = true
    } = this.props;

    return (
      <span>
        {show2column && (
          <FlatButton onClick={() => groupSections(dataId, 2)}>
            2 columna
          </FlatButton>
        )}
        {show3column && (
          <FlatButton onClick={() => groupSections(dataId, 3)}>
            3 columna
          </FlatButton>
        )}
      </span>
    );
  };

  render() {
    const {
      dataId,
      addTable,
      addResource,
      openResourcePanel,
      showExtras = true
    } = this.props;
    const { showOptions } = this.state;

    return (
      <div>
        <IconButton onClick={this.toggleShowOptions}>
          {showOptions ? <ContentClear /> : <ContentAdd />}
        </IconButton>

        {showOptions && (
          <span>
            <OptionButton
              title="Insertar imagen"
              Icon={ImagePhoto}
              handleClick={() => openResourcePanel('image', dataId, '', false)}
            />
            <OptionButton
              title="Añadir vídeo"
              Icon={AvPlayCircleFilled}
              handleClick={() =>
                addResource({
                  type: 'video',
                  currentIndex: dataId
                })}
            />
            <OptionButton
              title="Añadir sumario"
              Icon={EditorFormatIndentIncrease}
              handleClick={() =>
                addResource({
                  type: 'summary',
                  currentIndex: dataId
                })}
            />
            {showExtras && (
              <span>
                <OptionButton
                  title="Añadir GIF"
                  Icon={ActionGif}
                  handleClick={() =>
                    addResource({
                      type: 'giphy',
                      currentIndex: dataId
                    })}
                />
                <OptionButton
                  title="Añadir galería de fotos"
                  Icon={ImagePhotoLibrary}
                  handleClick={() =>
                    openResourcePanel('image', dataId, 'gallery', false)}
                />
                <OptionButton
                  title="Añadir carrusel de fotos"
                  Icon={ImageSlideshow}
                  handleClick={() =>
                    openResourcePanel('image', dataId, 'slider', false)}
                />
                <OptionButton
                  title="Añadir gráfico"
                  Icon={EditorInsertChart}
                  handleClick={() =>
                    addResource({
                      type: 'infogram',
                      currentIndex: dataId
                    })}
                />
                <OptionButton
                  title="Añadir tabla de datos"
                  Icon={ImageGridOn}
                  handleClick={() => addTable(dataId)}
                />
                <OptionButton
                  title="Añadir review de producto"
                  Icon={ToggleStarHalf}
                  handleClick={() =>
                    addResource({
                      type: 'fichaReview',
                      currentIndex: dataId
                    })}
                />
                <OptionButton
                  title="Añadir ficha de app"
                  Icon={FileFolderOpen}
                  handleClick={() =>
                    addResource({
                      type: 'ficha',
                      currentIndex: dataId
                    })}
                />
              </span>
            )}
            {this.getShowColumnButtons()}
          </span>
        )}
      </div>
    );
  }
}
