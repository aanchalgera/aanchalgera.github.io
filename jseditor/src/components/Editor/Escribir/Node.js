import * as React from 'react';
import { connect } from 'react-redux';
import { Title, Content, Image } from 'components/Editor/Escribir';

type Props = {
  id: number,
  type: string,
  index: number
};

class Node extends React.PureComponent<Props> {
  getSection = (type, props) => {
    switch (type) {
      case 'title':
        return <Title {...props} />;
      case 'content':
        return <Content {...props} />;
      case 'image':
        return <Image {...props} />;
      default:
        return '';
    }
  };

  render() {
    console.log('in' + this.props.id);
    if (undefined === this.props.id) {
      return '';
    }
    const { id, type, ...props } = this.props;
    const section = this.getSection(type, props);
    return <React.Fragment>{section}</React.Fragment>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { ...state.sections[ownProps.index] };
};

export default connect(mapStateToProps)(Node);
