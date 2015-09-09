import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import Editor from '../components/Editor/Editor';
import { Router, Route, DefaultRoute } from 'react-router';

export default (
  <Route path="/" handler={Main}>
    <Route path="edit/post/:postname" handler={Editor} />
    <Route path="post/new" handler={Editor} />
    <DefaultRoute handler={Home} />
  </Route>
);
