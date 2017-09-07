// @flow
import React from 'react';
import { Divider, Checkbox, Subheader, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

declare type InputEvent = Event & { currentTarget: HTMLInputElement };

type Props = {
  repostBlogs: Array<string>,
  setRepostBlogs: (key: string, value: boolean) => void,
  blogName: string,
  submitRepostedBlogs: () => Promise<any>
};

const styles = {
  checkbox: {
    marginBottom: '16px'
  },
  button: {
    marginTop: '16px'
  }
};

let formatedBlogs = {
  tecnologiaColA: {
    sites: [
      'xataka',
      'xatakamovil',
      'xatakafoto',
      'xatakandroid',
      'xatakahome',
      'xatakawindows',
      'xatakaciencia',
      'xatakamagnet',
      'xatakamexico',
      'xatakacolombia'
    ]
  },
  tecnologiaColB: {
    sites: ['applesfera', 'vidaextra', 'genbeta', 'genbetadev', 'compradiccion']
  },
  estilodevida: {
    sites: [
      'trendencias',
      'trendenciasbelleza',
      'trendenciashombre',
      'directoalpaladar',
      'bebesymas',
      'vitonica',
      'decoesfera',
      'poprosa',
      'directoalpaladarmexico'
    ]
  },
  motor: {
    sites: [
      'motorpasion',
      'motorpasionmoto',
      'motorpasionfuturo',
      'motorpasionmexico'
    ]
  },
  economia: {
    sites: ['elblogsalmon', 'pymesyautonomos']
  },
  ocio: {
    sites: ['espinof', 'papelenblanco', 'diariodelviajero']
  }
};

export default class RepostSiteOptions extends React.Component {
  props: Props;

  handleCheck = (e: InputEvent, isChecked: boolean) => {
    this.props.setRepostBlogs(e.currentTarget.value, isChecked);
  };

  getSitesListing = (blogs: Array<string>) => {
    const { blogName } = this.props;
    return blogs.map(
      blog =>
        blogName === blog
          ? null
          : <Checkbox
              checked={this.props.repostBlogs.indexOf(blog) !== -1}
              key={blog}
              label={blog}
              value={blog}
              style={styles.checkbox}
              onCheck={this.handleCheck}
            />
    );
  };

  render() {
    return (
      <div>
        <Subheader className="subheader">Crosspost a otros medios</Subheader>
        <Divider className="divider" />
        <Row>
          {Object.keys(formatedBlogs).map(key =>
            <Col xs key={key}>
              {this.getSitesListing(formatedBlogs[key].sites)}
            </Col>
          )}
        </Row>
        <Row>
          <Col>
            <RaisedButton
              label="Enviar Crosspost"
              style={styles.button}
              onTouchTap={this.props.submitRepostedBlogs}
              primary={true}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
