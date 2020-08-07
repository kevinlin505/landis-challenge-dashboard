import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from '@components/home/Home';
import Accounts from '@components/accounts/Accounts';
import Overview from '@components/overview/Overview';

const AppRouter = () => {
  return (
    <HashRouter>
      <Route component={Home} exact path="/" />
      <Route component={Accounts} exact path="/accounts" />
      <Route component={Overview} exact path="/insights" />
    </HashRouter>
  );
};

export default AppRouter;
