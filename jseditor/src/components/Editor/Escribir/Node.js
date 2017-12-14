import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-flexbox-grid';

import { Title, Content, Image, MoreOptions } from 'components/Editor/Escribir';

type Props = {
  id: number,
  type: string,
  index: number,
  currentLength: number,
  currentIndex: number
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
    if (undefined === this.props.id) {
      return '';
    }
    const { id, type, ...props } = this.props;
    const section = this.getSection(type, props);
    return (
      <Row>
        <Col xs={1} />
        <Col xs={1}>
          {this.props.currentLength === 0 &&
            this.props.currentIndex === this.props.index && <MoreOptions />}
        </Col>

        <Col xs={8}>{section}</Col>
        <Col xs={2} />
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.sections[ownProps.index],
    currentIndex: state.post.currentIndex,
    currentLength: state.post.currentLength
  };
};

export default connect(mapStateToProps)(Node);
