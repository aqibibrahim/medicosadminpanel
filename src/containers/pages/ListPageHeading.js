import React, { useState } from "react";
import { Row, Button } from "reactstrap";
import { injectIntl } from "react-intl";

import { Colxx, Separator } from "components/common/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";

import Breadcrumb from "../navs/Breadcrumb";

const ListPageHeading = ({ match, onAddClick, heading }) => {
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);

  return (
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            <IntlMessages id={heading} />
          </h1>

          <div className="text-zero top-right-button-container">
            <Button color="primary" size="lg" className="top-right-button" onClick={onAddClick}>
              <IntlMessages id="pages.add-new" />
            </Button>
          </div>
          <Breadcrumb match={match} />
        </div>

        <div className="mb-2">
          <Button
            color="empty"
            className="pt-0 pl-0 d-inline-block d-md-none"
            onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
          >
            <IntlMessages id="pages.display-options" /> <i className="simple-icon-arrow-down align-middle" />
          </Button>
        </div>
        <Separator className="mb-5" />
      </Colxx>
    </Row>
  );
};

export default injectIntl(ListPageHeading);
