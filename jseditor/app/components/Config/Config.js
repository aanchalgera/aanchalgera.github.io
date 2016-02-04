import React, {Component} from 'react';
import helpers from '../../utils/generatehash';
import {Link} from 'react-router';

let hashId = helpers.generatePushID();

class Config extends Component {
    constructor(props) {
        super(props);
        this.state = {
            siteName: '',
            siteUrl: '',
            cloudinaryUrl: '',
            cdnUrl: '',
            errors: ''
        };
    };

    componentDidMount() {
        this.init();
    }

    init() {
        var configId = this.props.routeParams.configId;
        if (undefined != configId) {
          this.props.base.fetch("config/" + configId, {
            context: this,
            then(data){
              if (null != data) {
                this.setState({
                  id : data.id,
                  siteName: data.site_name,
                  siteUrl: data.site_url,
                  cloudinaryUrl: data.cloudinary_url,
                  cdnUrl: data.cdn_url
                });
              }
            }
          });
        } else {
          hashId = helpers.generatePushID();
          this.setState({
            id : hashId
          }, this.context.router.push('/config/'+hashId));
        }
    }

    handleSiteNameChange(event) {
        this.setState({siteName: event.target.value})
    }

    handleSiteUrlChange(event) {
        this.setState({siteUrl: event.target.value})
    }

    handleCloudinaryChange(event) {
        this.setState({cloudinaryUrl: event.target.value})
    }

    handleCdnUrlChange(event) {
        this.setState({cdnUrl: event.target.value})
    }


    render() {
        var errorField = '';
        if ('' != this.state.errors) {
          errorField = <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="sr-only">Error:</span> {this.state.errors}</div>;
        }
        return (
        <div>
          <div>
            <Link to="/configs" className="btn btn-primary">Config List Page</Link>
            <Link to="/" className="btn btn-primary">Post List Page</Link>
            <Link to="/post/new" className="btn btn-primary">New Post</Link>
          </div>
          {errorField}
            <div className="row">
                <div className="col-xs-12 col-md-8 col-md-offset-2 well">
                    <div className="form-group">Site Name: <input className="form-control" ref="site_name" type="text" value={this.state.siteName} onChange={this.handleSiteNameChange.bind(this)} /></div>
                    <div className="form-group">Site Url: <input className="form-control" ref="site_url" type="text" value={this.state.siteUrl} onChange={this.handleSiteUrlChange.bind(this)} /></div>
                    <div className="form-group">Cloudinary Url: <input className="form-control" ref="cloudinary_url" type="text" value={this.state.cloudinaryUrl} onChange={this.handleCloudinaryChange.bind(this)} /></div>
                    <div className="form-group">Cdn Url: <input className="form-control" ref="cdn_url" type="text" value={this.state.cdnUrl} onChange={this.handleCdnUrlChange.bind(this)} /></div>
                    <button onClick={this.checkDuplicateSiteName.bind(this)} className="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
        )
    }

    saveRecord(result) {
        if ('' === this.refs.site_name.value.trim()) {
            this.setState({errors: 'Site Name can not be empty'})
            return false;
        }
        if ('' === this.refs.site_url.value.trim()) {
            this.setState({errors: 'Site Url can not be empty'})
            return false;
        }
        if ('' === this.refs.cloudinary_url.value.trim()) {
            this.setState({errors: 'Cloudinary Url can not be empty'})
            return false;
        }
        if ('' === this.refs.cdn_url.value.trim()) {
            this.setState({errors: 'Cdn Url can not be empty'})
            return false;
        }
        this.setState({errors: ''})
        var data = {
            id: this.state.id,
            site_name: this.refs.site_name.value,
            site_url: this.refs.site_url.value,
            cloudinary_url: this.refs.cloudinary_url.value,
            cdn_url: this.refs.cdn_url.value
        };

        this.props.base.post(
            'config/'+this.state.id,
            {
                data: data,
                then(data) {console.log('saved');}
            }
        );
    }

    checkDuplicateSiteUrl() {
        this.props.base.fetch('config',  {
                context: this,
                state: 'config',
                asArray: true,
                queries: {
                    orderByChild: 'site_url',
                    equalTo: this.state.siteUrl.trim()
                },
                then(data) {
                    var total = data.length;
                    var i;
                    for (i = 0; i < total; i++) {
                        if (this.state.id != data[i].id) {
                            this.setState({errors: 'Another record with same site url already exists'})
                            return false;
                        }
                    }
                    this.saveRecord();
                }
            }
        );
    }

    checkDuplicateSiteName() {
        this.props.base.fetch('config',  {
                context: this,
                state: 'config',
                asArray: true,
                queries: {
                    orderByChild: 'site_name',
                    equalTo: this.state.siteName.trim()
                },
                then(data) {
                    var total = data.length;
                    var i;
                    for (i = 0; i < total; i++) {
                        if (this.state.id != data[i].id) {
                            this.setState({errors: 'Another record with same site name already exists'})
                            return false;
                        }
                    }
                    this.checkDuplicateSiteUrl();
                    return true;
                }
            }
        );
    }
}

Config.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Config;
