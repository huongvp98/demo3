import React from 'react';
import Main from './Main';
import { Provider } from 'react-redux';
import stores from '@redux-store/stores';
import { BrowserRouter } from 'react-router-dom';

const Kernel = () => (
  <Provider store={stores}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>
);
export default Kernel;
