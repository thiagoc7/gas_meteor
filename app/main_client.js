import React from 'react';
import App from './App.jsx';

Meteor.startup(() => {
  React.render(<App/>, document.getElementById('root'));
});
