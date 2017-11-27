//@flow
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { InputEvent } from 'lib/flowTypes';
import PropertyButton from '../PropertyButton';

type Props = {
  title: string,
  handleBlur: (ev: InputEvent) => void,
  handleChange: (ev: InputEvent) => void,
  addBackgroundOptionToResource: (
    property: string,
    value: string,
    ev: InputEvent
  ) => void,
  addLayoutToResource: (ev: InputEvent) => void,
  data: {
    backgroundClass: string,
    foregroundColor: string,
    id: number,
    layout: string,
    show2column: boolean,
    show3column: boolean,
    text: string,
    type: string
  },
  openResourcePanel: (
    imageFunction: any,
    currentIndex: number,
    addImageModule: string,
    addMoreImages: boolean,
    event: InputEvent
  ) => void
};

const styles = {
  containerStyle: {
    lineHeight: '40px',
    height: '200px'
  },
  hintStyle: { fontSize: '33px' },
  textareaStyle: {
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif',
    fontSize: '33px',
    overflowY: 'hidden'
  },
  underlineStyle: {}
};

export class Title extends Component<Props> {
  render() {
    const {
      data,
      handleChange,
      title,
      handleBlur,
      addLayoutToResource,
      addBackgroundOptionToResource,
      openResourcePanel
    } = this.props;

    return (
      <div className="col-sm-12">
        <PropertyButton
          data={data}
          layout={data.layout}
          dataId="0"
          openResourcePanel={openResourcePanel}
          addLayoutToResource={addLayoutToResource}
          addBackgroundOptionToResource={addBackgroundOptionToResource}
        />
        <TextField
          hintText="Título..."
          fullWidth={true}
          value={title}
          onChange={handleChange}
          onBlur={handleBlur}
          style={styles.containerStyle}
          textareaStyle={styles.textareaStyle}
          hintStyle={styles.hintStyle}
          multiLine={true}
          underlineStyle={styles.underlineStyle}
        />
      </div>
    );
  }
}
