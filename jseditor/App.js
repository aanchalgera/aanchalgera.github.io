import React from 'react';
import Router from 'react-router';
import routes from './app/config/routes';

Router.run(routes, (Root, state) => {
  React.render(<Root {...state} />, document.getElementById('app'));
});