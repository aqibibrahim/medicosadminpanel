import React, { useState, useEffect } from "react";
import Pagination from "containers/pages/Pagination";
import { Row, Button } from "reactstrap";
import { Colxx } from "components/common/CustomBootstrap";
import { Pencil, Eject } from "react-bootstrap-icons";
import axios from "axios";
import swal from "sweetalert";
import ItemCard from "components/ItemCard";
import EditDrawer from "components/EditDrawer";
import ListPageHeading from "./ListPageHeading";
import AddNewModal from "./AddNewModal";
import Select from "react-select";
import CustomSelectInput from "components/common/CustomSelectInput";
import AsyncSelect from "react-select/async";
import { DropDownList } from "@progress/kendo-react-dropdowns";

export default function PersnolityComparison({ match, api, heading, extraDetail }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [items, setItems] = useState([]);
  const [personalities, setPersonalities] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [comparison_one, setComparisonOne] = useState("");
  const [comparison_two, setComparisonTwo] = useState("");
  const handleInputChange = (value) => {
    setValue(value);
  };

  // handle selection
  const handleChange = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    console.clear();
    // fetchData()
    axios
      .get("https://medicos-backend-app.herokuapp.com/api/admin/connect/interests/personality-judgement-comparison/")
      .then((res) => res.data)
      .then((data) => {
        // console.log(data)
        // setTotalPage(data.totalPage);
        setPersonalities(data.data.map((item) => ({ id: item._id, title: item.comparison_one.name + " vs " + item.comparison_two.name ?? item.username, ...item })));
        setIsLoaded(true);
        console.log(personalities);
      });
  }, []);
  // var array = [];
  useEffect(() => {
    console.clear();
    // fetchData()
    axios
      .get(api.getall)
      .then((res) => res.data)
      .then((data) => {
        setItems(data.data.map((item) => ({ id: item._id, title: item.name ?? item.username, ...item })));
       setIsLoaded(true);
        console.log(items);
      });
  }, []);


  function onDelete(id) {
    console.log(id)
    let apiurl = "https://medicos-backend-app.herokuapp.com/api/admin/connect/interests/personality-judgement-comparison/"
    axios.delete(apiurl + id).then(() => {
      swal({
        title: "Are you sure ??",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your Comparison has been deleted!", { icon: "success" });
        } else {
          swal("Your COmparison is Deleted!");
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
function getcomparison(){
  console.log(comparison_one,"",comparison_two)
}
function comparisonone(id){
  console.log(id)
}
function handleDropdownChange(e) {
  console.log(e.target.value)
  setComparisonOne(e.target.value)
}

function handleDropdownChange1(e) {
  console.log(e.target.value)
  setComparisonTwo(e.target.value)
}
function createcomparison(){
  let data={
    comparison_one:comparison_one,
    comparison_two:comparison_two
  }
  axios
      .post("https://medicos-backend-app.herokuapp.com/api/admin/connect/interests/personality-judgement-comparison/create", data)
      .then(() => {
        swal("success fully added", "You clicked the button!", "success");
        setModal("");
      })
      .catch(() => {
        swal("you are added", "You clicked the button!", "error");
      });
}
  if (!isLoaded) return <div className="loading" />;
  console.log(items);

  return (
    <div className="container">
      <div className="row alert alert-info">Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</div>
      <div className="row">
        <div className="col-md-6">
          {" "}
          {items.length ? (
            <div>
              <select onChange={handleDropdownChange}>
                {items.map((data) => {
                  return <option value={data._id}>{data.name}</option>;
                })}
              </select>
            </div>
          ) : (
            <div>Nodata Found</div>
          )}
        </div>
        <div className="col-md-6">
          {/* <Select options={array_data} /> */}
          {items.length ? (
            <div>
              <select onChange={handleDropdownChange1}>
                {items.map((data) => {
                  return <option value={data._id}>{data.name}</option>;
                })}
              </select>
            </div>
          ) : (
            <div>No data Found</div>
          )}
        </div>
      </div>
      <div style={{ marginTop: 15 }}>
        <Button onClick={createcomparison}>Create New</Button>
      </div>

      <Row className="mt-3">
        {personalities.length ? (
          personalities.map((item, index) => (
            <Colxx xxs="12" className="mb-3" key={index}>
              <ItemCard
                item={item}
                titleTo=""
                extraDetail={extraDetail}
                actionButtons={
                  <div className="row">
                    <div className="col-6">
                      <Pencil
                        onClick={() => {
                          setSelectedItem(item);
                          setModal("edit");
                        }}
                        color="royalblue"
                        size={16}
                      />
                    </div>
                    <div className="col-6">
                      <Eject color="red" size={16} role="button" onClick={() => onDelete(item.id)} />
                    </div>
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
