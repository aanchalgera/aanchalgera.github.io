import React from 'react';

import { loadSites } from './lib/service';

export default class SectionModule extends React.Component {
  componentDidMount() {
    let sites = loadSites(this.props.base);
  }

  focus() {
    const field = this.refs.field;
    if (field) {
      field.focus();
    }
  }

  updateSection = (e: InputEvent) => {
    let sectionModule = [];
    sectionModule[e.currentTarget.dataset.key] = e.currentTarget.value;
    this.props.updateResource(this.props.dataId, sectionModule);
  };

  render() {
    return (
      <div>
        <label className="ptitle">
          Título <span className="hint">(Límite: 15 caracteres)</span>
        </label>
        <input
          type="text"
          ref="field"
          className="form-control"
          data-key="title"
          defaultValue={this.props.data.title}
          onBlur={this.updateSection}
        />
        <label className="ptitle">Sitio</label>
        <input
          type="text"
          className="form-control"
          data-key="site"
          defaultValue={this.props.data.site}
          onBlur={this.updateSection}
        />
      </div>
    );
  }
}
