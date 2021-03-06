import * as React from 'react';
import { connect } from 'react-redux';

import { Content, Image, Summary } from 'components/Editor/Escribir';

type Props = {
  id: number,
  type: string,
  index: number
};

class Node extends React.PureComponent<Props> {
  getSection = (type, props) => {
    switch (type) {
      case 'content':
        return <Content {...props} />;
      case 'image':
        return <Image {...props} />;
      case 'summary':
        return <Summary {...props} />;
      default:
        return '';
    }
  };

  render() {
    if (undefined === this.props.id) {
      return '';
    }
    const { type, ...props } = this.props;
    const section = this.getSection(type, props);
    return section;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.sections[ownProps.index]
  };
};

export default connect(mapStateToProps)(Node);
