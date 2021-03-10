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
    userID: '',
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

class JoinRandom extends Component {
    constructor(props) {
        super(props);
        this.state = {...initState};
    }

    componentDidMount() {
        this.setState({userID: makeid(4)});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/game',
            previouspath: '/join-random',
            userID: this.state.userID,
        });

    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <React.Fragment>
                <main className="text-center form-signin h-100">
                    <h1>Random game</h1>
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <Row>
                            <Col md={12}>
                                <Form.Label>You are about to join a random game</Form.Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="buttonWrapper">
                                    <Button variant="warning" as={Link} to="/" className="buttonStyle shadowBox">Back</Button>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="buttonWrapper">
                                    <Button variant="warning" type="submit" className="buttonStyle shadowBox">Continue</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </main>
            </React.Fragment>
        )
    }
}

export default compose(withFirebase, withRouter)(JoinRandom);