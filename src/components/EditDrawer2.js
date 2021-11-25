import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Row, Col } from "reactstrap";
import Image from "react-bootstrap/Image";
import IntlMessages from "helpers/IntlMessages";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import swal from "sweetalert";
const EditDrawer = ({ modalOpen, onClose, value, onSubmit }) => {
  const [inputvalue, setinputvalue] = useState();
  const [drawertitle, setDrawerTitle] = useState();
  const [cnic_front, setCnicFront] = useState();
  const [cnic_back, setCnicBack] = useState();
  const [medical_license, setMedical] = useState();
  const [cnic_status, setCnicStatus] = useState();
  const [profilepic, setProfile] = useState();
  const [mediacal_status, setMedicalStatus] = useState();
  const [face_status, setFaceStatus] = useState();
  const [reject_user, setRejectUser] = useState(false);
  const [reject_user_reason, setRejectUserReason] = useState("");
  const [reject_medical, setRejectMedical] = useState(false);
  const [reject_medical_reason, setRejectMedicalReason] = useState("");
  useEffect(() => {
    console.log(localStorage.getItem("user_documentable_id"));
    axios.get("https://medicos-backend-app.herokuapp.com/api/admin-users/get-user-documents/" + localStorage.getItem("user_documentable_id") + "").then((res) => {
      console.log(res);
      setCnicFront(res.data.data.id_card_back);
      setCnicBack(res.data.data.id_card_back);
      setCnicStatus(res.data.data.id_card_is_verified);
      setProfile(res.data.data.image);
      setMedicalStatus(res.data.data.medical_license_is_verified);
      setFaceStatus(res.data.data.face_recognition_verified);
      setMedical(res.data.data.medical_license)
    });
  });
function handleChange(e){
  setinputvalue(e.target.value)
}
  function handlemedicalreject(e) {
    setRejectMedicalReason(e.target.value);
  }
  function handleChange1(e){
    setRejectUserReason(e.target.value)
  }
  function unverifieduser() {
    setRejectUser(true);
  }
  function unverifiedmedical(){
    setRejectMedical(true);
  }
  function verifieduser() {
    console.log(localStorage.getItem("user_documentable_id"));
    axios
      .put("https://medicos-backend-app.herokuapp.com/api/admin-users/verify-user-id_card/" + localStorage.getItem("user_documentable_id") + "")
      .then((res) => {
        console.log(res);
        swal("Good job!", "Verified user Successfully!", "success");
        setCnicStatus(true)
      })
      .catch((error) => {
        console.log(error.response.data.message)
        swal("Error!", error.response.data.message, "error");
      });
  }
  function verifymedical(){
    console.log(localStorage.getItem("user_documentable_id"));
    axios
      .put("https://medicos-backend-app.herokuapp.com/api/admin-users/verify-user-meidical_license/" + localStorage.getItem("user_documentable_id") + "")
      .then((res) => {
        console.log(res);
        swal("Good job!", "Verified user medical license Successfully!", "success");
        setMedicalStatus(true)
      })
      .catch((error) => {
        console.log(error.response.data.message)
        swal("Error!", error.response.data.message, "error");
      });
  }
  function onsubmitreason(){
    //console.log(type);
    let data_reject={
      id: localStorage.getItem("user_documentable_id"),
      reason: reject_medical_reason
    }
    axios.put("https://medicos-backend-app.herokuapp.com/api/admin-users/reject-user-meidical_license",data_reject).then(res=>{
      console.log(res)
      swal("Good job!", "You Reject this user Medical License!", "success");
      setRejectMedical(false)
    }).catch(error=>{
      if(error.status == 400){
        swal("Error!", "License Is not correct", "error");
      }
    })
  }
  function onsubmitreason_medical(){
    let data_reject={
      id: localStorage.getItem("user_documentable_id"),
      reason: reject_user_reason
    }
    axios.put("https://medicos-backend-app.herokuapp.com/api/admin-users/reject-user-id_card",data_reject).then(res=>{
      console.log(res)
      swal("Good job!", "You Reject this user request!", "success");
      // setRejectMedical(false)
      setRejectUser(false)
    }).catch(error=>{
      if(error.status == 400){
        swal("Error!", "ID card info not correct", "error");
      }
    })
  }
  console.log(cnic_status);
  return (
    <Modal isOpen={modalOpen} toggle={onClose} wrapClassName="modal-right" backdrop="static">
      <ModalHeader toggle={onClose}>
        <IntlMessages id="User Documents" />
        <Image src={profilepic} rounded />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="pages.product-name" />
        </Label>
        <form onSubmit={() => onSubmit({ name: inputvalue })}>
          <Input defaultValue={value} onChange={handleChange} />
        </form>

        <div style={{ marginTop: "10px" }}>
          {cnic_status == false ? (
            <h3>
              Cnic Card{" "}
              <Badge bg="danger" onClick={verifieduser}>
                Unverified
              </Badge>
            </h3>
          ) : (
            <h3>
              Cnic Card{" "}
              <Badge bg="success" onClick={unverifieduser}>
                Verified
              </Badge>
            </h3>
          )}
        </div>
        {/* <Input defaultValue={cnic_status} /> */}
        <Label>Cnic Images</Label>
        <div>
          <Row>
            <Col>
              <Image src={cnic_front} rounded />
            </Col>
            <Col>
              <Image src={cnic_back} rounded />
            </Col>
          </Row>
        </div>

        {reject_user == true ? (
          <div>
            <Label>
              <IntlMessages id="Reject Reason" />
            </Label>
            {/* <form onSubmit={() => onSubmit({ name: inputvalue })}> */}
              <Input defaultValue={value} onChange={handleChange1} className="mt-3"/>
              <Button color="primary" onClick={()=>{onsubmitreason_medical()}} className="mt-3">
          <IntlMessages id="pages.submit" />
        </Button>
            {/* </form> */}
          </div>
        ) : (
          ""
        )}
        <div style={{ marginTop: "10px" }}>
          {mediacal_status == false ? (
            <h3>
              Medical License <Badge bg="danger" onClick={verifymedical}>Unverified</Badge>
            </h3>
          ) : (
            <h3>
              Medical License <Badge bg="success" onClick = {unverifiedmedical}>Verified</Badge>
            </h3>
          )}
        </div>
        <Label>Medical Document</Label>
        <div>
          <Row>
            <Col>
              <Image src={medical_license} rounded />
            </Col>

          </Row>
        </div>

        {reject_medical == true ? (
          <div >
            <Label>
              <IntlMessages id="Reject Reason" />
            </Label>
            {/* <form onSubmit={() => onSubmit({ name: inputvalue })}> */}
              <Input defaultValue={value} onChange={handlemedicalreject} className="mt-3"/>
              <Button color="primary" onClick={()=>{onsubmitreason()}} className="mt-3">
          <IntlMessages id="pages.submit" />
        </Button>
            {/* </form> */}
          </div>
        ) : (
          ""
        )}
        {/* <div style={{marginTop:"10px"}}>
        {face_status == false? (<h3>
          Face Recognition <Badge bg="danger">Unverified</Badge>
        </h3>):(<h3>
          Face Recognition <Badge bg="secondary">Verified</Badge>
        </h3>)}

          </div> */}
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" outline onClick={onClose}>
          <IntlMessages id="pages.cancel" />
        </Button>
        {/* <Button color="primary" onClick={() => onSubmit({ name: inputvalue })}>
          <IntlMessages id="pages.submit" />
        </Button> */}
      </ModalFooter>
    </Modal>
  );
};

export default EditDrawer;
