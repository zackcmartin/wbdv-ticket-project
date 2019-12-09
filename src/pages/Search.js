import React from 'react'

import StubHubService from "../stubhub-service/StubHubService";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";
import queryString from 'query-string';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from './logo.png';

let stubHubService = StubHubService.getInstance();

export default class Search extends React.Component {

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
            event_name: '',
            event_many: [],
            noUser: noUser
        }
        this.getAPIkey = this.getAPIkey.bind(this);
        this.getEvents = this.getEvents.bind(this);

    }

    componentDidMount() {
        let cur_values = queryString.parse(this.props.location.search);
        stubHubService.setAccessToken()
        if(cur_values.event_name){
            this.getEvents(cur_values.event_name)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        let cur_values = queryString.parse(this.props.location.search);
        let prev_values = queryString.parse(prevProps.location.search);
        if (cur_values.event_name !== prev_values.event_name && cur_values.event_name !== "") {
            this.getEvents(cur_values.event_name)
        }
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

                <div className="container">
                    <div style={this.state.noUser === true ? { 'padding-top': 0 } : { display: 'none' }} >
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <h1 style={{ color: '#353A40', fontSize: 20 }}>You are not signed in. For more website functionality <Link to={`/login`}><button type="button" className="btn btn-info">Sign In</button></Link>. No account yet? <Link to={`/register`}><button type="button" className="btn btn-info">Sign up!</button></Link></h1>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <h2>Search for Events Here</h2>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col"}>
                            <input className={"my-3 form-control"} value={this.state.event_name}
                                placeholder="Insert event you are searching for"
                                onChange={(e) => this.setState({ event_name: e.currentTarget.value })} />
                            <Link to={`/search?event_name=${this.state.event_name}`}>
                                <button className="btn btn-dark btn-block" >Search for Events</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.event_many && this.state.event_many.map(event => {
                            let button = (
                                <Link to={{
                                    pathname: `/details/${event.id}`,
                                    state: { user: this.state.userInput }
                                }}>
                                    <button type="button" className="btn btn-dark">Go to event</button>
                                </Link>
                            );
                            return <EventCard
                                key={event.id}
                                className={"col-3 m-2"}
                                title={event.name}
                                text={`${event.venue.name} at ${event.eventDateLocal}`}
                                button={button}
                            />
                        })
                        }
                    </div>
                </div>
            </div>)
    }



    async getAPIkey() {
        let response = await stubHubService.getAPItoken('kr7908@gmail.com', '123Welcome456!');
        stubHubService.setAccessToken(response.access_token)
    }

    async getEvents(event_name) {
        let response = await stubHubService.getEvents({ name: event_name })
        this.setState({ event_many: response.events })
    }

}
