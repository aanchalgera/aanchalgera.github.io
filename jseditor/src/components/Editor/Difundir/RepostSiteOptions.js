// @flow
import * as React from 'react';
import { Checkbox, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import { Label } from '../Publish';
import { InputEvent } from 'lib/flowTypes';

type Props = {
  repostBlogs: Array<string>,
  setRepostBlogs: (key: string, value: boolean) => void,
  blogName: string,
  submitRepostedBlogs: () => Promise<any>
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

export default class RepostSiteOptions extends React.PureComponent<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (this.initalRepostedBlogs === null) {
      this.initalRepostedBlogs = nextProps.repostBlogs.slice();
    }
  }
  initalRepostedBlogs = null;

  handleCheck = (e: InputEvent, isChecked: boolean) => {
    this.props.setRepostBlogs(e.currentTarget.value, isChecked);
  };

  submitRepostedBlogs = () => {
    this.initalRepostedBlogs = [...this.props.repostBlogs];
    this.forceUpdate();
    this.props.submitRepostedBlogs();
  };

  getSitesListing = (blogs: Array<string>) => {
    const { blogName } = this.props;
    return blogs.map(
      blog =>
        blogName === blog ? null : (
          <Checkbox
            checked={this.props.repostBlogs.indexOf(blog) !== -1}
            disabled={
              this.initalRepostedBlogs &&
              this.initalRepostedBlogs.indexOf(blog) !== -1
            }
            key={blog}
            label={blog}
            value={blog}
            onCheck={this.handleCheck}
            className="layout-line-form"
          />
        )
    );
  };

  render() {
    return (
      <div>
        <Row>
          <Col sm={12}>
            <Label label="Crosspost a otros medios" />
          </Col>
          {Object.keys(formatedBlogs).map(key => (
            <Col sm key={key}>
              {this.getSitesListing(formatedBlogs[key].sites)}
            </Col>
          ))}
        </Row>
        <Row>
          <Col sm>
            <RaisedButton
              disabled={
                !this.initalRepostedBlogs ||
                this.props.repostBlogs.length -
                  this.initalRepostedBlogs.length ===
                  0
              }
              label="Enviar Crosspost"
              onClick={this.submitRepostedBlogs}
              secondary
            />
          </Col>
        </Row>
      </div>
    );
  }
}
