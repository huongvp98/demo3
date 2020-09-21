import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RouterWithPaths from '@components/common/RouterWithPaths';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import Loadable from 'react-loadable';
import { AUTH_LOGIN } from '@utils/client-utils';
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

const Logout = connect(null, ({ auth: { onLogout } }) => ({
  onLogout,
}))((props) => {
  props.onLogout();
  return null;
});

function Main(props) {
  const history = useHistory();
  const { auth } = props;

  useEffect(() => {
    if (window.location.pathname === '/logout') return;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const authCode = urlParams.get('code');
    if (authCode) {
      onLogin(authCode, window.location.origin);
    } else {
      if (!props.auth || !props.auth.access_token) {
        console.log(AUTH_LOGIN, 'AUTH_LOGIN');
        window.location.href = AUTH_LOGIN;
      }
    }
  }, []);

  const onLogin = (code, redirectURI) => {
    props.updateData({ auth: null });
    props
      .onLogin({ code, redirectURI })
      .then((s) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const state = urlParams.get('state');
        if (history) history.push(`${decodeURIComponent(state)}`);
      })
      .catch((e) => {});
  };

  const routers = [
    {
      path: ['/'],
      component: Loadable({
        loader: () => import('@containers'),
        loading: Loading,
      }),
    },
    {
      path: ['/logout'],
      component: Logout,
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

  if (!auth) {
    return null;
  }

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
  return {
    auth: state.auth.auth,
  };
}

export default connect(
  mapStateToProps,
  ({ auth: { updateData, onLogin, onLogout } }) => ({
    updateData,
    onLogin,
    onLogout,
  }),
)(Main);
