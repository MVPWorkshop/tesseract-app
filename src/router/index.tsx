import React from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import HomePage from "../components/pages/Home/home.page";
import VaultsPage from "../components/pages/Vaults/vaults.page";
import NotFoundPage from "../components/pages/NotFound/notFound.page";

export enum ERoutes {
  LANDING = "/",
  VAULTS = "/vaults",
  NOT_FOUND = "/not-found"
}

const AppRouter = () => (
  <HashRouter>
    <Switch>
      <Route path={ERoutes.LANDING} exact={true} component={HomePage} />
      <Route path={ERoutes.VAULTS} exact={true} component={VaultsPage} />
      <Route path={ERoutes.NOT_FOUND} exact={true} component={NotFoundPage} />

      <Redirect to={ERoutes.NOT_FOUND} />
    </Switch>
  </HashRouter>
);

export default AppRouter;
