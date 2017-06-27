import React from 'react';
import Main from '../components/Main';
import Publish from '../containers/Publish';
import { Switch, Route } from 'react-router-dom';

export default () => (
  <Switch>
    <Route path="/publicar/:postname" component={Publish}/>
    <Route path="/" component={Main}/>
  </Switch>
);
