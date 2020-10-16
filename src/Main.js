import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import '@styles/app.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Containers from '@containers';
import Print from '@containers/print-bill';
import RouterWithPaths from '@components/RouterWithPaths';
function NotFound() {
  return (
    <>
      <h2>Not found</h2>
    </>
  );
}

function Main(props) {
  useEffect(() => {}, []);

  const routers = [
    {
      path: '/print-bill',
      component: Print,
    },
    {
      path: ['/', '/:function', '/:function/:id'],
      component: Containers,
    },
  ];
  return (
    <>
      <ToastContainer autoClose={3000} />
      <BrowserRouter>
        <Switch>
          {routers.map((route, key) => {
            if (route.component)
              return (
                <RouterWithPaths
                  exact
                  key={key}
                  path={route.path}
                  render={(props) => {
                    return <route.component {...props} />;
                  }}
                />
              );
            return null;
          })}
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  ({ book: { updateData } }) => ({
    updateData,
  }),
)(Main);
