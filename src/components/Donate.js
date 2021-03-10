import React, {useState} from 'react';

//  Bootstrap components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Donate() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <div className="container">
        <Button id="donateButton" variant="warning" onClick={handleShow}>
          Donate!
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Donate!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            CONTENT...
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

export default Donate;