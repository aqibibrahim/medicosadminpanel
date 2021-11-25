import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import DataList from "containers/pages/DataList";
import PersnolityComparison from 'containers/pages/Persnolit-Judgment-comparison';
const PagesProduct = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/data-list`} />
      <Route
        path={`${match.url}/data-list`}
        render={(props) => (
          <DataList
            key="menu.data-list"
            {...props}
            heading="menu.data-list"
            api={{
              getall: `/admin/connect/interests/hobby`,
              create: `/admin/connect/interests/hobby/create`,
              delete: `/admin/connect/interests/hobby/`,
              update: `/admin/connect/interests/hobby/update`,
            }}
          />
        )}
      />
      <Route
        path={`${match.url}/image-list`}
        render={(props) => (
          <DataList
            key="menu.image-list"
            {...props}
            heading="menu.image-list"
            api={{
              getall: `/admin/connect/interests/personality/`,
              create: `/admin/connect/interests/personality/create`,
              delete: `/admin/connect/interests/personality/`,
              update: `/admin/connect/interests/personality/update`,
            }}
          />
        )}
      />
      <Route
        path={`${match.url}/thumb-list`}
        render={(props) => (
          <DataList
            key="menu.thumb-list"
            {...props}
            heading="menu.thumb-list"
            api={{
              getall: `/admin/connect/interests/lifestyle/`,
              create: `/admin/connect/interests/lifestyle/create`,
              delete: `/admin/connect/interests/lifestyle/`,
              update: `/admin/connect/interests/lifestyle/update`,
            }}
          />
        )}
      />
      <Route
        path={`${match.url}/details`}
        render={(props) => (
          <DataList
            key="menu.details"
            {...props}
            heading="menu.details"
            api={{
              getall: `/admin/connect/interests/likes/`,
              create: `/admin/connect/interests/likes/create`,
              delete: `/admin/connect/interests/likes/`,
              update: `/admin/connect/interests/likes/update`,
            }}
          />
        )}
      />
      <Route
        path={`${match.url}/details-alt`}
        render={(props) => (
          <DataList
            key="menu.details-alt"
            {...props}
            heading="menu.details-alt"
            api={{
              getall: `/admin/connect/interests/personality-judgement`,
              create: `/admin/connect/interests/personality-judgement/create`,
              delete: `/admin/connect/interests/personality-judgement`,
              update: `/admin/connect/interests/personality-judgement/update`,
            }}
          />
        )}
      />
      <Route
        path={`${match.url}/details-alt2`}
        render={(props) => (
          <PersnolityComparison
            key="menu.details-alt2"
            {...props}
            heading="menu.details-alt2"
            api={{
              getall: `/admin/connect/interests/personality-judgement`,
              create: `/admin/connect/interests/personality-judgement/create`,
              delete: `/admin/connect/interests/personality-judgement`,
              update: `/admin/connect/interests/personality-judgement/update`,
            }}
          />
        )}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default PagesProduct;
