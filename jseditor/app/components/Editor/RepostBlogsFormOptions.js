import React, { PropTypes } from 'react';
import CheckboxGroup from 'react-checkbox-group';

var blogs = ["decoesfera", "ahorrodiario", "applesfera", "bebesymas",
         "blogdecine", "diariodelviajero", "directoalpaladar", "elblogsalmon",
         "genbeta", "genbetadev", "motorpasion", "motorpasionfuturo", "pequesymas",
         "pymesyautonomos", "trendencias", "vayatele", "vidaextra", "vitonica",
         "xatakandroid", "xatakaciencia", "xatakafoto", "xatakahome", "xatakamexico",
         "xatakamovil", "xatakawindows", "xatakaon", "xatakacolombia"];
class RepostBlogsFormOptions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value : []
    };
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.repostBlogs
    });
  }
  render () {
    var checks = '';
    checks = blogs.map(function(blogName,i){
      return (
        React.createElement("label", {key: i,className: "label-inline"}, React.createElement("input", {type:"checkbox",value: blogName,name:"postRepostBlogNames[]"}, blogName))
      )
    })
    return (
      <div className="form-group" id="repost-blogs">
        <fieldset className="country">
          <legend>Repost en otros blogs</legend>
          <CheckboxGroup
              name="repostblogs"
              value={this.state.value}
              ref="repostBlogOptions"
          >
            <div className="field-repost">{checks}</div>
          </CheckboxGroup>
        </fieldset>
      </div>
    )
  }
}

export default RepostBlogsFormOptions;
