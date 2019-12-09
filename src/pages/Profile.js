import React from 'react'

import StubHubService from '../stubhub-service/StubHubService';
import UserService from '../services/UserService';
import EventService from '../services/EventService';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from './logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core"
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";


import { Link, Redirect } from 'react-router-dom'

library.add(faTrashAlt);

let stubHubService = StubHubService.getInstance();
let userService = UserService.getInstance();
let eventService = EventService.getInstance();

export default class Profile extends React.Component {

    constructor(props) {
        super(props)


        let loadError = false;
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
            loadError = true;
        }


        this.state = {
            userInput: userInput,
            error: false,
            events: '',
            listingArray: '',
            listingError: false,
            loadingError: loadError

        }

        this.checkUpdateUser = this.checkUpdateUser.bind(this);
        this.getAllListings = this.getAllListings.bind(this);
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

        if (this.state.loadingError === true) {
            return <Redirect to='/login' />
        }


        return (
            <div>
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


                <div className="container-fluid" style={this.state.loadingError === true ? { display: 'none' } : { 'padding-top': 0 }}>
                    {/* If not an admin */}
                    <div style={this.state.userInput.type === "admin" ? { 'padding-top': 0 } : { display: 'none' }} >
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <h1 style={{ color: 'green' }}>You are a website admin</h1>
                                <h5>Feel free to monitor other users and edit any site data to maintain a safe and appropriate community</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <h1>Your Events</h1>
                            <ul className="list-group">
                                {
                                    this.state.events && this.state.events.map(event =>
                                        <li key={event.id} className="nav">
                                            <button className="btn btn-primary">{event.description}
                                            </button>
                                            <button className="btn btn-primary" onClick={() => eventService.deleteEvent(event.id).then(eventService.getEvents())} style={{ marginLeft: 10 }}>
                                                <FontAwesomeIcon icon="trash-alt" />
                                            </button>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>


                    <br />

                    {/* If error in getting listing */}
                    <div style={this.state.listingError === false ? { display: 'none' } : { 'padding-top': 0 }} >
                        <h2 style={{ color: 'red', marginLeft: 100 }}> Could not get listings. Is this a proper StubHub account?</h2>
                    </div>

                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <h1>Your Listings</h1>
                            <button onClick={this.getAllListings} className="btn btn-primary">Show Listings</button>
                            <ul className="list-group">
                                {this.state.listingArray && this.state.listingArray.map((listing) => (
                                    <li className="list-group">
                                        <h3>Event : <div style={{ color: 'blue' }}>{listing.eventDescription}</div></h3>
                                    </li>
                                ))
                                }
                            </ul>
                        </div>
                    </div>

                    {/* If error in updating profile */}
                    <div style={this.state.error === false ? { display: 'none' } : { 'padding-top': 0 }} >
                        <h2 style={{ color: 'red', marginLeft: 100 }}> Every field must be filled out</h2>
                    </div>


                    <div className="row">
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

                            <h5>Email:</h5>
                            <input
                                value={this.state.userInput.username}
                                placeholder="Stubhub email address" className="form-control"
                                disabled />

                            <h5>Password:</h5>
                            <input
                                value={this.state.userInput.password}
                                type='password'
                                placeholder="********" className="form-control"
                                onChange={(e) => this.setState({
                                    userInput: {
                                        ...this.state.userInput,
                                        password: e.currentTarget.value
                                    }
                                })} />
                            <br />
                            <button onClick={this.checkUpdateUser} className="btn btn-info btn-block">Save Changes</button>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <Link to="/login">
                                <button className="btn btn-info float-right">Sign Out</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div >
        )
    }
}
