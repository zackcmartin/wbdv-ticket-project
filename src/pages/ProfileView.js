import React from 'react'

import StubHubService from '../stubhub-service/StubHubService';
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from './logo.png';
import { type } from 'os';


let stubHubService = StubHubService.getInstance();

export default class Profile extends React.Component {

    constructor(props) {
        super(props)


        const username = props.match.params.username;

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
            listingError: false

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


                <div className="container-fluid" style={{ 'padding-top': 30 }}>

                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <h1>{this.state.userInput.firstName} {this.state.userInput.lastName}'s Events</h1>
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
                        <h2 style={{ color: 'red', marginLeft: 100 }}> Could not get listings. This user may not have a proper StubHub account.</h2>
                    </div>

                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <h1>{this.state.userInput.firstName} {this.state.userInput.lastName}'s Listings</h1>
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
                </div>
            </div>
        )
    }
}
