import * as React from 'react';

const DELETE_KEY_CODE = 46;
const ESC_KEY_CODE = 27;

type Props = {
  handleDelete: () => void,
  closeToolbar: () => void,
  selectedKey: string
};

export function WithKeyHandler(WrappedComponent) {
  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  const className = `WithKeyHandler(${wrappedComponentName})`;
  class className extends React.PureComponent<Props> {
    componentDidMount() {
      document.addEventListener('keydown', this.keydownHandler);
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.keydownHandler);
    }

    keydownHandler = (e: KeyboardEvent) => {
      const { handleDelete, closeToolbar } = this.props;
      if (DELETE_KEY_CODE === e.keyCode) {
        handleDelete();
        return;
      }
      if (ESC_KEY_CODE === e.keyCode) {
        closeToolbar();
        return;
      }
    };

    getClassName = (layout: string, align: string) => {
      if (this.props.selectedKey === `${layout}-${align}`) {
        return 'active';
      }
      return '';
    };

    render() {
      return (
        <WrappedComponent getClassName={this.getClassName} {...this.props} />
      );
    }
  }
}
