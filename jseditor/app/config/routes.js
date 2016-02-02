import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import NotFoundPage from '../components/NotFoundPage';
import Editor from '../components/Editor/Editor';
import Publish from '../components/Editor/Publish';
import Config from '../components/Config/Config';
import Configs from '../containers/Configs';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route component={Main} path="/">
    <Route path="configs" component={Configs} />
    <Route path="config/new" component={Config} />
    <Route path="config/:configId" component={Config} />
    <Route path="edit/post/:postname" component={Editor} />
    <Route path="post/new" component={Editor} />
    <Route path="publish/:postname" component={Publish} />
    <IndexRoute component={Home} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
