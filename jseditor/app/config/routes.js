import React from 'react';
import Main from '../components/Main';
import { Switch, Route } from 'react-router-dom';

export default () => (
  <Switch>
    <Route path="/" component={Main}/>
  </Switch>
);
