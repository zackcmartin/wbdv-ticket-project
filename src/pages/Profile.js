import React from 'react'

import StubHubService from '../stubhub-service/StubHubService';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from './logo.png';

import { Link, Redirect } from 'react-router-dom'


let stubHubService = StubHubService.getInstance();

export default class Profile extends React.Component {

    constructor(props) {
        super(props)


        let loadError = false;
        let username = '';

        try {
            username = this.props.location.state.username
        }
        catch{
            loadError = true;
        }


        this.state = {
            userInput: {
                username: username,
                password: '',
                firstName: '',
                lastName: '',
                type: ''
            },
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
        fetch(`https://wbdv-ticket-server.herokuapp.com/api/users/${this.state.userInput.username}`)
            .then(response => response.json()).then(user => this.setState({ userInput: user })).catch(err => this.setState({ error: true }))

        fetch(`https://wbdv-ticket-server.herokuapp.com/api/users/${this.state.userInput.username}/events`)
            .then(response => response.json()).then(events => this.setState({ events: events })).catch(err => this.setState({ error: true }))
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




    updateUser = (user) =>
        fetch(`https://wbdv-ticket-server.herokuapp.com/api/users/${this.state.userInput.username}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': true
            },
        })
            .then(this.setState({ toSignIn: true }))



    checkUpdateUser() {

        if (this.state.userInput.username == '' || this.state.userInput.password == '' ||
            this.state.userInput.firstName == '' || this.state.userInput.lastName == '') {
            this.setState({ error: true });
        }

        else {
            this.updateUser(this.state.userInput)
        }

    }



    render() {

        if (this.state.loadingError === true) {
            return <Redirect to='/' />
        }


        return (
            <div>
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
                        <div style={{ fontSize: 23 }}>~Home~</div>
                    </Navbar.Brand>
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

                    <br />

                    {/* If error in updating profile */}
                    <div style={this.state.error === false ? { display: 'none' } : { 'padding-top': 0 }} >
                        <h2 style={{ color: 'red', marginLeft: 100 }}> Must fill out each section to update profile. This ensures changes</h2>
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
                                        firstName: e.currentTarget.value
                                    }
                                })} />

                            <h5>Last Name:</h5>
                            <input
                                value={this.state.userInput.lastName}
                                placeholder={this.state.userInput.lastName} className="form-control"
                                onChange={(e) => this.setState({
                                    userInput: {
                                        lastName: e.currentTarget.value
                                    }
                                })} />

                            <h5>Email:</h5>
                            <input
                                value={this.state.userInput.username}
                                placeholder="Stubhub email address" className="form-control"
                                onChange={(e) => this.state.userInput.username = e.currentTarget.value} disabled />

                            <h5>Password:</h5>
                            <input
                                value={this.state.userInput.password}
                                type='password'
                                placeholder="********" className="form-control"
                                onChange={(e) => this.setState({
                                    userInput: {
                                        password: e.currentTarget.value
                                    }
                                })} />
                            <br />
                            <button onClick={this.checkUpdateUser} className="btn btn-info btn-block">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
