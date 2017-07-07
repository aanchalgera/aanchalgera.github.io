import React from 'react';

class RepublishScheduler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null
    };
  }

  onChange(e) {
    this.setState({ date: e.target.value });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.date === null ? this.props.postDate : this.state.date}
          onChange={this.onChange.bind(this)}
        />
        <button>Select Slot</button>
        <button>Schedule</button>
      </div>
    );
  }
}

export default RepublishScheduler;
