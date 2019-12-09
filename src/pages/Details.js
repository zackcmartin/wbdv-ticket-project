import React from 'react'
import events from "../data/events";

import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.png';

import { Link, Redirect } from 'react-router-dom'


export default class Details extends React.Component {

    constructor(props) {
        super(props);

        let noUser = false;
        let userInput = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            type: ''
        };

        try {
            userInput = this.props.location.state.user
        }
        catch{
            noUser = true;
        }

        this.state = {
            userInput: userInput,
            noUser: noUser,
            event: events[0],
            reviews: [{ username: 'user_1', text: 'hello' }, { username: 'user_2', text: 'hello' }, { username: 'user_3', text: 'hello' }, { username: 'user_4', text: 'hello' }]
        }
    }

    render() {
        console.log('I am rendering something')
        return (

            <div>
                <div style={this.state.noUser === true ? { 'padding-top': 0 } : { display: 'none' }} >
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand>
                            <img
                                alt=""
                                src={logo}
                                width="40"
                                height="40"
                                className="d-inline-block align-top float-left"
                                style={{ marginTop: -10, marginRight: 40 }}
                            />{'  '}
                            StubHub Helper
</Navbar.Brand>
                    </Navbar>
                </div>
                <div style={this.state.noUser === false ? { 'padding-top': 0 } : { display: 'none' }} >
                    <Navbar bg="dark" variant="dark">
                        <Link to={{
                            pathname: '/',
                            state: { user: this.state.userInput }
                        }}>
                            <Navbar.Brand>
                                <img
                                    alt=""
                                    src={logo}
                                    width="40"
                                    height="40"
                                    className="d-inline-block align-top float-left"
                                    style={{ marginTop: -10, marginRight: 40 }}
                                />{'  '}
                                <div style={{ color: '#A8E0F7', fontSize: 23 }}>~Home~</div>
                            </Navbar.Brand>
                        </Link>
                    </Navbar>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4 offset-md-2">
                            <h2>{this.state.event.name}</h2>
                            <div className="card">
                                <div className="card-body bg-light mb-3">
                                    <p className="card-text">{this.state.event.description}</p>
                                    <p className="card-text">{`Save the date: ${this.state.event.eventDateLocal}`}</p>
                                    <p className="card-text">{`Get excited to see ${this.state.event.performers.name} to play at ${this.state.event.venue.name}`} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 offset-md-2">
                            <h3>Comments</h3>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="commentinput">Write a comment!</label>
                                    <textarea className="form-control" id="commentinput" rows="3" placeholder={"Write how you feel about the concert"}></textarea>
                                    <button className="btn btn-dark my-2" onClick={() => { /** TODO service to add reviews **/ }}>Submit comment</button>
                                </div>
                            </form>
                            {this.state.reviews.map(review =>
                                <div className="card bg-light border-primary">
                                    <div className="card-body">
                                        <p className={"card-text"}>
                                            {review.text}
                                        </p>
                                        <p className={"card-text "}>
                                            {`Commented by ${review.username}`}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col offset-md-4">
                            <button className="btn btn-dark my-4" onClick={() => {/** TODO service to add event**/ }}>Add event to your tracked events</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
