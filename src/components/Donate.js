import React, {useState} from 'react';
import { Link, withRouter } from 'react-router-dom';

//  Bootstrap components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Donate() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  
    return (
      <div className="container">
        <Row>
          <Col md="6">
            <Button id="donateButton" variant="warning" onClick={handleShow}>
              Donate!
            </Button>
          </Col>
          <Col md="6">
            <Button id="homeButton" variant="warning" className="float-right" as={Link} style={{display: "none"}} to="/">
              Home
            </Button>
          </Col>
        </Row>

  
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

export default withRouter(Donate);