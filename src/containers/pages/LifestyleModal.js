// import React, { useState } from 'react';

// import {
//   // CustomInput,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Input,
//   Label,
// } from 'reactstrap';
// // import Select from 'react-select';
// // import CustomSelectInput from 'components/common/CustomSelectInput';
// import IntlMessages from 'helpers/IntlMessages';
// // import react,{useEffect} from "react";
// import axios from 'axios';
// import swal from 'sweetalert';

// const LifeStyleModal = ({ modalOpen, toggleModal }) => {
//   const [inputvalue, setinputvalue] = useState();

//   function handleChange(e) {
//     setinputvalue(e.target.value);
//   }

//   function createHobby() {
//     axios
//       .post(
//         '/admin/connect/interests/lifestyle/create',
//         { name: inputvalue },
//         {
//           headers: {
//             'x-access-token': JSON.parse(localStorage.getItem('current_user'))
//               .token,
//           },
//         }
//       )
//       .then((resp) => {
//         console.log(resp);
//         swal('success fully added', 'You clicked the button!', 'success');
//         toggleModal();
//       })
//       .catch((error) => {
//         console.error(error);
//         swal('you are added', 'You clicked the button!', 'error');
//       });
//     // const data = {
//     //   name:"arsalan"
//     // }
//     // axios.post('/admin/connect/interests/hobby/create',{ headers: {
//     //   'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjUyNjk5YjMzMTU0MDAyZTJhNGMzZSIsImRldmljZV90eXBlIjoiaU9TIiwiZGV2aWNlX2lkIjoiaW9zNTM4MyIsImZjbSI6InNmYXNkZmFzZGZzZGZzZGZhc2QiLCJzb2NpYWxfcHJvZmlsZV9pZCI6IjYxNjUyNjlhYjMzMTU0MDAyZTJhNGM0MCIsImNvbm5lY3RfcHJvZmlsZV9pZCI6IjYxNjUyNjlhYjMzMTU0MDAyZTJhNGM0MiIsImlhdCI6MTYzNDE5NTkyNywiZXhwIjoxNzkxODc1OTI3fQ.GBTSoeGVaa6EplnqKaFdWhn5erp7HqAWiraJEKiX7_Y',
//     //   "Content-Type":"application/json"
//     // }}, data)
//     // .then(response =>
//     //   console.log(response));
//     //   swal("success fully added", "You clicked the button!", "success");
//     // alert("I am an alert box!");
//   }

//   return (
//     <Modal
//       isOpen={modalOpen}
//       toggle={toggleModal}
//       wrapClassName="modal-right"
//       backdrop="static"
//     >
//       <ModalHeader toggle={toggleModal}>
//         <IntlMessages id="pages.add-new-LifeStyle" />
//       </ModalHeader>
//       <ModalBody>
//         <Label>
//           <IntlMessages id="pages.product-name" />
//         </Label>
//         <form onSubmit={createHobby}>
//           <Input onChange={handleChange} />
//         </form>
//         {/* <Label className="mt-4">
//           <IntlMessages id="pages.category" />
//         </Label> */}
//         {/* <Select
//           components={{ Input: CustomSelectInput }}
//           className="react-select"
//           classNamePrefix="react-select"
//           name="form-field-name"
//           options={categories}
//         /> */}
//         {/* <Label className="mt-4">
//           <IntlMessages id="pages.description" />
//         </Label> */}
//         {/* <Input type="textarea" name="text" id="exampleText" /> */}
//         {/* <Label className="mt-4">
//           <IntlMessages id="pages.status" />
//         </Label> */}
//         {/* <CustomInput
//           // type="radio"
//           // id="exCustomRadio"
//           // name="customRadio"
//           // label="ON HOLD"
//         /> */}
//         {/* <CustomInput
//           // type="radio"
//           // id="exCustomRadio2"
//           // name="customRadio"
//           // label="PROCESSED"
//         /> */}
//       </ModalBody>

//       <ModalFooter>
//         <Button color="secondary" outline onClick={toggleModal}>
//           <IntlMessages id="pages.cancel" />
//         </Button>
//         <Button color="primary" onClick={createHobby}>
//           <IntlMessages id="pages.submit" />
//         </Button>
//       </ModalFooter>
//     </Modal>
//   );
// };

// export default LifeStyleModal;
