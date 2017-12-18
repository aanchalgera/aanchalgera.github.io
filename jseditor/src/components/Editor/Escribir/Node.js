import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-flexbox-grid';

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
    if (undefined === this.props.id) {
      return '';
    }
    const { id, type, ...props } = this.props;
    const section = this.getSection(type, props);
    if (type === 'title') return section;
    else
      return (
        <Row className="m-no-margin">
          <Col xs={2} />
          <Col xs={8}>{section}</Col>
          <Col xs={2} />
        </Row>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.sections[ownProps.index]
  };
};

export default connect(mapStateToProps)(Node);
