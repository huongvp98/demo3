import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Header from '@containers/header';
import Footer from '@containers/footer';
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
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default Layout;
