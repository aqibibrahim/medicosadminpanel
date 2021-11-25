import React, { useState, useEffect } from "react";
import Pagination from "containers/pages/Pagination";
import { Alert, Row } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import { Pencil, Eject, Check, Dash } from "react-bootstrap-icons";
import axios from "axios";
import swal from "sweetalert";
import ItemCard from "components/ItemCard";
import EditDrawer from "components/EditDrawer";
import EditDrawer2 from "components/EditDrawer2";
import ListPageHeading from "./ListPageHeading";
import AddNewModal from "./AddNewModal";

export default function UserList({ match, api, heading, extraDetail }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();

  function fun() {
    alert("This is an alert dialog box");
  }
  useEffect(() => {
    console.clear();
    axios
      .get(api.getall)
      .then((res) => res.data)
      .then((data) => {
        setTotalPage(data.totalPage);
        setItems(data.data.map((item) => ({ id: item._id, title: item.name ?? item.username, ...item })));
        setIsLoaded(true);
      });
  }, [currentPage]);

  function onDelete(id) {
    axios.delete(api.delete + id).then(() => {
      swal({
        title: "Are you sure ??",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", { icon: "success" });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    });
  }

  function onActive(id) {
    swal({
      title: "Are you sure ??",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      axios.put(`/admin-users/active-user/${id}`).then(() => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", { icon: "success" });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    });
  }

  function onInactive(id) {
    swal({
      title: "Are you sure ??",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      axios.put(`/admin-users/inactive-user/${id}`).then((res) => {
        console.log(res);
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", { icon: "success" });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    });
  }

  function onCreate(data) {
    axios
      .post(api.create, data)
      .then(() => {
        swal("success fully added", "You clicked the button!", "success");
        setModal("");
      })
      .catch(() => {
        swal("you are added", "You clicked the button!", "error");
      });
  }

  function onEdit(data) {
    axios
      .put(api.update, { id: selectedItem?.id, ...data })
      .then(() => {
        swal("success fully Updated", "You clicked the button!", "success");
        setModal("");
      })
      .catch(() => {
        swal("Error", "You clicked the button!", "error");
      });
  }

  if (!isLoaded) return <div className="loading" />;

  return (
    <div className="disable-text-selection">
      <ListPageHeading heading={heading} match={match} onAddClick={() => setModal("create")} />
      <AddNewModal onSubmit={onCreate} modalOpen={modal === "create"} onClose={() => setModal("")} />
      <EditDrawer
        modalOpen={modal === "edit"}
        value={selectedItem?.title}
        onClose={() => setModal("")}
        onSubmit={onEdit}
      />
      <EditDrawer2
        modalOpen={modal === "edit2"}
        value={selectedItem?.title}
        onClose={() => setModal("")}
        onSubmit={onEdit}
      />
      <Row>
        {items.length ? (
          items.map((item, index) => (
            <Colxx xxs="12" className="mb-3" key={index}>
              <ItemCard
                item={item}
                titleTo=""
                extraDetail={{
                  Email: "email",
                  Status: "user_status",
                  Tier: "user_tier",
                  Verified: "is_verified",
                }}
                actionButtons={
                  <div className="row">
                    <div className="col">
                      <Pencil
                        onClick={() => {
                          setSelectedItem(item);
                          setModal("edit2");
                          localStorage.setItem("user_documentable_id", item._id);
                        }}
                        color="royalblue"
                        size={16}
                      />
                    </div>
                    <div className="col">
                      {item.user_status == "Active" ? (
                        <Dash onClick={() => onInactive(item.id)} color="red" size={16} />
                      ) : (
                        <Check onClick={() => onActive(item.id)} color="royalblue" size={16} />
                      )}
                    </div>
                    {/* <div className="col">
                      <Eject color="red" size={16} role="button" onClick={() => onDelete(item.id)} />
                    </div> */}
                  </div>
                }
              />
            </Colxx>
          ))
        ) : (
          <div>Noo Data Found</div>
        )}
        <Pagination currentPage={currentPage} totalPage={totalPage} onChangePage={(i) => setCurrentPage(i)} />
      </Row>
    </div>
  );
}
