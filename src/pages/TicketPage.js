import React from "react";
import TicketPageHeader from "../components/TicketPageHeader";
import EventCard from "../components/EventCard";
import events from "../data/events";
import StubHubService from "../stubhub-service/StubHubService";
import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.png';
import { Link, Redirect } from 'react-router-dom'

let stubHubService = StubHubService.getInstance();


export default class TicketPage extends React.Component {
    constructor(props) {
        super(props);


        let noUser = false;
        let userDelete = false;
        let userInput = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            type: ''
        };

        try {
            userInput = this.props.location.state.user
            if (this.props.location.state.user.username == '') {
                noUser = true;
            }
        }
        catch{
            noUser = true;
        }

        try {
            userDelete = this.props.location.state.userDelete
        }
        catch{
        }

        this.state = {
            userInput: userInput,
            noUser: noUser,
            event_many: events,
            selected_event: null,
            username: '',
            password: '',
            api_key_response: null,
            api_key: null,
            bins: [],
            reviews: [{ username: 'user_1', text: 'hello' }, { username: 'user_2', text: 'hello' }, { username: 'user_3', text: 'hello' }, { username: 'user_4', text: 'hello' }],
            userDelete: userDelete
        };

        this.getAPIkey = this.getAPIkey.bind(this);
        this.getReviews = this.getReviews.bind(this)

    }

    async getReviews(event_id) {
        // let response = await stubHubService.getEventListings(event_id);
        // let event_service = new EventService(response)
    }

    async getAPIkey() {
        let response = await stubHubService.getAPItoken(this.state.userInput.username, this.state.userInput.password);
        stubHubService.setAccessToken(response.access_token)
        console.log(response)
        this.setState(({
            username: '',
            password: '',
            api_key_response: response,
            api_key: response.access_token,
        }))
    }

    render() {
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
                            pathname: '/profile',
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
                                <div style={{ color: '#A8E0F7', fontSize: 23 }}>~Profile~</div>
                            </Navbar.Brand>
                        </Link>
                    </Navbar>
                </div>
                <div className="container">
                <div style={this.state.userDelete === true ? { 'padding-top': 0 } : { display: 'none' }} >
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <h1 style={{ color: 'green', fontSize: 20 }}>User was successfully deleted</h1>
                        </div>
                    </div>
                </div>
                    <div style={this.state.noUser === true ? { 'padding-top': 0 } : { display: 'none' }} >
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <h1 style={{ color: '#353A40', fontSize: 20 }}>You are not signed in. For more website functionality <Link to={`/login`}><button type="button" className="btn btn-info">Sign In</button></Link>. No account yet? <Link to={`/login`}><button type="button" className="btn btn-info">Sign up!</button></Link></h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h3>Find Users</h3>
                            <Link to={{
                                pathname: '/users',
                                state: { user: this.state.userInput }
                            }}><button type="button" className="btn btn-dark">Users</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h3>Tracked Events</h3>
                            <h5>Add Tracked Events</h5>

                        </div>
                    </div>
                    <div className="row">
                        {!this.selected_event && this.state.event_many.map(event => {
                            let button = (
                                <button type="button" className="btn btn-dark" onClick={() => {
                                    this.setState({ selected_event: event })
                                }}>
                                    Load Data
                            </button>
                            );
                            return (
                                <EventCard
                                    key={event.id}
                                    className={"col-3 m-2"}
                                    title={event.name}
                                    text={`${event.venue.name} at ${event.eventDateLocal}`}
                                    button={button}
                                />
                            );
                        })}

                    </div>
                    <div className={"row"}>
                        <div className={"col"}>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="commentinput">Write a comment!</label>
                                    <textarea className="form-control" id="commentinput" rows="3" placeholder={"Write how you feel about the concert"}></textarea>
                                </div>
                            </form>
                            {this.state.selected_event && <div>
                                <EventCard
                                    key={this.state.selected_event.id}
                                    className={"col-3 m-2"}
                                    title={this.state.selected_event.name}
                                    text={`${this.state.selected_event.venue.name} at ${this.state.selected_event.eventDateLocal}`}
                                /></div>}
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
                </div>
            </div>
        );
    }
}
