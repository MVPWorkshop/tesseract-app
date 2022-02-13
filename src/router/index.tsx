import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import HomePage from "../components/pages/Home/home.page";
import VaultsPage from "../components/pages/Vaults/vaults.page";
import NotFoundPage from "../components/pages/NotFound/notFound.page";
import { ERoutes } from "./router.types";

const AppRouter = () => (
  <HashRouter>
    <Switch>
      <Route path={ERoutes.LANDING} exact={true} component={HomePage} />
      <Route path={`${ERoutes.VAULTS}/:network?`} exact={true} component={VaultsPage} />
      <Route path={ERoutes.NOT_FOUND} exact={true} component={NotFoundPage} />

      <Redirect to={ERoutes.NOT_FOUND} />
    </Switch>
  </HashRouter>
);

export default AppRouter;
