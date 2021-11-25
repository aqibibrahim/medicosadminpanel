import DataList from "containers/pages/DataList";
import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Social = React.lazy(() => import(/* webpackChunkName: "profile-social" */ "./social"));

const PagesProfile = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/Profession`} />
      <Route
        path={`${match.url}/Profession`}
        render={(props) => (
          <DataList
            {...props}
            heading="menu.Profession"
            api={{
              getall: `/admin/connect/profession/`,
              create: `/api/admin/connect/profession/create`,
              // delete: `/admin/connect/interests/hobby/`,
              update: `/admin/connect/profession/update`,
            }}
          />
        )}
      />
      <Route path={`${match.url}/social`} render={(props) => <Social {...props} />} />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PagesProfile;
