import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Row, Col } from 'react-flexbox-grid';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Visibility from 'material-ui/svg-icons/action/visibility';
import { Link } from 'react-router-dom';

const styles = {
  previewButton: {
    marginTop: '8px'
  },
  publishButton: {
    marginTop: '16px'
  }
};

const TitleBar = ({pathName, blogUrl, queryPath, activeTab}) => (
  <view>
    <Row>
      <Col xs={12}>
        <AppBar
          title={
            <Row bottom="xs">
              <Col xs={5}>Xataka</Col>
              <Col xs={3} >
                <Tabs
                  value={activeTab}
                >
                  <Tab label="ESCRIBIR" value="escribir" containerElement={<Link to={`/edit/post/${pathName}${queryPath}`}/>} />
                  <Tab label="PUBLICAR" value="publicar" containerElement={<Link to={`/publicar/${pathName}${queryPath}`} />} />
                  <Tab label="DIFUNDIR" value="difundir" containerElement={<Link to={`/difundir/${pathName}${queryPath}`} />} />
                </Tabs>
              </Col>
            </Row>
          }
        >
          <FlatButton label="Publicado" style={styles.publishButton} />
            <IconButton target="_blank" href={ blogUrl + '/preview-longform/' + pathName } style={styles.previewButton} disabled={activeTab === 'difundir'}>
              <FontIcon className="material-icons" ><Visibility/></FontIcon>
            </IconButton>
        </AppBar>
      </Col>
    </Row>
  </view>
);

export default TitleBar;
