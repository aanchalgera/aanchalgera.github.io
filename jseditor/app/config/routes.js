import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import NotFoundPage from '../components/NotFoundPage';
import Editor from '../components/Editor/Editor';
import { Router, Route, DefaultRoute, NotFoundRoute } from 'react-router';

export default (
  <Route name="main" handler={Main} path="/">
    <Route name="editpost" path="edit/post/:postname" handler={Editor} />
    <Route name="newpost" path="post/new" handler={Editor} />
    <DefaultRoute handler={Home} />
    <NotFoundRoute handler={NotFoundPage}/>
  </Route>
);
