import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Forms = React.lazy(() => import(/* webpackChunkName: "ui-forms" */ "./forms"));
const Components = React.lazy(() => import(/* webpackChunkName: "ui-components" */ "./components"));
const Users = React.lazy(() => import("./view/Users"));

const UI = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/users`} />
      <Route path={`${match.url}/users`} render={(props) => <Users {...props} />} />
      <Route path={`${match.url}/forms`} render={(props) => <Forms {...props} />} />
      <Route path={`${match.url}/components`} render={(props) => <Components {...props} />} />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default UI;
