import React from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import HomePage from "../components/pages/Home/home.page";
import VaultsPage from "../components/pages/Vaults/vaults.page";

const AppRouter = () => (
  <HashRouter>
    <Switch>
      <Route path='/' exact={true} component={HomePage} />
      <Route path='/vaults' exact={true} component={VaultsPage} />

      <Redirect to={"/not-found"}/>
    </Switch>
  </HashRouter>
);

export default AppRouter;
