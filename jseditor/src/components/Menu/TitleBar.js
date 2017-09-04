import React from 'react';
import { AppBar, IconButton, FlatButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Row, Col } from 'react-flexbox-grid';
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

const TitleBar = ({ postName, blogUrl, queryPath, activeTab, showDifundir }) =>
  <view>
    <Row>
      <Col xs={12}>
        <AppBar
          title={
            <Row bottom="xs">
              <Col xs={5}>Xataka</Col>
              <Col xs={3}>
                <Tabs value={activeTab}>
                  <Tab
                    label="ESCRIBIR"
                    value="escribir"
                    containerElement={
                      <Link to={`/edit/post/${postName}${queryPath}`} />
                    }
                  />
                  <Tab
                    label="PUBLICAR"
                    value="publicar"
                    containerElement={
                      <Link to={`/publicar/${postName}${queryPath}`} />
                    }
                  />
                  {showDifundir &&
                    <Tab
                      label="DIFUNDIR"
                      value="difundir"
                      containerElement={
                        <Link to={`/difundir/${postName}${queryPath}`} />
                      }
                    />}
                </Tabs>
              </Col>
            </Row>
          }
        >
          <FlatButton label="Publicado" style={styles.publishButton} />
          <IconButton
            target="_blank"
            href={blogUrl + '/preview-longform/' + postName}
            style={styles.previewButton}
            disabled={activeTab === 'difundir'}
          >
            <Visibility />
          </IconButton>
        </AppBar>
      </Col>
    </Row>
  </view>;

export default TitleBar;
