// import React, { useState } from 'react';
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

// const EditLikes = ({ modalOpen, toggleModal, value, id }) => {
//   const [inputvalue, setinputvalue] = useState();

//   function handleChange(e) {
//     console.log(e);
//     setinputvalue(e.target.value);
//   }

//   function editLikes() {
//     axios
//       .put(
//         '/admin/connect/interests/likes/update',
//         { id, name: inputvalue },
//         {
//           headers: {
//             'x-access-token': JSON.parse(localStorage.getItem('current_user'))
//               .token,
//           },
//         }
//       )
//       .then((resp) => {
//         console.log(resp);
//         swal('success fully Updated', 'You clicked the button!', 'success');
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
//         <form onSubmit={editLikes}>
//           <Input defaultValue={value} onChange={handleChange} />
//         </form>
//       </ModalBody>

//       <ModalFooter>
//         <Button color="secondary" outline onClick={toggleModal}>
//           <IntlMessages id="pages.cancel" />
//         </Button>
//         <Button color="primary" onClick={editLikes}>
//           <IntlMessages id="pages.submit" />
//         </Button>
//       </ModalFooter>
//     </Modal>
//   );
// };

// export default EditLikes;
