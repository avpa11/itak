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
        const { gameID } = this.state;
        return (
            <React.Fragment>
                <main className="text-center form-signin h-100">
                    <h1>New Game</h1>
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <Row className="formRow">
                            <Col md={12}>
                                <Form.Label>Your Game Code: </Form.Label><br />
                                <Form.Label id="gameID" name="gameID">{gameID}</Form.Label>
                            </Col>
                        </Row>
                        <Row className="formRow">
                            <Col md={12}>
                                <Form.Label>Open Game: </Form.Label>
                                <input onChange={this.handleChange} type="checkbox" name="openGame" />
                            </Col>
                        </Row>
                        <Row className="formRow">
                            <Col md={6}>
                                <div className="buttonWrapper">
                                    <Button  as={Link} to="/" className="buttonStyle">Back</Button>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="buttonWrapper">
                                    <Button type="submit" className="buttonStyle">Continue</Button>
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