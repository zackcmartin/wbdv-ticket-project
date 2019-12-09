import React from "react";
import TicketPageHeader from "../components/TicketPageHeader";
import EventCard from "../components/EventCard";
import events from "../data/events";
import StubHubService from "../stubhub-service/StubHubService";
import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.png';
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment';
import UserService from "../services/UserService";
import EventService from "../services/EventService";
import ReviewService from "../services/ReviewService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";

let stubHubService = StubHubService.getInstance();
let userService = UserService.getInstance();
let eventService = EventService.getInstance()
let reviewService = ReviewService.getInstance()


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
            event_many: [],
            selected_event: null,
            username: '',
            password: '',
            concert_name: '',
            api_key_response: null,
            api_key: null,
            bins: [],
            reviews: [],
            userDelete: userDelete
        };

        this.getAPIkey = this.getAPIkey.bind(this);
        this.getTrackedEvents = this.getTrackedEvents.bind(this);
    }

    componentDidMount() {
        if(!this.state.noUser){
            this.getTrackedEvents()
        }
        else {
            this.getRecentReviews()
        }
    }

    async getTrackedEvents(){
        let trackedEvents = await eventService.getEvents(this.state.userInput.username).then(response => response.json())
        this.setState({event_many: trackedEvents})
    }

    async getRecentReviews(){
        let recent_reviews = await reviewService.getLast5Reviews()
        this.setState({reviews: recent_reviews})
    }


    async getAPIkey() {
        let response = await stubHubService.getAPItoken(this.state.userInput.username, this.state.userInput.password);
        stubHubService.setAccessToken(response.access_token)
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
                                <h1 style={{ color: '#353A40', fontSize: 20 }}>You are not signed in. For more website functionality <Link to={`/login`}><button type="button" className="btn btn-dark">Sign In</button></Link>. No account yet? <Link to={`/register`}><button type="button" className="btn btn-dark">Sign up!</button></Link></h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h3>Add Tracked Events</h3>
                            <Link to={{
                                pathname: '/search',
                                state: { user: this.state.userInput }
                            }}><button type="button" className="btn btn-dark">Search Events</button>
                            </Link>
                        </div>
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
                            {!this.state.noUser && (<div>
                                <h3>Tracked Events</h3>
                                <h5>Add Tracked Events</h5>
                            </div>)}
                            {this.state.noUser && (
                                <div>
                                    <h3>These are some of the most recent reviews added on our website. Sign up now to see more!</h3>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        {this.state.noUser && this.state.reviews.map(review =>
                            <div className="col-md-3 m-2 col-12">
                                <div className="card bg-light border-primary">
                                    <div className="card-body">
                                        <p className={"card-text"}>
                                            {review.review}
                                       </p>
                                        <p className={"card-text "}>
                                            <Link to={{ pathname: `/profile/${review.user.username}`,
                                                state: { user: this.state.userInput }
                                            }}>
                                                {`Commented by ${review.user.username}`}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!this.state.noUser && this.state.event_many.map(event => {
                            let button = (
                                <Link to={{
                                    pathname: `/details/${event.id}`,
                                    state: { user: this.state.userInput }
                                }}>
                                <button type="button" className="btn btn-dark">
                                    Go to event
                                </button>
                                </Link>
                            );
                            return (
                                <EventCard
                                    key={event.id}
                                    className={"col-md-3 m-2 col-12"}
                                    title={event.name}
                                    text={`${event.venue.name} at ${moment(event.eventDateLocal).format('MMMM Do YYYY, h:mm:ss a')}`}
                                    button={button}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
