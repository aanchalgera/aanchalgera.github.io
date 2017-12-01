/*@flow*/
import { PureComponent } from 'react';

type Props = {
  autoHideDuration: number,
  open: boolean,
  children: any,
  onRequestHide: Function
};

type State = {};

class Expire extends PureComponent<Props, State> {
  componentDidMount() {
    if (this.props.open) {
      this.setAutoHideTimer();
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.open !== this.props.open) {
      if (this.props.open) {
        this.setAutoHideTimer();
      } else {
        clearTimeout(this.timerAutoHideId);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
  }
  timerAutoHideId: number;

  // Timer that controls delay before snackbar auto hides
  setAutoHideTimer() {
    const autoHideDuration = this.props.autoHideDuration;

    if (autoHideDuration > 0) {
      clearTimeout(this.timerAutoHideId);
      this.timerAutoHideId = setTimeout(() => {
        this.props.onRequestHide();
      }, autoHideDuration);
    }
  }

  render() {
    return this.props.open ? this.props.children : '';
  }
}

export default Expire;
