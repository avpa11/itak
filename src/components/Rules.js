import React, { useState } from "react";
import { withRouter } from "react-router-dom";

//  Bootstrap components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";

function Rules() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container">
      <Row>
        <Col sm="12">
          <Button id="donateButton" variant="warning" onClick={handleShow}>
            Rules
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
          <Modal.Title>Game rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          iTak is an online board game for two people.
          <br />
          <br />
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Start or Join the game</Accordion.Header>
              <Accordion.Body>
                Player 1 can starts the game by clicking "New Game" button.
                There's an option to make the game 'public'. <br />
                If the game is 'public', then anyone can randomly join the game
                as Player 2 by clicking "Join Random Game" button. <br />
                If it's not set to public, then only someone who has the code
                for the game session can join by clicking "Join Friend's Game".
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Board</Accordion.Header>
              <Accordion.Body>
                There is 4x4 board and 16 different places of possible chip
                position.
                <img
                  src={require("../images/board.png").default}
                  alt="Board img"
                  style={{ width: "-webkit-fill-available" }}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Chips</Accordion.Header>
              <Accordion.Body>
                All chips have four different attributed:
                <ul>
                  <li>
                    <p>Size</p>
                    <ul>
                      <li>
                        small{" "}
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/4.svg?alt=media&token=9ccc73c1-cfd4-4e20-ae03-479e201b7d07"
                          alt="small chip"
                        ></img>
                      </li>
                      <li>
                        big
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/16.svg?alt=media&token=0c16a4f4-e469-4e31-a291-abd6c5259816"
                          alt="big chip"
                        ></img>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>Shape</p>
                    <ul>
                      <li>
                        circle{" "}
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/4.svg?alt=media&token=9ccc73c1-cfd4-4e20-ae03-479e201b7d07"
                          alt="circle chip"
                        ></img>
                      </li>
                      <li>
                        square{" "}
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/3.svg?alt=media&token=469b3407-bdd3-4eee-b1e3-6c6c43f52fc3"
                          alt="square chip"
                        ></img>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>Colour</p>
                    <ul>
                      <li>
                        yellow{" "}
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/4.svg?alt=media&token=9ccc73c1-cfd4-4e20-ae03-479e201b7d07"
                          alt="yellow chip"
                        ></img>
                      </li>
                      <li>
                        green{" "}
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/2.svg?alt=media&token=7af1db52-1ab1-4cc5-92b0-348a7622388d"
                          alt="green chip"
                        ></img>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <p>Appearance</p>
                    <ul>
                      <li>
                        with a dot{" "}
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/10.svg?alt=media&token=ed8676be-0793-48c7-b225-f91159520064"
                          alt="chip with a dor"
                        ></img>
                      </li>
                      <li>
                        no dot{" "}
                        <img
                          src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/2.svg?alt=media&token=7af1db52-1ab1-4cc5-92b0-348a7622388d"
                          alt="chip with no dot"
                        ></img>
                      </li>
                    </ul>
                  </li>
                </ul>{" "}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Objective</Accordion.Header>
              <Accordion.Body>
                <p>
                  The objetive of the game is to be the first one to make a
                  sequence of four chips on the board:
                </p>
                <ul>
                  <li>
                    Horizontal{" "}
                    <img
                      src={require("../images/horizontal.png").default}
                      alt="Horizontal"
                      style={{
                        width: "-webkit-fill-available",
                        maxWidth: "150px",
                      }}
                    />
                  </li>
                  <li>
                    Vertical{" "}
                    <img
                      src={require("../images/vertical.png").default}
                      alt="Vertical"
                      style={{
                        width: "-webkit-fill-available",
                        maxWidth: "150px",
                      }}
                    />
                  </li>
                  <li>
                    Diagonal{" "}
                    <img
                      src={require("../images/diagonal.png").default}
                      alt="Diagonal"
                      style={{
                        width: "-webkit-fill-available",
                        maxWidth: "150px",
                      }}
                    />
                  </li>
                  <li>
                    Square{" "}
                    <img
                      src={require("../images/square.png").default}
                      alt="Square"
                      style={{
                        width: "-webkit-fill-available",
                        maxWidth: "150px",
                      }}
                    />
                  </li>
                </ul>
                <p>
                  The four chips must be the same in at least one category
                  (size, shape, colour, appearance)
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Rules</Accordion.Header>
              <Accordion.Body>
                The board and all chips are used by both players. The game
                starts with Player 1 choosing a chip for their opponent. The
                opponent (Player 2) then places the selected chip on the board.
                After that, Player 2 chooses a chip for Player 1.
                <br />
                <br />
                The game continues with one player choosing a chip for their
                opponent and the opponent placing the chip on the board and vice
                versa.
                <br />
                <br />
                The first person to make a group of four wins!
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default withRouter(Rules);
