import React from 'react';
import { Route } from 'react-router-dom';

const CustomRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return <Component {...rest} match={props.match} />;
    }}
  />
);

export default CustomRoute;
