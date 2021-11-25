import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";

const AddNewModal = ({ modalOpen, onClose, onSubmit }) => {
  const [inputvalue, setinputvalue] = useState();

  function handleChange(e) {
    setinputvalue(e.target.value);
  }

  return (
    <Modal isOpen={modalOpen} toggle={onClose} wrapClassName="modal-right" backdrop="static">
      <ModalHeader toggle={onClose}>
        <IntlMessages id="pages.add-new-modal-title" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="pages.product-name" />
        </Label>
        <form onSubmit={() => onSubmit({ name: inputvalue })}>
          <Input onChange={handleChange} />
        </form>
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" outline onClick={onClose}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button color="primary" onClick={() => onSubmit({ name: inputvalue })}>
          <IntlMessages id="pages.submit" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModal;
