import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import { pinkA200 } from 'material-ui/styles/colors';

const styles = {
  checkbox: {
    marginBottom: '16px',
  },
  button: {
    marginTop: '16px',
    backgroundColor: pinkA200
  }
};

let formatedBlogs = {
  tecnologiaColA : {
    blogs: [
      'xataka', 'xatakamovil', 'xatakafoto', 'xatakandroid', 'xatakahome',
      'xatakawindows', 'xatakaciencia', 'xatakamagnet', 'xatakamexico',
      'xatakacolombia'
    ]
  },
  tecnologiaColB : {
    blogs: [
      'applesfera', 'vidaextra', 'genbeta', 'genbetadev', 'compradiccion'
    ]
  },
  estilodevida : {
    blogs: [
      'trendencias', 'trendenciasbelleza', 'trendenciashombre', 'directoalpaladar',
      'bebesymas', 'vitonica', 'decoesfera', 'poprosa', 'directoalpaladarmexico'
    ]
  },
  motor : {
    blogs: [
      'motorpasion', 'motorpasionmoto', 'motorpasionfuturo', 'motorpasionmexico'
    ]
  },
  economia : {
    blogs : [
      'elblogsalmon', 'pymesyautonomos'
    ]
  },
  ocio : {
    blogs : [
      'espinof', 'papelenblanco', 'diariodelviajero'
    ]
  }
};

class RepostBlogsOptions extends React.Component {

  handleCheck = (e, isChecked) => {
    this.props.setRepostBlogs(e.target.value, isChecked);
  }

  getBlogsListing = (blogs) => {
    const { blogName } = this.props;
    return blogs.map((blog) => (
      blogName == blog ? null: (
        <Checkbox
          defaultChecked={this.props.repostBlogs.indexOf(blog) !== -1}
          key={blog}
          label={blog}
          value={blog}
          style={styles.checkbox}
          onCheck={this.handleCheck}
        />
      )
    ));
  }

  render () {
    return (
      <fieldset className="country">
        <legend>Crosspost a otros medios</legend>
          <Row>
            {
              Object.keys(formatedBlogs).map((key) => (
                <Col xs key={key}>
                  <ul>
                    {this.getBlogsListing(formatedBlogs[key].blogs)}
                  </ul>
                </Col>
              ))
            }
          </Row>
          <Row>
            <Col>
              <FlatButton label="Enviar Crosspost" style={styles.button}/>
            </Col>
          </Row>
      </fieldset>
    );
  }
}

export default RepostBlogsOptions;
