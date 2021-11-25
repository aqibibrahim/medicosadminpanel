import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import axios from "axios";

import ListPageHeading from "containers/pages/ListPageHeading";
import AddNewModal from "containers/pages/AddNewModal";
import Pagination from "containers/pages/Pagination";
import DataListView2 from "containers/pages/DataListView2";

const DataListPages = ({ match, heading, api, extraDetail, actionButtons }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(api.getall, { headers: { "x-access-token": JSON.parse(localStorage.getItem("current_user")).token } })
      .then((res) => res.data)
      .then((data) => {
        setTotalPage(data.totalPage);
        setItems(data.data.map((item) => ({ id: item._id, title: item.name ?? item.username, ...item })));
        setIsLoaded(true);
      });
  }, [currentPage]);

  if (!isLoaded) return <div className="loading" />;

  return (
    <div className="disable-text-selection">
      <ListPageHeading heading={heading} match={match} toggleModal={() => setModalOpen(!modalOpen)} />
      <AddNewModal api={api} modalOpen={modalOpen} toggleModal={() => setModalOpen(!modalOpen)} />
      <Row>
        {/* <DataListView2/> */}
        {/* {items.map((product) => (
          <DataListView2
            extraDetail={extraDetail}
            actionButtons={actionButtons}
            deleteurl={api.delete}
            updateurl={api.update}
            key={product.id}
            product={product}
          />
        ))} */}
        <Pagination currentPage={currentPage} totalPage={totalPage} onChangePage={(i) => setCurrentPage(i)} />
      </Row>
    </div>
  );
};

export default DataListPages;
