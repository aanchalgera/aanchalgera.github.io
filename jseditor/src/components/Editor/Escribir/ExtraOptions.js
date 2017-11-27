//@flow
import React from 'react';
import {
  ActionGif,
  ImagePhotoLibrary,
  ImageSlideshow,
  EditorInsertChart,
  ImageGridOn,
  ToggleStarHalf,
  FileFolderOpen
} from 'material-ui/svg-icons';

import { OptionButton } from './OptionButton';

type Props = {
  dataId: number,
  addTable: (currentIndex: number) => void,
  addResource: (type: string) => void,
  openResourcePanel: (type: string) => void
};

export function ExtraOptions(props: Props) {
  const {
    dataId,
    addResource,
    openResourcePanel,
    addTable
  } = props;

  return (
    <span>
      <OptionButton
        title="Añadir GIF"
        Icon={ActionGif}
        handleClick={() => addResource('giphy')}
      />
      <OptionButton
        title="Añadir galería de fotos"
        Icon={ImagePhotoLibrary}
        handleClick={() => openResourcePanel('gallery')}
      />
      <OptionButton
        title="Añadir carrusel de fotos"
        Icon={ImageSlideshow}
        handleClick={() => openResourcePanel('slider')}
      />
      <OptionButton
        title="Añadir gráfico"
        Icon={EditorInsertChart}
        handleClick={() => addResource('infogram')}
      />
      <OptionButton
        title="Añadir tabla de datos"
        Icon={ImageGridOn}
        handleClick={() => addTable(dataId)}
      />
      <OptionButton
        title="Añadir review de producto"
        Icon={ToggleStarHalf}
        handleClick={() => addResource('fichaReview')}
      />
      <OptionButton
        title="Añadir ficha de app"
        Icon={FileFolderOpen}
        handleClick={() => addResource('ficha')}
      />
    </span>
  );
}
