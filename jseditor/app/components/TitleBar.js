import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';

const TitleBar = () => (
  <MuiThemeProvider>
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
  </MuiThemeProvider>
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
  <div>
    <IconButton style={{marginTop: 10}}>
      <ActionHome />
    </IconButton>
  </div>
);

const PublishButton = () => (
  <div>
    <FlatButton label="Publicado" style={{marginTop: 15}} />
  </div>
);

const TabsButton = () => (
  <Tabs >
    {/*<Tab label="ESCRIBIR" />*/}
    <Tab label="PUBLICAR" />
    {/*<Tab label="DIFUNDIR" />*/}
  </Tabs>
);

export default TitleBar;