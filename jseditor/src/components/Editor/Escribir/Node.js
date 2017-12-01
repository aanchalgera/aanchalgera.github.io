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
    if (!this.props.id) {
      return '';
    }
    const { id, type, openResourcePanel, ...props } = this.props;
    const section = this.getSection(type, props);
    return (
      <div>
        {section}
        <MoreOptions openResourcePanel />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { ...state.post.fields[ownProps.index] } || {};
};

export default connect(mapStateToProps)(Node);
