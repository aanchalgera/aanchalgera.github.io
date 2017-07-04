import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

const styles = {
  homePage: {
    column: {
      marginLeft:'100px', 
    },
    divider: {
      width:'600px'
    }
  },
  commanDivider: {
    width:'300px'
  },
  header: {
    paragraph: {
      marginLeft:'100px'    
    },
    divider: {
      width:'1650px', 
      marginLeft:'100px'
    }
  },
  hintStyle:{
    bottom: '60px'
  }
};
  
const FbTwitterHomePageContent = (props) => (
  <view>
    <Row>
      <Col>
        <p style={styles.header.paragraph}>portada y redes sociales</p>
        <Divider style={styles.header.divider} />
      </Col>
    </Row>
    <Row>
      <Col xs={4} style={styles.homePage.column}>
        <TextContainer
          name="homePage"
          homePageTwitterFbChange={props.homePageTwitterFbChange}
          content={props.homePage}
        >
          Texto para portado (opcional) <span >{240 - props.homePage.length}</span>
        </TextContainer>
        <Divider style={styles.homePage.divider} />
      </Col>
      <Col xs={2} >
        <TextContainer 
          name="twitter" 
          homePageTwitterFbChange={props.homePageTwitterFbChange}
          content={props.twitter}
        >
          Texto para Twitter <span >{116 - props.twitter.length}</span>
        </TextContainer>
        <Divider style={styles.commanDivider} />
      </Col>
      <Col xs={2} >
        <TextContainer 
          name="facebook" 
          homePageTwitterFbChange={props.homePageTwitterFbChange}
          content={props.facebook}
        >
          Texto para facebook
        </TextContainer>
        <Divider style={styles.commanDivider} />
      </Col>
    </Row>
  </view>
);

const TextContainer = (props) => (
  <TextField
    hintText="..."
    hintStyle={styles.hintStyle}
    floatingLabelText={props.children}
    floatingLabelFixed={true}
    multiLine={true}
    rows={3}
    rowsMax={3}
    underlineShow={false}
    fullWidth={true}
    name={props.name}
    value={props.content}
    onChange={props.homePageTwitterFbChange.bind(this)}
  />
);

export default FbTwitterHomePageContent;
