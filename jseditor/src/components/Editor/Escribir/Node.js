import * as React from 'react';
import { connect } from 'react-redux';
import { Title, MoreOptions } from 'components/Editor/Escribir';

type Props = {
  id: number,
  type: string,
  openResourcePanel: Function
};

class Node extends React.PureComponent<Props> {
  getSection = (type, props) => {
    switch (type) {
      case 'title':
        return <Title {...props} />;
      default:
        return 'No component for this type';
    }
  };

  render() {
    if (undefined === this.props.id) {
      return '';
    }
    const { id, type, openResourcePanel, ...props } = this.props;
    const section = this.getSection(type, props);
    return (
      <React.Fragment>
        {section}
        <MoreOptions openResourcePanel={openResourcePanel} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { ...state.sections[ownProps.index] } || {};
};

export default connect(mapStateToProps)(Node);