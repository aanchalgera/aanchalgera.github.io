import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import NotFoundPage from '../components/NotFoundPage';
import Editor from '../components/Editor/Editor';
import Publish from '../components/Editor/Publish';
import Config from '../components/Config/Config';
import ConfigList from '../components/Config/ConfigList';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route component={Main} path="/">
    <Route path="edit/post/:postname" component={Editor} />
    <Route path="publish/:postname" component={Publish} />
    <Route path="post/new" component={Editor} />
    <Route path="config/new" component={Config} />
    <Route path="config" component={ConfigList} />
    <Route path="config/:configId" component={Config} />
    <IndexRoute component={Home} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
