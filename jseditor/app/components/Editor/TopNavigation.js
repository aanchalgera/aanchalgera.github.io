import React from 'react';
import { Link } from 'react-router';
import moment from 'moment-timezone';
import PreviewOnSite from './PreviewOnSite';

export default function TopNavigation(props) {
  let updateButton;
  if (props.status == 'publish' && moment(props.publishData.postDate, 'DD/MM/YYYY HH:mm:ss').isBefore(moment())) {
    updateButton = (
      <Link className= "glyphicon glyphicon-refresh" to="" disabled={props.buttonDisabled} onClick={props.updateOnBackend}>
        <span>Update</span>
      </Link>
    );
  } else if (props.isSynced) {
    updateButton = (
      <Link className="glyphicon glyphicon-ok" to={'/publish/' + props.id + '?blog=' + props.blogName + '&userid=' + props.userId} onClick={props.enablePublish} >
        <span>Go to Publish</span>
      </Link>
    );
  }

  return (
    <div>
      <div className="preview-nav">
        <Link className="glyphicon glyphicon-wrench" to="/configs"><span>Go to Config</span></Link>
        <Link className="glyphicon glyphicon-cog" to="/config/new"><span>Add Config</span></Link>
      </div>
      <div className="nav-btns-top">
        {props.id ? <Link className="glyphicon glyphicon-upload" to="" onClick={props.toggleCloudinaryUploader}><span>Upload Images</span></Link> : null}
        <Link className="glyphicon glyphicon-move js-minimise" to="" onClick={props.toggleOrderMode}><span>Order Elements</span></Link>
        {props.isSynced ? <PreviewOnSite postId={props.id} blogUrl={props.blogUrl} /> : null}
        {updateButton}
        <span className={'glyphicon glyphicon-signal status-' + (props.isConnected ? 'on' : 'off')}></span>
      </div>
    </div>

  );
}
