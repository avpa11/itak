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
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const initState = {
    gameID: '',
    openGame: false,
    ownerID: '',
    gameStarted: false,
    timestamp: '',
    userID: '',
    docID: '',
    stepNumber: 0,
    step: '',
    stage: '',
    turn: '',
    chip1: '',
    chip2: '',
    chip3: '',
    chip4: '',
    chip5: '',
    chip6: '',
    chip7: '',
    chip8: '',
    chip9: '',
    chip10: '',
    chip11: '',
    chip12: '',
    chip13: '',
    chip14: '',
    chip15: '',
    chip16: '',
    actionText: '',
    activeChip: '',
    boardSquare0: '',
    boardSquare1: '',
    boardSquare2: '',
    boardSquare3: '',
    boardSquare4: '',
    boardSquare5: '',
    boardSquare6: '',
    boardSquare7: '',
    boardSquare8: '',
    boardSquare9: '',
    boardSquare10: '',
    boardSquare11: '',
    boardSquare12: '',
    boardSquare13: '',
    boardSquare14: '',
    boardSquare15: '',
    squaresValues: [],
    showModal: false,
    modalText: '',
    zero: [],
    one: [],
    two: [],
    three: [],
    history: [
        {squares: Array(16).fill(null)}
    ]
}

function isWinningPattern(array1, array2, array3, array4) {
    let winningInZero = false;
    let winningInOne = false;
    let winningInTwo = false;
    let winningInThree = false;
    if (!Array.isArray(array1) && !Array.isArray(array2) 
    && !Array.isArray(array3) && !Array.isArray(array4)) {
        return false;
    }

    if (Array.isArray(array1) && array1.length) {
        if (array1.length !== array2.length &&
            array1.length !== array3.length &&
            array1.length !== array4.length) {
            return false;
        }


        if (array1[0] !== undefined && array2[0] !== undefined  && array3[0] !== undefined && array4[0] !== undefined) {
            if (array1[0] === array2[0] && array1[0] === array3[0] && array1[0] === array4[0]
            && array2[0] === array3[0] && array3[0] === array4[0]) {
                winningInZero = true;
            }
            if (array1[1] === array2[1] && array1[1] === array3[1] && array1[1] === array4[1]
                && array2[1] === array3[1] && array3[1] === array4[1]) {
                winningInOne = true;
            }
            if (array1[2] === array2[2] && array1[2] === array3[2] && array1[2] === array4[2]
                && array2[2] === array3[2] && array3[2] === array4[2]) {
                winningInTwo = true;
            }
            if (array1[3] === array2[3] && array1[3] === array3[3] && array1[3] === array4[3]
                && array2[3] === array3[3] && array3[3] === array4[3]) {
                winningInThree = true;
            }
        } else {
            return false;
        }
    }

    if (winningInZero === true || winningInOne === true || winningInTwo === true || winningInThree === true) {
        return true;
    } else {
        return false;
    }

}

class Game extends Component {
    _isMounted = false;
    _isPatternMounted = false;

    constructor(props) {
        super(props);
        this.state = {...initState};
    }

    // handle the click on the board
    handleClick(i) {
        let currentComponent = this;
        let nextStep = currentComponent.state.step + 1;
        let curElementID = 'boardSquare' + i;
        let curElement = document.getElementById(curElementID);
        
        if (this.state.stage === 'put' && !curElement.classList.contains('reserved')) {
            if ((window.sessionStorage.getItem('ownerID') !== null && this.state.turn === 'owner') ||
            (window.sessionStorage.getItem('userID') !== null && this.state.turn === 'user')) {

                if (this.state.activeChip !== undefined && this.state.activeChip !== '') {
                    this.props.firebase.gameRoom().where('gameID', '==', window.sessionStorage.getItem('gameID'))
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            currentComponent.props.firebase.gameRoom().doc(doc.id).update({
                                'timestamp': Math.floor(Date.now() / 1000),
                                'boardSquare0': i === 0 ? currentComponent.state.activeChip : currentComponent.state.boardSquare0,
                                'boardSquare1': i === 1 ? currentComponent.state.activeChip : currentComponent.state.boardSquare1,
                                'boardSquare2': i === 2 ? currentComponent.state.activeChip : currentComponent.state.boardSquare2,
                                'boardSquare3': i === 3 ? currentComponent.state.activeChip : currentComponent.state.boardSquare3,
                                'boardSquare4': i === 4 ? currentComponent.state.activeChip : currentComponent.state.boardSquare4,
                                'boardSquare5': i === 5 ? currentComponent.state.activeChip : currentComponent.state.boardSquare5,
                                'boardSquare6': i === 6 ? currentComponent.state.activeChip : currentComponent.state.boardSquare6,
                                'boardSquare7': i === 7 ? currentComponent.state.activeChip : currentComponent.state.boardSquare7,
                                'boardSquare8': i === 8 ? currentComponent.state.activeChip : currentComponent.state.boardSquare8,
                                'boardSquare9': i === 9 ? currentComponent.state.activeChip : currentComponent.state.boardSquare9,
                                'boardSquare10': i === 10 ? currentComponent.state.activeChip : currentComponent.state.boardSquare10,
                                'boardSquare11': i === 11 ? currentComponent.state.activeChip : currentComponent.state.boardSquare11,
                                'boardSquare12': i === 12 ? currentComponent.state.activeChip : currentComponent.state.boardSquare12,
                                'boardSquare13': i === 13 ? currentComponent.state.activeChip : currentComponent.state.boardSquare13,
                                'boardSquare14': i === 14 ? currentComponent.state.activeChip : currentComponent.state.boardSquare14,
                                'boardSquare15': i === 15 ? currentComponent.state.activeChip : currentComponent.state.boardSquare15,
                                'chip1': currentComponent.state.activeChip === 'chip1' ?  i : currentComponent.state.chip1,
                                'chip2': currentComponent.state.activeChip === 'chip2' ?  i : currentComponent.state.chip2,
                                'chip3': currentComponent.state.activeChip === 'chip3' ?  i : currentComponent.state.chip3,
                                'chip4': currentComponent.state.activeChip === 'chip4' ?  i : currentComponent.state.chip4,
                                'chip5': currentComponent.state.activeChip === 'chip5' ?  i : currentComponent.state.chip5,
                                'chip6': currentComponent.state.activeChip === 'chip6' ?  i : currentComponent.state.chip6,
                                'chip7': currentComponent.state.activeChip === 'chip7' ?  i : currentComponent.state.chip7,
                                'chip8': currentComponent.state.activeChip === 'chip8' ?  i : currentComponent.state.chip8,
                                'chip9': currentComponent.state.activeChip === 'chip9' ?  i : currentComponent.state.chip9,
                                'chip10': currentComponent.state.activeChip === 'chip10' ?  i : currentComponent.state.chip10,
                                'chip11': currentComponent.state.activeChip === 'chip11' ?  i : currentComponent.state.chip11,
                                'chip12': currentComponent.state.activeChip === 'chip12' ?  i : currentComponent.state.chip12,
                                'chip13': currentComponent.state.activeChip === 'chip13' ?  i : currentComponent.state.chip13,
                                'chip14': currentComponent.state.activeChip === 'chip14' ?  i : currentComponent.state.chip14,
                                'chip15': currentComponent.state.activeChip === 'chip15' ?  i : currentComponent.state.chip15,
                                'chip16': currentComponent.state.activeChip === 'chip16' ?  i : currentComponent.state.chip16,
                                'step': nextStep,
                                'stage': 'pick',
                                'turn': currentComponent.state.turn
                            })
                            .then(function() {
                                // console.log("Document successfully updated!");
                            })
                            .catch(function(error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });
                        })
                    })
                }
            } else {
                alert("Your opponent's turn to put a figure on the board")
            }
        } else if (this.state.stage === 'pick') {
            if ((window.sessionStorage.getItem('ownerID') !== null && this.state.turn === 'owner') ||
            (window.sessionStorage.getItem('userID') !== null && this.state.turn === 'user')) {
                alert("The turn is now to pick a chip");
            } else {
                alert("The turn is now to pick a figure for your opponent");
            }
        } else {
            alert("You cannot place a figure here!");
        }
    }

    componentDidMount() {
        this._isMounted = true;

        window.sessionStorage.setItem('gameStarted', false);

        if (this._isMounted) {
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
                        currentComponent.setState({
                            gameID: doc.data().gameID,
                            openGame: doc.data().openGame,
                            ownerID: doc.data().ownerID,
                            gameStarted: doc.data().gameStarted,
                            timestamp: doc.data().timestamp,
                            userID: doc.data().userID !== undefined ? doc.data().userID : '',
                            step: doc.data().step !== undefined ?  doc.data().step  : '',
                            stage: doc.data().stage !== undefined ?  doc.data().stage  : '',
                            turn: doc.data().turn !== undefined ?  doc.data().turn  : '',
                            chip1: doc.data().chip1 !== undefined ? doc.data().chip1 : '',
                            chip2: doc.data().chip2 !== undefined ?  doc.data().chip2  : '',
                            chip3: doc.data().chip3 !== undefined ?  doc.data().chip3  : '',
                            chip4: doc.data().chip4 !== undefined ?  doc.data().chip4  : '',
                            chip5: doc.data().chip5 !== undefined ?  doc.data().chip5  : '',
                            chip6: doc.data().chip6 !== undefined ?  doc.data().chip6  : '',
                            chip7: doc.data().chip7 !== undefined ?  doc.data().chip7  : '',
                            chip8: doc.data().chip8 !== undefined ?  doc.data().chip8  : '',
                            chip9: doc.data().chip9 !== undefined ?  doc.data().chip9  : '',
                            chip10: doc.data().chip10 !== undefined ?  doc.data().chip10  : '',
                            chip11: doc.data().chip11 !== undefined ?  doc.data().chip11  : '',
                            chip12: doc.data().chip12 !== undefined ?  doc.data().chip12  : '',
                            chip13: doc.data().chip13 !== undefined ?  doc.data().chip13  : '',
                            chip14: doc.data().chip14 !== undefined ?  doc.data().chip14  : '',
                            chip15: doc.data().chip15 !== undefined ?  doc.data().chip15  : '',
                            chip16: doc.data().chip16 !== undefined ?  doc.data().chip16  : '',
                            boardSquare0: doc.data().boardSquare0 !== undefined ? doc.data().boardSquare0 : '',
                            boardSquare1: doc.data().boardSquare1 !== undefined ? doc.data().boardSquare1 : '',
                            boardSquare2: doc.data().boardSquare2 !== undefined ? doc.data().boardSquare2 : '',
                            boardSquare3: doc.data().boardSquare3 !== undefined ? doc.data().boardSquare3 : '',
                            boardSquare4: doc.data().boardSquare4 !== undefined ? doc.data().boardSquare4 : '',
                            boardSquare5: doc.data().boardSquare5 !== undefined ? doc.data().boardSquare5 : '',
                            boardSquare6: doc.data().boardSquare6 !== undefined ? doc.data().boardSquare6 : '',
                            boardSquare7: doc.data().boardSquare7 !== undefined ? doc.data().boardSquare7 : '',
                            boardSquare8: doc.data().boardSquare8 !== undefined ? doc.data().boardSquare8 : '',
                            boardSquare9: doc.data().boardSquare9 !== undefined ? doc.data().boardSquare9 : '',
                            boardSquare10: doc.data().boardSquare10 !== undefined ? doc.data().boardSquare10 : '',
                            boardSquare11: doc.data().boardSquare11 !== undefined ? doc.data().boardSquare11 : '',
                            boardSquare12: doc.data().boardSquare12 !== undefined ? doc.data().boardSquare12 : '',
                            boardSquare13: doc.data().boardSquare13 !== undefined ? doc.data().boardSquare13 : '',
                            boardSquare14: doc.data().boardSquare14 !== undefined ? doc.data().boardSquare14 : '',
                            boardSquare15: doc.data().boardSquare15 !== undefined ? doc.data().boardSquare15 : '',
                            docID: doc.id
                        });
                    })

                    // check if game exist in firestore
                    if (currentComponent.state.gameID === '' || currentComponent.state.gameID === null) {
                        if (document.getElementById('spinner') !== null && document.getElementById('spinner') !== 'undefined') {
                            document.getElementById('spinner').remove();
                            document.getElementById('spinnerText').innerText = 'Game with an entered game id does not exist';
                        }
                    } else {
                        if (currentComponent.state.stage === "pick") {
                            if ((window.sessionStorage.getItem('ownerID') !== null && currentComponent.state.turn === 'owner') ||
                            (window.sessionStorage.getItem('userID') !== null && currentComponent.state.turn === 'user')) {
                                currentComponent.setState({actionText: 'Choose a figure for your opponent'})
                            } else {
                                currentComponent.setState({actionText: 'Your opponent\'s turn'})
                            }
                        } else {
                            if ((window.sessionStorage.getItem('ownerID') !== null && currentComponent.state.turn === 'owner') ||
                            (window.sessionStorage.getItem('userID') !== null && currentComponent.state.turn === 'user')) {
                                currentComponent.setState({actionText: 'Choose where to place the highlighted figure!'})
                            } else {
                                currentComponent.setState({actionText: 'Your opponent\'s turn'})
                            }
                        }
    
                        let chipID = '';
                        let boardSquareIDs = ['boardSquare0', 'boardSquare1', 'boardSquare2', 'boardSquare3', 'boardSquare4',
                        'boardSquare5', 'boardSquare6', 'boardSquare7', 'boardSquare8', 'boardSquare9', 'boardSquare10',
                        'boardSquare11', 'boardSquare12', 'boardSquare13', 'boardSquare14', 'boardSquare15'];
                        let i;
                        let x;
                        const history = currentComponent.state.history.slice(0, currentComponent.state.stepNumber + 1);
                        const current = history[history.length - 1];
                        const squares = current.squares.slice();
   
                        Object.keys(currentComponent.state).forEach(function(key, index) {
                            if (index < 16) {
                                i = index + 1;
                                chipID = 'chip' + i;
                                if (document.getElementById(chipID) !== null) {
                                    document.getElementById(chipID).classList.remove("pendChoice");
                                    document.getElementById(chipID).classList.remove("pendDecision");
                                }
                            }

                            if (boardSquareIDs.includes(key)) {
                                if (currentComponent.state[key] !== '' && document.getElementById(key) !== null) {
                                    document.getElementById(key).classList.add("reserved");
                                    let chipRef = currentComponent.props.firebase.firestore.collection('chips').doc(currentComponent.state[key]);
                                    chipRef.get().then((doc) => {
                                        if (doc.exists) {
                                            // boardSquare0 state is 29th state element...
                                            x = index - 29;
                                            squares[x] = <img src={doc.data().img_src} alt="Figure img" style={{width: 'fit-content'}} />;
                                            currentComponent.setState({
                                                history: history.concat({
                                                    squares: squares
                                                }),
                                                stepNumber: history.length
                                            });
                                        } else {
                                            // doc.data() will be undefined in this case
                                            console.log("No such document!");
                                        }
                                    }).catch((error) => {
                                        console.log("Error getting document:", error);
                                    });
                                }
                            }

                            if (currentComponent.state[key] === 'pend') {
                                if ((currentComponent.state.turn === 'user' && window.sessionStorage.getItem('ownerID') !== null  && currentComponent.state.stage === 'put') ||
                                (currentComponent.state.turn === 'owner' && window.sessionStorage.getItem('userID') !== null  && currentComponent.state.stage === 'put')) {
                                    document.getElementById(key).classList.add("pendChoice");
                                } else if ((currentComponent.state.turn === 'owner' && window.sessionStorage.getItem('ownerID') !== null  && currentComponent.state.stage === 'put') ||
                                (currentComponent.state.turn === 'user' && window.sessionStorage.getItem('userID') !== null  && currentComponent.state.stage === 'put')) {
                                    document.getElementById(key).classList.add("pendDecision");
                                }
                                currentComponent.setState({activeChip: key});
                            } 
                        });

                        // if (currentComponent.state.gameStarted === true) {
                        //     window.sessionStorage.setItem('gameStarted', currentComponent.state.gameStarted);
                        // }
                        currentComponent.checkforWinner();


                    }
                })

                this._isMounted = false;
            }

            // friend just joined the game
            // if (window.sessionStorage.getItem('previouspath') !== null && window.sessionStorage.getItem('previouspath')=== '/join-friend'
            // && currentComponent.state.gameStarted === false) {
            if (window.sessionStorage.getItem('previouspath') !== null && window.sessionStorage.getItem('previouspath')=== '/join-friend') {
                this.props.firebase.gameRoom().where('gameID', '==', window.sessionStorage.getItem('gameID'))
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        currentComponent.props.firebase.gameRoom().doc(doc.id).update({
                            'timestamp': Math.floor(Date.now() / 1000),
                            'gameStarted': true,
                            'userID':  window.sessionStorage.getItem('userID'),
                            'step': 1,
                            'stage': 'pick',
                            'turn': 'owner',
                            'chip1': 'avail',
                            'chip2': 'avail',
                            'chip3': 'avail',
                            'chip4': 'avail',
                            'chip5': 'avail',
                            'chip6': 'avail',
                            'chip7': 'avail',
                            'chip8': 'avail',
                            'chip9': 'avail',
                            'chip10': 'avail',
                            'chip11': 'avail',
                            'chip12': 'avail',
                            'chip13': 'avail',
                            'chip14': 'avail',
                            'chip15': 'avail',
                            'chip16': 'avail',
                        })
                        .then(function() {
                            // window.sessionStorage.setItem('gameStarted', true);
                            // console.log("Document successfully updated!");
                        })
                        .catch(function(error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                    });
                })
            }
        }
    }

    checkforWinner() {
        let currentComponent = this;
        
        // horizontal win
        if (this.state.boardSquare0 !== '' && this.state.boardSquare1 !== '' && this.state.boardSquare2 !== '' && this.state.boardSquare3) {
            let boardSquareIDs = ['boardSquare0', 'boardSquare1', 'boardSquare2', 'boardSquare3'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare4 !== '' && this.state.boardSquare5 !== '' && this.state.boardSquare6 !== '' && this.state.boardSquare7 !== '') {
            let boardSquareIDs = ['boardSquare4', 'boardSquare5', 'boardSquare6', 'boardSquare7'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare8 !== '' && this.state.boardSquare9 !== '' && this.state.boardSquare10 !== '' && this.state.boardSquare11 !== '' ) {
            let boardSquareIDs = ['boardSquare8', 'boardSquare9', 'boardSquare10', 'boardSquare11'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare12 !== '' && this.state.boardSquare13 !== '' && this.state.boardSquare14 !== '' && this.state.boardSquare15 !== '') {
            let boardSquareIDs = ['boardSquare12', 'boardSquare13', 'boardSquare14', 'boardSquare15'];
            currentComponent.checkForPattern(boardSquareIDs);
        }
        // vertical win
        else if (this.state.boardSquare0 !== '' && this.state.boardSquare4 !== '' && this.state.boardSquare8 !== '' && this.state.boardSquare12) {
            let boardSquareIDs = ['boardSquare0', 'boardSquare4', 'boardSquare8', 'boardSquare12'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare1 !== '' && this.state.boardSquare5 !== '' && this.state.boardSquare9 !== '' && this.state.boardSquare13 !== '') {
            let boardSquareIDs = ['boardSquare1', 'boardSquare5', 'boardSquare9', 'boardSquare13'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare2 !== '' && this.state.boardSquare6 !== '' && this.state.boardSquare10 !== '' && this.state.boardSquare14 !== '' ) {
            let boardSquareIDs = ['boardSquare2', 'boardSquare6', 'boardSquare10', 'boardSquare14'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare3 !== '' && this.state.boardSquare7 !== '' && this.state.boardSquare11 !== '' && this.state.boardSquare15 !== '' ) {
            let boardSquareIDs = ['boardSquare3', 'boardSquare7', 'boardSquare11', 'boardSquare15'];
            currentComponent.checkForPattern(boardSquareIDs);
        } 
        // diagonal win
        else if (this.state.boardSquare0 !== '' && this.state.boardSquare5 !== '' && this.state.boardSquare10 !== '' && this.state.boardSquare15) {
            let boardSquareIDs = ['boardSquare0', 'boardSquare5', 'boardSquare10', 'boardSquare15'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare3 !== '' && this.state.boardSquare6 !== '' && this.state.boardSquare9 !== '' && this.state.boardSquare12 !== '') {
            let boardSquareIDs = ['boardSquare3', 'boardSquare6', 'boardSquare9', 'boardSquare12'];
            currentComponent.checkForPattern(boardSquareIDs);
        }
        // rectangular win
        else if (this.state.boardSquare0 !== '' && this.state.boardSquare1 !== '' && this.state.boardSquare4 !== '' && this.state.boardSquare5) {
            let boardSquareIDs = ['boardSquare0', 'boardSquare1', 'boardSquare4', 'boardSquare5'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare1 !== '' && this.state.boardSquare2 !== '' && this.state.boardSquare4 !== '' && this.state.boardSquare6 !== '') {
            let boardSquareIDs = ['boardSquare1', 'boardSquare2', 'boardSquare4', 'boardSquare6'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare2 !== '' && this.state.boardSquare3 !== '' && this.state.boardSquare6 !== '' && this.state.boardSquare7 !== '') {
            let boardSquareIDs = ['boardSquare2', 'boardSquare3', 'boardSquare6', 'boardSquare7'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare4 !== '' && this.state.boardSquare5 !== '' && this.state.boardSquare8 !== '' && this.state.boardSquare9 !== '') {
            let boardSquareIDs = ['boardSquare4', 'boardSquare5', 'boardSquare8', 'boardSquare9'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare5 !== '' && this.state.boardSquare6 !== '' && this.state.boardSquare9 !== '' && this.state.boardSquare10 !== '') {
            let boardSquareIDs = ['boardSquare5', 'boardSquare6', 'boardSquare9', 'boardSquare10'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare6 !== '' && this.state.boardSquare7 !== '' && this.state.boardSquare10 !== '' && this.state.boardSquare11 !== '') {
            let boardSquareIDs = ['boardSquare6', 'boardSquare7', 'boardSquare10', 'boardSquare11'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare8 !== '' && this.state.boardSquare9 !== '' && this.state.boardSquare12 !== '' && this.state.boardSquare13 !== '') {
            let boardSquareIDs = ['boardSquare8', 'boardSquare9', 'boardSquare12', 'boardSquare13'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare9 !== '' && this.state.boardSquare10 !== '' && this.state.boardSquare13 !== '' && this.state.boardSquare14 !== '') {
            let boardSquareIDs = ['boardSquare9', 'boardSquare10', 'boardSquare13', 'boardSquare14'];
            currentComponent.checkForPattern(boardSquareIDs);
        } else if (this.state.boardSquare10 !== '' && this.state.boardSquare11 !== '' && this.state.boardSquare14 !== '' && this.state.boardSquare15 !== '') {
            let boardSquareIDs = ['boardSquare10', 'boardSquare11', 'boardSquare14', 'boardSquare15'];
            currentComponent.checkForPattern(boardSquareIDs);
        }
        // tie
        if (this.state.boardSquare0 !== '' && this.state.boardSquare1 !== '' && this.state.boardSquare2 !== '' && this.state.boardSquare3 &&
        this.state.boardSquare4 !== '' && this.state.boardSquare5 !== '' && this.state.boardSquare6 !== '' && this.state.boardSquare7 && 
        this.state.boardSquare8 !== '' && this.state.boardSquare9 !== '' && this.state.boardSquare10 !== '' && this.state.boardSquare11 && 
        this.state.boardSquare12 !== '' && this.state.boardSquare13 !== '' && this.state.boardSquare14 !== '' && this.state.boardSquare15) {
            // let boardSquareIDs = ['boardSquare0', 'boardSquare1', 'boardSquare2', 'boardSquare3', 'boardSquare4',
            // 'boardSquare5', 'boardSquare6', 'boardSquare7', 'boardSquare8', 'boardSquare9', 'boardSquare10',
            // 'boardSquare11', 'boardSquare12', 'boardSquare13', 'boardSquare14', 'boardSquare15'];
            let strText = '';
            strText = 'It\'s a tie!';
            currentComponent.handleShowModal(strText);

        }
    }

    checkForPattern(boardSquareIDs) {
        this._isPatternMounted = true;
        let currentComponent = this;
        let bWinning = false;
        if (this._isPatternMounted) {

            Object.keys(currentComponent.state).forEach(function(key, index) {
                if (boardSquareIDs.includes(key)) {
                    let chipRef = currentComponent.props.firebase.firestore.collection('chips').doc(currentComponent.state[key]);
                    chipRef.get().then((doc) => {
                        if (doc.exists) {
                            currentComponent.setState({
                                squaresValues: [...currentComponent.state.squaresValues, ...Array(1).fill(doc.data().attributes)]
                            }, function() {
                                if (currentComponent.state.squaresValues.length === 4) {
                                    bWinning = isWinningPattern(currentComponent.state.squaresValues[0], currentComponent.state.squaresValues[1], currentComponent.state.squaresValues[2], currentComponent.state.squaresValues[3]);
                                    if (bWinning) {
                                        let strText;
                                        if ((window.sessionStorage.getItem('ownerID') !== null && currentComponent.state.turn === 'owner') ||
                                        (window.sessionStorage.getItem('userID') !== null && currentComponent.state.turn === 'user')) {
                                            console.log("You win!");
                                            strText = 'You win!';
                                        } else {
                                            console.log("You lose!");
                                            strText = 'You lose!';
                                        }
                                        currentComponent.handleShowModal(strText);
                                    }
                                }
                                this._isMounted = false;
                            })
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
                }
            });
        }
        return bWinning;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    handleFigureClick = e => {
        let currentComponent = this;
        let nextStep = currentComponent.state.step + 1;

        if ((currentComponent.state.turn === 'owner' && window.sessionStorage.getItem('ownerID') !== null && currentComponent.state.stage === 'pick')
        || (currentComponent.state.turn === 'user' && window.sessionStorage.getItem('userID') !== null && currentComponent.state.stage === 'pick')) {
            
            this.props.firebase.gameRoom().where('gameID', '==', window.sessionStorage.getItem('gameID'))
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // Don't forget to check for non-available figures!!!
                    currentComponent.props.firebase.gameRoom().doc(doc.id).update({
                        'step':  nextStep,
                        'stage': 'put',
                        'turn': currentComponent.state.turn === 'owner' ? 'user' : 'owner',
                        [e.target.name]: 'pend'
                    })
                    .then(function() {
                        // console.log("Document successfully updated!");
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
                })
            })
        } else if ((currentComponent.state.turn === 'owner' && window.sessionStorage.getItem('ownerID') !== null  && currentComponent.state.stage === 'put') ||
        (currentComponent.state.turn === 'user' && window.sessionStorage.getItem('userID') !== null  && currentComponent.state.stage === 'put')) {
            alert('Select a place on the board where to put the highlighted figure');
        }
        else {
            alert('It\'s not your turn to pick the figure yet');
        }
    }

    handleCloseModal = () => {
        // this.setState({ showModal: false });
        window.sessionStorage.clear();
        this.props.history.push({
            pathname: '/',
        });
    }
    handleShowModal(strText) {
        this.setState({ 
            showModal: true,
            modalText: strText
        });
    }

    render() {
        const { gameID, gameStarted, history, chip1, chip2, chip3, chip4, chip5, chip6, chip7, chip8, chip9,
        chip10, chip11, chip12, chip13, chip14, chip15, chip16, actionText, showModal, modalText } = this.state;
        const current = history[this.state.stepNumber];
        return (
            <React.Fragment>
                <Container className="h-100" id="gameContainer">
                    <Row className="h-100">
                        <Col md="5">
                            <h1>iTak game</h1>
                            <React.Fragment>
                                <h2>Game ID: {gameID}</h2>
                            </React.Fragment>
                                <p style={{fontSize: '20px'}}>{actionText}</p>
                            <React.Fragment>
                                <div className="chips">
                                    <div>
                                        <div className="border-row">
                                            <button onClick={this.handleFigureClick} className="chip" name="chip1" id="chip1">
                                                {(chip1 === "avail" || chip1 === "pend") ?
                                                    <img name="chip1" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/1.svg?alt=media&token=1045fc30-e75e-4cfb-8c16-84d9c0b0fa61" className="chipImg small" alt="Chip1" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg small">
                                                    </div>
                                                }
                                            </button> 
                                            <button onClick={this.handleFigureClick} className="chip" name="chip2" id="chip2">
                                                {(chip2 === "avail" || chip2 === "pend") ?
                                                    <img name="chip2" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/2.svg?alt=media&token=7af1db52-1ab1-4cc5-92b0-348a7622388d" className="chipImg small" alt="Chip2" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg small">
                                                    </div>
                                                }
                                            </button>
                                            <button onClick={this.handleFigureClick} className="chip" name="chip3" id="chip3">
                                                {(chip3 === "avail" || chip3 === "pend") ?
                                                    <img name="chip3" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/3.svg?alt=media&token=469b3407-bdd3-4eee-b1e3-6c6c43f52fc3" className="chipImg small" alt="Chip3" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg small">
                                                    </div>
                                                }
                                            </button>
                                            <button onClick={this.handleFigureClick} className="chip" name="chip4" id="chip4">
                                                {(chip4 === "avail" || chip4 === "pend") ?
                                                    <img name="chip4" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/4.svg?alt=media&token=9ccc73c1-cfd4-4e20-ae03-479e201b7d07" className="chipImg small" alt="Chip4" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg small">
                                                    </div>
                                                }
                                            </button>
                                        </div>
                                        <div className="border-row">
                                            <button onClick={this.handleFigureClick} className="chip" name="chip5" id="chip5">
                                                {(chip5 === "avail" || chip5 === "pend") ?
                                                    <img name="chip5" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/5.svg?alt=media&token=eadd8b90-f531-44c4-8c16-d72ca46b6549" className="chipImg" alt="Chip5" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg">
                                                    </div>
                                                }
                                            </button> 
                                            <button onClick={this.handleFigureClick} className="chip" name="chip6" id="chip6">
                                                {(chip6 === "avail" || chip6 === "pend") ?
                                                    <img name="chip6" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/6.svg?alt=media&token=38fff37f-d797-41f8-bb24-fce609b08612" className="chipImg" alt="Chip6" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg">
                                                    </div>
                                                }
                                            </button>
                                            <button onClick={this.handleFigureClick} className="chip" name="chip7" id="chip7">
                                                {(chip7 === "avail" || chip7 === "pend") ?
                                                    <img name="chip7" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/7.svg?alt=media&token=82641bcb-cade-412e-9821-ef4d5778863b" className="chipImg" alt="Chip7" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg">
                                                    </div>
                                                }
                                            </button>
                                            <button onClick={this.handleFigureClick} className="chip" name="chip8" id="chip8">
                                                {(chip8 === "avail" || chip8 === "pend") ?
                                                    <img name="chip8" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/8.svg?alt=media&token=c7e84d24-9485-4df0-bc04-cee2ab41f3ef" className="chipImg" alt="Chip8" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg">
                                                    </div>
                                                }
                                            </button>
                                        </div>
                                        <div className="border-row">
                                            <button onClick={this.handleFigureClick} className="chip" name="chip9" id="chip9">
                                                {(chip9 === "avail" || chip9 === "pend") ?
                                                    <img name="chip9" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/9.svg?alt=media&token=ff831c4a-187e-4107-bd0f-08de56f36aff" className="chipImg small" alt="Chip9" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg small">
                                                    </div>
                                                }
                                            </button>
                                            <button onClick={this.handleFigureClick} className="chip" name="chip10" id="chip10">
                                                {(chip10 === "avail" || chip10 === "pend") ?
                                                    <img name="chip10" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/10.svg?alt=media&token=ed8676be-0793-48c7-b225-f91159520064" className="chipImg small" alt="Chip10" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg small">
                                                    </div>
                                                }
                                            </button>
                                            <button onClick={this.handleFigureClick} className="chip" name="chip11" id="chip11">
                                                {(chip11 === "avail" || chip11 === "pend") ?
                                                    <img name="chip11" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/11.svg?alt=media&token=5411bf90-ae2f-4262-8fac-18bae74645ad" className="chipImg small" alt="Chip11" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg small">
                                                    </div>
                                                }
                                            </button>
                                            <button onClick={this.handleFigureClick} className="chip" name="chip12" id="chip12">
                                                {(chip12 === "avail" || chip12 === "pend") ?
                                                    <img name="chip12" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/12.svg?alt=media&token=8bc6a465-5b71-4b94-aa8d-060d1cc36777" className="chipImg small" alt="Chip12" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg small">
                                                    </div>
                                                }
                                            </button>
                                        </div>
                                        <div className="border-row">
                                            <button onClick={this.handleFigureClick} className="chip" name="chip13" id="chip13">
                                                {(chip13 === "avail" || chip13 === "pend") ?
                                                    <img name="chip13" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/13.svg?alt=media&token=200575e6-22e2-405d-afa8-a715584270d3" className="chipImg" alt="Chip13" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg">
                                                    </div>
                                                }
                                            </button>
                                            <button onClick={this.handleFigureClick} className="chip" name="chip14" id="chip14">
                                                {(chip14 === "avail" || chip14 === "pend") ?
                                                    <img name="chip14" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/14.svg?alt=media&token=b6e78b17-8a89-40d5-b5cf-88dac0912ab1" className="chipImg" alt="Chip14" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg">
                                                    </div>
                                                }
                                            </button>
                                            <button onClick={this.handleFigureClick} className="chip" name="chip15" id="chip15">
                                                {(chip15 === "avail" || chip15 === "pend") ?
                                                    <img name="chip15" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/15.svg?alt=media&token=8af64269-f755-40ae-b801-6ce043fff73a" className="chipImg" alt="Chip15" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg">
                                                    </div>
                                                }
                                            </button>
                                            <button onClick={this.handleFigureClick} className="chip" name="chip16" id="chip16">
                                                {(chip16 === "avail" || chip16 === "pend") ?
                                                    <img name="chip16" src="https://firebasestorage.googleapis.com/v0/b/itak-game.appspot.com/o/16.svg?alt=media&token=0c16a4f4-e469-4e31-a291-abd6c5259816" className="chipImg" alt="Chip16" style={{width: 'fit-content'}} />
                                                    :
                                                    <div className="chipImg">
                                                    </div>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        </Col>
                        <Col md="7">
                            {gameStarted === false ? 
                            <React.Fragment>
                                <Spinner className="game" animation="border" role="status" style={{right: '50%'}} id="spinner">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                                <p id="spinnerText" style={{top: '40%', position: 'absolute', right: '50%'}}>Waiting for the opponent...</p>
                            </React.Fragment> :
                            <React.Fragment>
                                <div className="game">
                                    <Board onClick={(i)=>this.handleClick(i)} squares={current.squares} />
                                </div>
                            </React.Fragment>}
                        </Col>
                    </Row>
                </Container>

                <React.Fragment>
                    <Modal
                        show={showModal}
                        onHide={this.handleCloseModal}
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{modalText}</p>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="warning" onClick={this.handleCloseModal}>
                            Finish
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </React.Fragment>
            </React.Fragment>
        )
    }
}

export default compose(withFirebase, withRouter)(Game);