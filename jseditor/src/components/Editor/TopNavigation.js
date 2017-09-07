import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone';
import PreviewOnSite from './PreviewOnSite';

export default function TopNavigation(props) {
  let updateButton = null,
    publishButton = null;
  if (
    props.status == 'publish' &&
    moment(props.publishData.postDate, 'DD/MM/YYYY HH:mm:ss').isBefore(moment())
  ) {
    updateButton = (
      <Link
        className="glyphicon glyphicon-refresh"
        to=""
        onClick={props.updateOnBackend}
      >
        <span>Update</span>
      </Link>
    );
  }
  publishButton = (
    <Link
      className="glyphicon glyphicon-ok"
      to={
        '/publicar/' +
        props.id +
        '?blog=' +
        props.blogName +
        '&userid=' +
        props.userId
      }
      onClick={props.enablePublish}
    >
      <span>Go to Publish</span>
    </Link>
  );

  return (
    <div>
      <div className="nav-btns-top">
        {props.id
          ? <Link
              className="glyphicon glyphicon-upload"
              to=""
              onClick={props.toggleCloudinaryUploader}
            >
              <span>Upload Images</span>
            </Link>
          : null}
        <Link
          className="glyphicon glyphicon-move js-minimise"
          to=""
          onClick={props.toggleOrderMode}
        >
          <span>Order Elements</span>
        </Link>
        {props.isSynced
          ? <PreviewOnSite postId={props.id} blogUrl={props.blogUrl} />
          : null}
        {updateButton}
        {publishButton}
        <span
          title={props.isConnected ? 'Connected' : 'No connection'}
          className={
            'glyphicon glyphicon-signal status-' +
            (props.isConnected ? 'on' : 'off')
          }
        />
      </div>
    </div>
  );
}
