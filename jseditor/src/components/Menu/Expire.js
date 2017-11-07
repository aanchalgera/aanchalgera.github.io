import { PureComponent } from 'react';

class Expire extends PureComponent {
  /*  static propTypes = {
    autoHideDuration: PropTypes.number,
    message: PropTypes.node.isRequired,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
  };
*/
  state = {
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

  componentWillReceiveProps(nextProps) {
    const open = nextProps.open;
    this.setState({
      open: open !== null ? open : this.state.open
    });
  }

  componentDidUpdate(prevProps, prevState) {
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

  // Timer that controls delay before snackbar auto hides
  setAutoHideTimer() {
    const autoHideDuration = this.props.autoHideDuration;

    if (autoHideDuration > 0) {
      clearTimeout(this.timerAutoHideId);
      this.timerAutoHideId = setTimeout(() => {
        if (this.props.open !== null && this.props.onRequestClose) {
          this.props.onRequestClose('timeout');
        } else {
          this.setState({ open: false });
        }
      }, autoHideDuration);
    }
  }

  render() {
    return this.state.open ? this.props.children : '';
  }
}

export default Expire;
