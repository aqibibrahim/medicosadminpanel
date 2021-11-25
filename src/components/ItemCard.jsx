import React from "react";
import { NavLink } from "react-router-dom";
import { Badge, Card } from "reactstrap";

export default function ItemCard(props) {
  const { item, extraDetail, titleTo = `?p=${item.id}`, actionButtons } = props;

  return (
    <Card className="d-flex flex-row">
      <div className="pl-2 d-flex flex-grow-1 min-width-zero">
        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
          <NavLink to={titleTo} className="w-40 w-sm-100">
            <p className="list-item-heading mb-1 truncate">{item.title}</p>
          </NavLink>

          {extraDetail &&
            Object.entries(extraDetail).map(([key, val]) => (
              <Badge pill className="mr-1">
                {key}: {`${item[val]}`}
              </Badge>
            ))}
        </div>
        <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">{actionButtons}</div>
      </div>
    </Card>
  );
}
