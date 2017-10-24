import React from 'react';

import { loadSites } from './lib/service';

import Tag from './Tag';
import Category from './Category';

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

  updateParent = data => {
    this.props.updateResource(this.props.dataId, data);
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
        <input
          type="radio"
          value="category"
          data-key="selected"
          onChange={this.updateSection}
          checked={'category' === this.props.data.selected}
        />
        Categoría
        <br />
        <input
          type="radio"
          value="tag"
          data-key="selected"
          onChange={this.updateSection}
          checked={'tag' === this.props.data.selected}
        />Tag
        <br />
        {!this.props.data.selected ||
        'category' === this.props.data.selected ? (
          <Category
            postType="normal"
            siteUrl={this.props.blogUrl}
            updateParent={this.updateParent}
            category={this.props.data.category}
          />
        ) : (
          [
            <Tag
              key="1"
              siteUrl={this.props.blogUrl}
              updateParent={this.updateParent}
              tag={this.props.data.tag}
            />,
            <span key="2" className="hint">
              Sugerencias (clik para añadir: )
            </span>
          ]
        )}
      </div>
    );
  }
}
