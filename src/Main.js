import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RouterWithPaths from '@components/common/RouterWithPaths';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import Loadable from 'react-loadable';
import { useHistory } from 'react-router-dom';
import '@styles/app.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function Loading() {
  return <div></div>;
}

function NotFound() {
  return (
    <>
      <h2>Not found</h2>
    </>
  );
}

function Main(props) {
  const history = useHistory();
  const { auth } = props;

  useEffect(() => {}, []);

  const routers = [
    {
      path: ['/'],
      component: Loadable({
        loader: () => import('@containers'),
        loading: Loading,
      }),
    },

    {
      path: ['/:function'],
      component: Loadable({
        loader: () => import('@containers'),
        loading: Loading,
      }),
    },
    {
      path: ['/:function/:id'],
      component: Loadable({
        loader: () => import('@containers'),
        loading: Loading,
      }),
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
          <Route path="*" component={NotFound} />
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
