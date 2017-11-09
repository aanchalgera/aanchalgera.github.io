/*@flow*/
import { PureComponent } from 'react';

type Props = {
  autoHideDuration: number,
  open: boolean,
  children: any
};

type State = {
  open: boolean
};

class Expire extends PureComponent {
  state: State = {
    open: false
  };

  componentWillMount() {
    this.setState({
      open: this.props.open
    });
  }

  componentDidMount() {
    if (this.state.open) {
      this.setAutoHideTimer();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const open = nextProps.open;
    this.setState({
      open: open
    });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this.setAutoHideTimer();
      } else {
        clearTimeout(this.timerAutoHideId);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
  }
  props: Props;
  timerAutoHideId: number;

  // Timer that controls delay before snackbar auto hides
  setAutoHideTimer() {
    const autoHideDuration = this.props.autoHideDuration;

    if (autoHideDuration > 0) {
      clearTimeout(this.timerAutoHideId);
      this.timerAutoHideId = setTimeout(() => {
        this.setState({ open: false });
      }, autoHideDuration);
    }
  }

  render() {
    return this.state.open ? this.props.children : '';
  }
}

export default Expire;
