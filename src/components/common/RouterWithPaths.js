import React from 'react';
import { Route } from 'react-router-dom';

export default ({ path, ...rest }) => {
  return typeof path === 'string' ? (
    <Route path={path} {...rest} />
  ) : (
    path.map((item, index) => {
      return <Route path={item} {...rest} key={index} />;
    })
  );
};
