// @flow
import React from 'react';

import Tag from './Tag';
import Category from './Category';
import Sites from './Sites';
import { InputEvent } from 'lib/flowTypes';

type Props = {
  data: {
    type: string,
    title: string,
    site: string,
    selected: string,
    category: number,
    tag: string,
    moreText: string
  },
  updateResource: (dataId: number, sectionModule: Array) => void,
  siteUrl: string,
  dataId: number,
  postType: string
};

export class SectionModule extends React.PureComponent {
  props: Props;

  focus() {
    if (this.field) {
      this.field.focus();
    }
  }

  updateSection = (e: InputEvent) => {
    let sectionModule = [];
    sectionModule[e.currentTarget.dataset.key] = e.currentTarget.value;
    this.props.updateResource(this.props.dataId, sectionModule);
  };

  updateParent = (data: {}) => {
    this.props.updateResource(this.props.dataId, data);
  };

  render() {
    return (
      <div className="asset-size-normal">
        <label className="ptitle">
          Título <span className="hint">(Límite: 20 caracteres)</span>
        </label>
        <input
          type="text"
          ref={component => {
            this.field = component;
          }}
          className="form-control"
          data-key="title"
          defaultValue={this.props.data.title}
          onBlur={this.updateSection}
          maxLength={20}
        />
        <label className="ptitle">Sitio</label>
        <Sites site={this.props.data.site} updateParent={this.updateParent} />
        <input
          type="radio"
          value="category"
          data-key="selected"
          onChange={this.updateSection}
          checked={'category' === this.props.data.selected}
        />
        <label className="ptitle">Categoría</label>
        <br />
        <input
          type="radio"
          value="tag"
          data-key="selected"
          onChange={this.updateSection}
          checked={'tag' === this.props.data.selected}
        />
        <label className="ptitle">Tag</label>
        <br />
        {'category' === this.props.data.selected ? (
          <Category
            postType={this.props.postType}
            siteUrl={this.props.siteUrl}
            updateParent={this.updateParent}
            category={this.props.data.category}
            siteName={this.props.data.site}
          />
        ) : (
          [
            <Tag
              key="1"
              siteUrl={this.props.siteUrl}
              updateParent={this.updateParent}
              tag={this.props.data.tag}
              siteName={this.props.data.site}
            />,
            <span key="2" className="hint">
              Sugerencias (clik para añadir: )
            </span>
          ]
        )}
        <br />
        <label className="ptitle">More Button Text</label>
        <input
          type="text"
          className="form-control"
          data-key="moreText"
          defaultValue={this.props.data.moreText}
          onBlur={this.updateSection}
          maxLength={20}
        />
      </div>
    );
  }
}
