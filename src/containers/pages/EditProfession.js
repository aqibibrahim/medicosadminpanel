// import React, { useState } from 'react';
// // import { useHistory } from 'react-router';
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Input,
//   Label,
// } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
// import axios from 'axios';
// import swal from 'sweetalert';

// const EditProfession = ({ modalOpen, toggleModal, value, id }) => {
//   // const history = useHistory()
//   const [inputvalue, setinputvalue] = useState();

//   function handleChange(e) {
//     setinputvalue(e.target.value);
//   }

//   function editProfession() {
//     axios
//       .put(
//         '/admin/connect/profession/update',
//         { id, name: inputvalue, level: 1 },
//         {
//           headers: {
//             'x-access-token': JSON.parse(localStorage.getItem('current_user'))
//             .token,
//           },
//         }
//       )
//       .then((resp) => {
//         console.log(resp);
//         swal({
//           title: 'Are you sure?',
//           text: 'Your will not be able to recover this imaginary file!',
//           type: 'warning',
//           showCancelButton: true,
//           confirmButtonClass: 'btn-danger',
//           confirmButtonText: 'Yes, delete it!',
//           closeOnConfirm: false,
//         });
//         // window.location.href = "http://localhost:3000/app/pages/product/data-list";

//         // alert('success fully Updated', 'You clicked the button!', 'success');
//         // window.location.href("http://localhost:3000/app/pages/product/data-list",'_blank')
//         // swal('Success', 'You clicked the button!', 'success');

//         toggleModal();
//       })
//       .catch((error) => {
//         console.error(error);
//         swal('Error', 'You clicked the button!', 'error');
//       });
//   }

//   return (
//     <Modal
//       isOpen={modalOpen}
//       toggle={toggleModal}
//       wrapClassName="modal-right"
//       backdrop="static"
//     >
//       <ModalHeader toggle={toggleModal}>
//         <IntlMessages id="pages.add-new-modal-title" />
//       </ModalHeader>
//       <ModalBody>
//         <Label>
//           <IntlMessages id="pages.product-name" />
//         </Label>
//         <form onSubmit={editProfession}>
//           <Input defaultValue={value} onChange={handleChange} />
//         </form>
//       </ModalBody>

//       <ModalFooter>
//         <Button color="secondary" outline onClick={toggleModal}>
//           <IntlMessages id="pages.cancel" />
//         </Button>
//         <Button color="primary" onClick={editProfession}>
//           <IntlMessages id="pages.submit" />
//         </Button>
//       </ModalFooter>
//     </Modal>
//   );
// };

// export default EditProfession;
