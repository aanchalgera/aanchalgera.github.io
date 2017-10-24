import React from 'react';

import { loadSites } from './lib/service';

import Tag from './Tag';
import Category from './Category';

export default class SectionModule extends React.Component {
  state = {
    option: 'categoria',
    tag: '',
    category: ''
  };

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

  handleOptionChange = (e: InputEvent) => {
    let option = e.currentTarget.value;
    this.setState({ option: option });
  };

  updateParent = data => {
    this.setState(data);
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
        Categoría:
        <input
          type="radio"
          value="category"
          onChange={this.handleOptionChange}
          checked={
            !this.props.data.selected || 'category' == this.props.data.selected
          }
        />
        <br />
        tag:
        <input
          type="radio"
          value="tag"
          onChange={this.handleOptionChange}
          checked={'tag' == this.props.data.selected}
        />
        <br />
        {!this.props.data.selected ||
        'category' === this.props.data.selected ? (
          <Category
            postType="normal"
            blogUrl="https://testing.xataka.com"
            updateParent={this.updateParent}
            category={this.props.data.category}
          />
        ) : (
          <Tag
            blogUrl="https://testing.xataka.com"
            updateParent={this.updateParent}
          />
        )}
      </div>
    );
  }
}
