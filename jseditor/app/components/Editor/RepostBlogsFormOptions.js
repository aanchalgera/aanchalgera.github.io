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
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.repostBlogs,
    });
  }

  addCheckBoxes(Checkbox) {
    var checkboxes = '';
    checkboxes = blogs.map(function (blog, index) {
      return <label key={index} className="label-inline">
        <Checkbox value={blog} />{blog}
      </label>;
    });

    return checkboxes;
  }

  render () {
    return (
      <div className="form-group" id="repost-blogs">
        <fieldset className="country">
          <legend>Repost en otros blogs</legend>
          <CheckboxGroup
              name="repostblogs"
              value={this.state.value}
              ref="repostBlogOptions"
              onChange={this.props.setRepostBlogs.bind(this)}
          >
          {
            Checkbox => (
              <div className="field-repost">
                {this.addCheckBoxes(Checkbox)}
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
