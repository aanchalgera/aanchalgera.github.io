import React from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

let blogs = [
  'decoesfera', 'ahorrodiario', 'applesfera', 'bebesymas',
  'blogdecine', 'diariodelviajero', 'directoalpaladar', 'elblogsalmon',
  'genbeta', 'genbetadev', 'motorpasion', 'motorpasionfuturo', 'pequesymas',
  'pymesyautonomos', 'trendencias', 'vayatele', 'vidaextra', 'vitonica',
  'xatakandroid', 'xatakaciencia', 'xatakafoto', 'xatakahome', 'xatakamexico',
  'xatakamovil', 'xatakawindows', 'xatakaon', 'xatakacolombia','xataka'
];

class RepostBlogsFormOptions extends React.Component {
  render () {
    return (
      <div className="form-group" id="repost-blogs">
        <fieldset className="country">
          <legend>Repost en otros blogs</legend>
          <CheckboxGroup
            name="repostblogs"
            className="field-repost"
            value={this.props.repostBlogs}
            ref="repostBlogOptions"
            onChange={this.props.setRepostBlogs.bind(this)}
          >
            { 
              blogs.map((blog, index) => (
                this.props.blogName == blog ? null: (
                  <label key={index} className="label-inline">
                    <Checkbox value={blog} />{blog}
                  </label>
                )
              ))
            }
          </CheckboxGroup>
        </fieldset>
      </div>
    );
  }
}

export default RepostBlogsFormOptions;
