import React from 'react'

import StubHubService from '../stubhub-service/StubHubService';
import UserService from '../services/UserService';
import { Link, Redirect } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import logo from './logo.png';


let stubHubService = StubHubService.getInstance();
let userService = UserService.getInstance();

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userInput: {
                username: '',
                password: '',
            },
            error: false,
            wrongPassword: false,
            toProfile: false,
            api_key_response: null,
            api_key: null,

        }
        this.getAPIkey = this.getAPIkey.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }

    async getAPIkey() {
        let response = await stubHubService.getAPItoken(this.state.userInput.username, this.state.userInput.password);
        stubHubService.setAccessToken(response.access_token)
        this.setState(({
            userInput: {
                username: '',
                password: '',
                firstName: '',
                lastName: '',
                type: ''
            },
            api_key_response: response,
            api_key: response.access_token,
        }))
    }

    checkUser() {

        if (this.state.userInput.username == '' || this.state.userInput.password == '') {
            this.setState({ error: true, wrongPassword: false });
        }

        else {
            userService.getUser(this.state.userInput.username).then(response => response.json()).catch(err => this.setState({ error: true })).then(user => user.password === this.state.userInput.password ?
                this.setState({ toProfile: true, userInput: { username: user.username, password: user.password, firstName: user.firstName, lastName: user.lastName, type: user.type } }) 
                : this.setState({ wrongPassword: true, error: false })).catch(err => this.setState({ error: true, wrongPassword: false }))
        }

    }

    render() {


        if (this.state.toProfile === true) {
            return <Redirect to={{
                pathname: '/',
                state: { user: this.state.userInput }
            }} />
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
                        StubHub Helper
         </Navbar.Brand>
                </Navbar>

                <div className="container-fluid">

                    {/* If error in sign up */}
                    <div style={this.state.error === false ? { display: 'none' } : { 'padding-top': 0 }} >
                        <h2 style={{ color: 'red', marginLeft: 100 }}> Could not find that username in our database. Have you registered? </h2>
                    </div>

                    {/* If wrong password in sign up */}
                    <div style={this.state.wrongPassword === false ? { display: 'none' } : { 'padding-top': 0 }} >
                        <h2 style={{ color: 'red', marginLeft: 100 }}> That password is incorrect </h2>
                    </div>


                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <h2> Sign in </h2>
                        </div>
                    </div>
                    <div className="row" style={{ 'boarder': '1px' }}>
                        <div className="col-md-10 col-md-offset-1">
                            <h5>Email:</h5>
                            <input
                                value={this.state.username}
                                placeholder="Email address" className="form-control"
                                onChange={(e) => this.state.userInput.username = e.currentTarget.value} />

                            <h5>Password:</h5>
                            <input
                                value={this.state.password}
                                type='password'
                                placeholder="Stubhub password" className="form-control"
                                onChange={(e) => this.state.userInput.password = e.currentTarget.value} />
                            <br />
                            <button onClick={this.checkUser} className="btn btn-dark btn-block">Sign In</button>
                        </div>

                    </div>
                    <br />
                    <div className="row">
                        <div class="col-md-10 col-md-offset-1">
                            <h4>Haven't Registered Yet?</h4>
                            <Link to={`/register`}>
                                <button className="btn btn-dark"> Sign up</button>
                            </Link>
                        </div>
                    </div>

                    {/* <div className="col-6" style={{ 'max-height': '230px', overflow: 'scroll' }}>
                    <h2> Result </h2>
                    <pre style={{ 'text-align': 'left' }}> {this.state.api_key ? "{ API_key: " + this.state.api_key : null} </pre>
                    <h5> {this.state.api_key_response ? "Full response" : null} </h5>
                    <pre style={{ 'text-align': 'left' }}> {this.state.api_key_response === null ? null :
                        JSON.stringify(this.state.api_key_response, null, 2)}</pre>
                </div> */}
                </div>
            </div>)
    }
}
