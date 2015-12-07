import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import NotFoundPage from '../components/NotFoundPage';
import Editor from '../components/Editor/Editor';
import Publish from '../components/Editor/Publish';
import Config from '../components/Config/Config';
import ConfigList from '../components/Config/ConfigList';
import { Router, Route, DefaultRoute, NotFoundRoute } from 'react-router';

export default (
  <Route name="main" handler={Main} path="/">
    <Route name="editpost" path="edit/post/:postname" handler={Editor} />
    <Route name="publishpost" path="publish/:postname" handler={Publish} />    
    <Route name="newpost" path="post/new" handler={Editor} />
    <Route name="newconfig" path="config/new" handler={Config} />
    <Route name="listconfig" path="config" handler={ConfigList} />
    <Route name="editconfig" path="config/:configId" handler={Config} />

    <DefaultRoute handler={Home} />
    <NotFoundRoute handler={NotFoundPage}/>
  </Route>
);
