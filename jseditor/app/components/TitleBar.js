import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Visibility from 'material-ui/svg-icons/action/visibility';

const styles = {
  previewButton: {
    marginTop: '8px'
  },
  publishButton: {
    marginTop: '16px'
  }
};

const TitleBar = () => (
  <view>
    <Row>
      <Col xs={12}>
        <AppBar title={<TitleContent />}>
          <PublishButton />
          <PreviewButton />
        </AppBar>
      </Col>
    </Row>
  </view>
);

const TitleContent = () => (
  <Row bottom="xs">
    <Col xs={5}>Xataka</Col>
    <Col xs={3} >
      <TabsButton />
    </Col>
  </Row>
);

const PreviewButton = () => (
  <IconButton style={styles.previewButton}>
    <FontIcon className="material-icons" ><Visibility/></FontIcon>
  </IconButton>
);

const PublishButton = () => (
  <FlatButton label="Publicado" style={styles.publishButton} />
);

const TabsButton = () => (
  <Tabs >
    {/*<Tab label="ESCRIBIR" />*/}
    <Tab label="PUBLICAR" />
    {/*<Tab label="DIFUNDIR" />*/}
  </Tabs>
);

export default TitleBar;