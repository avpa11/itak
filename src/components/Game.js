import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from './Firebase';

//  Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner'
import Board from './Board';

const initState = {
    gameID: '',
    openGame: false,
    ownerID: '',
    gameStarted: false,
    timestamp: '',
    userID: '',
    docID: '',
    stepNumber: 0,
    history: [
        {squares: Array(16).fill(null)}
    ]
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {...initState};
    }

    componentDidMount() {
        let currentComponent = this;


        if (this.props.location.previouspath === '/new' || this.props.location.previouspath === '/join-friend')
        {
            window.sessionStorage.setItem("gameID", this.props.location.gameID);
            window.sessionStorage.setItem("previouspath", this.props.location.previouspath);
            if (this.props.location.previouspath === '/new' ) {
                window.sessionStorage.setItem("ownerID", this.props.location.ownerID);
            } else {
                window.sessionStorage.setItem("userID", this.props.location.userID);
            }

        }
        
        if (window.sessionStorage.getItem('gameID') !== null) {
            this.props.firebase.gameRoom().where('gameID', '==', window.sessionStorage.getItem('gameID'))
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    currentComponent.setState({
                        gameID: doc.data().gameID,
                        openGame: doc.data().openGame,
                        ownerID: doc.data().ownerID,
                        gameStarted: doc.data().gameStarted,
                        timestamp: doc.data().timestamp,
                        userID: doc.data().userID !== undefined ? doc.data().userID : '',
                        docID: doc.id
                    });
                })
            })
        }

        if (window.sessionStorage.getItem('previouspath') !== null && window.sessionStorage.getItem('previouspath')=== '/join-friend') {
            this.props.firebase.gameRoom().where('gameID', '==', window.sessionStorage.getItem('gameID'))
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    currentComponent.props.firebase.gameRoom().doc(doc.id).update({
                        'timestamp': Math.floor(Date.now() / 1000),
                        'gameStarted': true,
                        'userID':  window.sessionStorage.getItem('userID')
                    })
                    .then(function() {
                        console.log("Document successfully updated!");
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
                })
            })
        }
    }

    render() {
        const { gameID, gameStarted, history } = this.state;
        const current = history[this.state.stepNumber]
        return (
            <React.Fragment>
                <Container className="h-100" id="gameContainer">
                    <Row className="h-100">
                        <Col md="5">
                            <h1>i-Tak game</h1>
                            <React.Fragment>
                                <h2>Game ID: {gameID}</h2>
                            </React.Fragment>
                        </Col>
                        <Col md="7">
                            {gameStarted === false ? 
                            <React.Fragment>
                                <Spinner className="game" animation="border" role="status" style={{right: '50%'}}>
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                                <p style={{top: '40%', position: 'absolute', right: '50%'}}>Waiting for the opponent...</p>
                            </React.Fragment> :
                            <React.Fragment>
                                <div className="game">
                                    <Board onClick={(i)=>this.onClick} squares={current.squares} />
                                </div>
                            </React.Fragment>}
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default compose(withFirebase, withRouter)(Game);