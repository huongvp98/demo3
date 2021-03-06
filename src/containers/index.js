import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Loadable from 'react-loadable';
import Header from '@containers/header';
import Footer from '@containers/footer';
import { getState } from '../redux-store/stores';
function Loading() {
  return <div></div>;
}
// function NotFound() {
//   return (
//     <>
//       <div
//         style={{ marginTop: 130, minHeight: 'calc(100vh - 130px)' }}
//       >
//         <h2>Not found</h2>
//       </div>
//     </>
//   );
// }

function Layout(props) {
  const routers = [
    {
      path: ['/'],
      component: Loadable({
        loader: () => import('@containers/home'),
        loading: Loading,
      }),
    },
    {
      path: ['/cart'],
      component: Loadable({
        loader: () => import('@containers/cart'),
        loading: Loading,
      }),
    },
    {
      path: ['/contact'],
      component: Loadable({
        loader: () => import('@containers/contact'),
        loading: Loading,
      }),
    },
    {
      path: ['/report'],
      component: Loadable({
        loader: () => import('@containers/report'),
        loading: Loading,
      }),
    },
  ];
  const history = useHistory();
  const url = window.location.pathname;
  if (url !== '/') {
    const auth = getState().auth.auth;
    let checkAuth = auth && auth.id && auth.access_token;
    if (!checkAuth) {
      localStorage.clear();
      history.push('/login');
      return null;
    } else {
    }
  }
  return (
    <>
      <div className="page-wrapper">
        <Header />
      </div>
      <Switch>
        {routers.map((route, index) => {
          return (
            <Route
              exact
              path={route.path}
              key={index}
              component={route.component}
            />
          );
        })}
        {/* <Route component={NotFound} /> */}
      </Switch>
      <Footer />
    </>
  );
}

export default Layout;
