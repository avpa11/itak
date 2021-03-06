import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from './Firebase';

//  Bootstrap components
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <main className="text-center form-signin h-100">
                    <h1>Welcome to iTak</h1>
                    <Row style={{padding: '15px'}}></Row>
                    <Button variant="warning" as={Link} to="/new">New Game</Button>
                    <Row style={{padding: '15px'}}></Row>
                    <Button variant="warning" as={Link} to="/join-friend">Join Friend's Game</Button>
                    <Row style={{padding: '15px'}}></Row>
                    <Button variant="warning">Join Random Game</Button>
                </main>
            </React.Fragment>
        )
    }
}

export default compose(withFirebase, withRouter)(Home);