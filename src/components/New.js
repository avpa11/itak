import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from './Firebase';

//  Bootstrap components
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { Form } from 'react-bootstrap';

const initState = {
    gameID: '',
    openGame: false,
    ownerID: ''
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {...initState};
    }

    componentDidMount() {
        this.setState({gameID: makeid(5)});
        this.setState({ownerID: makeid(4)});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.firebase.gameRoom().add({
            'gameID': this.state.gameID,
            'openGame': this.state.openGame,
            'ownerID': this.state.ownerID,
            'timestamp': Math.floor(Date.now() / 1000),
            'gameStarted': false
        }).then(() => {
            this.props.history.push({
                pathname: '/game',
                previouspath: '/new',
                ownerID: this.state.ownerID,
                gameID: this.state.gameID
            });
        }).catch(error => console.log(error));
        // console.log(makeid(5));
    }

    handleChange = e => {
        if (e.target.checked) {
            this.setState({openGame: true})
        } else {
            this.setState({ openGame: false });
        }
    }

    render() {
        // const { gameID } = this.state;
        return (
            <React.Fragment>
                <main className="text-center form-signin h-100">
                    <h1>New Game</h1>
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <Row className="formRow">
                            <Col md={12}>
                                {/* <Form.Label>Tell you partner this game ID: </Form.Label><br /> */}
                            </Col>
                        </Row>
                        <Row className="formRow">
                            {/* <Col md={5}>
                                <Form.Label id="gameID" name="gameID" style={{backgroundColor: '#E8E8E8', padding: '5px 10px'}}>{gameID}</Form.Label>
                                </Col>
                                <Col md={7} style={{padding: '5px 0 5px'}}>
                                <input onChange={this.handleChange} type="checkbox" name="openGame" style={{marginRight:  '10px'}} />
                                <Form.Label>  Public Game: </Form.Label>
                            </Col> */}
                            <Col md={12}>
                                <input onChange={this.handleChange} type="checkbox" name="openGame" style={{marginRight:  '10px'}} />
                                <Form.Label>  Public Game </Form.Label>
                            </Col>
                        </Row>
                        <Row className="formRow">
                            <Col md={6}>
                                <div className="buttonWrapper">
                                    <Button variant="warning" as={Link} to="/" className="buttonStyle shadowBox">Back</Button>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="buttonWrapper">
                                    <Button variant="warning" type="submit" className="buttonStyle shadowBox">Start game</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </main>
            </React.Fragment>
        )
    }
}

export default compose(withFirebase, withRouter)(Home);