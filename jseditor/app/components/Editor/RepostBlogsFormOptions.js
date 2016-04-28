import React, { PropTypes } from 'react';
import CheckboxGroup from 'react-checkbox-group';

let blogs = ['decoesfera', 'ahorrodiario', 'applesfera', 'bebesymas',
         'blogdecine', 'diariodelviajero', 'directoalpaladar', 'elblogsalmon',
         'genbeta', 'genbetadev', 'motorpasion', 'motorpasionfuturo', 'pequesymas',
         'pymesyautonomos', 'trendencias', 'vayatele', 'vidaextra', 'vitonica',
         'xatakandroid', 'xatakaciencia', 'xatakafoto', 'xatakahome', 'xatakamexico',
         'xatakamovil', 'xatakawindows', 'xatakaon', 'xatakacolombia',
];

class RepostBlogsFormOptions extends React.Component {
  render () {
    return (
      <div className="form-group" id="repost-blogs">
        <fieldset className="country">
          <legend>Repost en otros blogs</legend>
          <CheckboxGroup
              name="repostblogs"
              value={this.props.repostBlogs}
              ref="repostBlogOptions"
              onChange={this.props.setRepostBlogs.bind(this)}
          >
          {
            Checkbox => (
              <div className="field-repost">
                {
                  blogs.map((blog, index) => (
                    <label key={index} className="label-inline">
                      <Checkbox value={blog} />{blog}
                    </label>)
                  )
                }
              </div>
            )
          }
          </CheckboxGroup>
        </fieldset>
      </div>
    );
  }
}

export default RepostBlogsFormOptions;
