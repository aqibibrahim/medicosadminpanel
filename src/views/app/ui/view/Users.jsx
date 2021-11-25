import DataList from "containers/pages/DataList";
import UserList from "containers/pages/UesrList";
import React from "react";

export default function Users(props) {
  return (
    <UserList
      {...props}
      heading="menu.image-list"
      api={{
        getall: `/admin-users/get-users`,
        create: `/admin/connect/interests/personality/create`,
        delete: `/admin/connect/interests/personality/`,
        update: `/admin/connect/interests/personality/update`,
      }}
    />
  );
}
