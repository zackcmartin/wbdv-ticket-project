import React from 'react'

import StubHubService from '../stubhub-service/StubHubService';
import UserService from '../services/UserService';
import EventService from '../services/EventService';
import { Link, Redirect } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from './logo.png';
import { type } from 'os';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt);


let stubHubService = StubHubService.getInstance();
let userService = UserService.getInstance();
let eventService = EventService.getInstance();

export default class Profile extends React.Component {

    constructor(props) {
        super(props)


        const username = props.match.params.username;

        let noUser = false;
        let viewerInput = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            type: ''
        };

        try {
            viewerInput = this.props.location.state.user
            if (this.props.location.state.user.username == '') {
                noUser = true;
            }
        }
        catch{
            noUser = true;
        }

        this.state = {
            userInput: {
                username: username,
                password: '',
                firstName: '',
                lastName: '',
                type: ''
            },
            viewerInput: viewerInput,
            noUser: noUser,
            toUserList: false,
            error: false,
            events: '',
            listingArray: '',
            listingError: false,
            listingsNotAllowed: false

        }
        this.getAllListings = this.getAllListings.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.checkUpdateUser = this.checkUpdateUser.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.getEvents = this.getEvents.bind(this);
    }


    componentDidMount() {
        userService.getUser(this.state.userInput.username)
            .then(response => response.json()).then(user => this.setState({ userInput: user })).catch(err => this.setState({ error: true }))

        eventService.getEvents(this.state.userInput.username).then(response => response.json()).then(events => this.setState({ events: events })).catch(err => this.setState({ error: true }))
    }




    async getAllListings() {
        try {
            let response = await stubHubService.getAPItoken(this.state.userInput.username, this.state.userInput.password);
            stubHubService.setAccessToken(response.access_token)
            let response2 = await stubHubService.getAllListings();
            this.setState({
                listingArray: response2.listings.listing
            })
        }
        catch{
            this.setState({ listingError: true })
        }
    }




    deleteUser() {
        if (this.state.userInput.type !== 'admin') {
            userService.deleteUser(this.state.userInput.username).then(this.setState({ toUserList: true }))
        }
        else {
            this.setState({ error: true })
        }

    }


    deleteEvent(eventId) {
        eventService.deleteEvent(this.state.userInput.username, eventId).then(() => this.getEvents())
    }

    getEvents(){
        eventService.getEvents(this.state.userInput.username).then(response => response.json()).then(events => this.setState({events: events})).catch(err => this.setState({ error: true }))
    }



    checkUpdateUser() {

        if (this.state.userInput.username == '' || this.state.userInput.password == '' ||
            this.state.userInput.firstName == '' || this.state.userInput.lastName == '') {
            this.setState({ error: true });
        }

        else {
            userService.updateUser(this.state.userInput, this.state.userInput.username)
        }

    }



    render() {

        if (this.state.toUserList === true) {
            return <Redirect to={{
                pathname: '/',
                state: { user: this.state.viewerInput, userDelete: true }
            }} />
        }

        return (

            <div>
                <Navbar bg="dark" variant="dark">
                    <Link to={{
                        pathname: '/',
                        state: { user: this.state.viewerInput }
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


                <div className="container-fluid" style={{ 'padding-top': 10 }}>

                    <div style={this.state.error === true ? { 'padding-top': 0 } : { display: 'none' }} >
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <h1 style={{ color: 'red', fontSize: 20 }}>You are trying to delete an admin user. Admin users cannot be deleted.</h1>
                            </div>
                        </div>
                    </div>

                    <div style={this.state.viewerInput.type === 'admin' ? { 'padding-top': 0 } : { display: 'none' }} >
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <h1 style={{ color: 'green', fontSize: 18 }}>As an admin, you have the ability to edit this user's first/last name and events. You may also delete them if you deem it necessary.</h1>
                            </div>
                            <div>
                                <button className="btn btn-danger" onClick={() => this.deleteUser()}>Delete User</button>
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
                        <div className="col-md-10 col-md-offset-1">
                            <h1>{this.state.userInput.firstName} {this.state.userInput.lastName}'s Events</h1>
                            <ul className="list-group">
                                {
                                    this.state.events && this.state.events.map(event =>
                                        <li key={event.id} className="nav">
                                            <button className="btn btn-dark">{event.description}
                                            </button>
                                            <div style={this.state.viewerInput.type === 'admin' ? { 'padding-top': 0 } : { display: 'none' }} >
                                                <button className="btn btn-dark" style={{ marginLeft: 10 }} onClick={() => this.deleteEvent(event.id)}>
                                                    <FontAwesomeIcon icon="trash-alt" />
                                                </button>
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>


                    <br />

                    {/* If error in getting listing */}
                    <div style={this.state.listingError === false ? { display: 'none' } : { 'padding-top': 0 }} >
                        <h2 style={{ color: 'red', marginLeft: 100 }}> Could not get listings. This user may not have a proper StubHub account.</h2>
                    </div>

                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <h1>{this.state.userInput.firstName} {this.state.userInput.lastName}'s Listings</h1>
                            <div style={this.state.noUser === true ? { display: 'none' } : { 'padding-top': 0 }}>
                                <button onClick={this.getAllListings} className="btn btn-dark">Show Listings</button>
                                <ul className="list-group">
                                    {this.state.listingArray && this.state.listingArray.map((listing) => (
                                        <li className="list-group">
                                            <h3>Event : <div style={{ color: 'blue' }}>{listing.eventDescription}</div></h3>
                                        </li>
                                    ))
                                    }
                                </ul>
                            </div>
                            <div style={this.state.noUser === false ? { display: 'none' } : { 'padding-top': 0 }}>
                                <h4 style={{ color: 'red' }}>You must have an account to view a user's listings</h4>
                            </div>
                        </div>
                    </div>

                    <div style={this.state.viewerInput.type === 'admin' ? { 'padding-top': 0 } : { display: 'none' }} className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <h1>Edit Profile</h1>
                            <h5>First Name:</h5>
                            <input
                                value={this.state.userInput.firstName}
                                placeholder={this.state.userInput.firstName} className="form-control"
                                onChange={(e) => this.setState({
                                    userInput: {
                                        ...this.state.userInput,
                                        firstName: e.currentTarget.value,
                                    }
                                })} />

                            <h5>Last Name:</h5>
                            <input
                                value={this.state.userInput.lastName}
                                placeholder={this.state.userInput.lastName} className="form-control"
                                onChange={(e) => this.setState({
                                    userInput: {
                                        ...this.state.userInput,
                                        lastName: e.currentTarget.value
                                    }
                                })} />
                            <br />
                            <button onClick={this.checkUpdateUser} className="btn btn-dark btn-block">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
