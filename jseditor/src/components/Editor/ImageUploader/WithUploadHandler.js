//@flow
import React, { PureComponent } from 'react';

import { uploadImage } from './lib/helpers';
import { DialogTitle } from '.';

type Props = {
  id: string,
  open: boolean,
  site: string,
  mode: string,
  totalImages: number,
  title: string,
  showProgress: boolean,
  errorMessage: string,
  openImagePanel: (mode?: string) => void,
  openUploaderWithUrl: () => void,
  closeDialog: () => void,
};

type State = {
  showProgress: boolean,
  errorMessage: string
};

export const withUploadHandler = (WrappedComponent: any) =>
  class Uploader extends PureComponent<Props, State> {
    state = {
      showProgress: false,
      errorMessage: ''
    };

    componentWillReceiveProps() {
      this.setState({
        showProgress: false,
        errorMessage: ''
      });
    }

    showProgressBar = (showProgress: boolean) => this.setState({ showProgress });

    setErrorMessage = (errorMessage: string) => this.setState({ errorMessage });

    uploadImageToDb = async (data: FormData) => {
      const { id, mode, site, openImagePanel } = this.props;

      this.showProgressBar(true);

      try {
        const response = await uploadImage({ id, site, data });

        if (response.status === 200) {
          openImagePanel(mode);
        } else {
          this.setErrorMessage('Something went wrong.');
        }
      } catch (err) {
        this.setErrorMessage('Following error occurred: ' + err.message);
      } finally {
        this.showProgressBar(false);
      }
    };

    getTitle = () => (
      <DialogTitle
        label="Sube una o varias imágenes"
        hint="Máximo 8MB cada imagen"
        closeDialog={this.props.closeDialog}
      />
    );

    render = () =>
      <WrappedComponent
        title={this.getTitle()}
        uploadImageToDb={this.uploadImageToDb}
        showProgressBar={this.showProgressBar}
        setErrorMessage={this.setErrorMessage}
        { ...this.state }
        { ...this.props }
      />;
  }
